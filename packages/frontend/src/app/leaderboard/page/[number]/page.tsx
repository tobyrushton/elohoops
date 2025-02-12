import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter, TableCaption } from "@/components/ui/table"
import { LeaderboardResponse } from "@/lib/types"
import { FC } from "react"
import { Resource } from "sst"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationPrevious, PaginationItem, PaginationNext, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination"

// regenerate every hour
export const revalidate = 60 * 60 

export const generateStaticParams = async (): Promise<{ number: string }[]> => {
    const res = await fetch(Resource.GoApi.url + "/leaderboard")
    const data = await res.json() as LeaderboardResponse

    const pages: { number: string }[] = []

    for (let i = 1; i <= data.Meta.TotalPages; i++) {
        pages.push({ number: String(i) })
    }

    return pages
}

const Leaderboard: FC<{
    params: Promise<{ number: string }>
}> = async ({ params }) => {
    const pageNumber = (await params).number

    const res = await fetch(Resource.GoApi.url + `/leaderboard?page=${pageNumber}`)

    const data = await res.json() as unknown as LeaderboardResponse

    const pageNumbers = []
    let end = data.Meta.CurrentPage + 1
    if (end > data.Meta.TotalPages) end--
    else if (end < 3) end++
    for (let i = end-2; i <= end; i++) {
        pageNumbers.push(i)
    }

    return (
        <Card className="flex-grow max-w-4xl">
            <CardHeader>
                <CardTitle>
                    Player Rating Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Table>
                    <TableCaption>
                        Leaderboard updated every hour.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.Data.map((player, index) => (
                            <TableRow key={player.NBAID}>
                                <TableCell>
                                    {((data.Meta.CurrentPage-1)*data.Meta.PerPage)+(index+1)}
                                </TableCell>
                                <TableCell className="flex gap-2 items-center">
                                    <Image 
                                        src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.NBAID}.png`} 
                                        width={32} 
                                        height={32} 
                                        alt={`${player.FirstName} ${player.LastName} headshot`}
                                    />
                                    {player.FirstName} {player.LastName}
                                </TableCell>
                                <TableCell>
                                    {player.Rating}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                href={
                                        data.Meta.CurrentPage === 1 ? 
                                            "/leaderboard" : 
                                            `/leaderboard?page=${data.Meta.CurrentPage-1}`
                                    } 
                            />
                        </PaginationItem>
                        {
                            data.Meta.CurrentPage > 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }
                        {pageNumbers.map(pageNo => (
                            <PaginationItem key={pageNo}>
                                <PaginationLink href={`/leaderboard?page=${pageNo}`} isActive={pageNo === data.Meta.CurrentPage}>
                                    {pageNo}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {
                            data.Meta.CurrentPage < data.Meta.TotalPages - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }
                        <PaginationItem>
                            <PaginationNext 
                                href={
                                    data.Meta.CurrentPage === data.Meta.TotalPages ? 
                                        `/leaderboard?page=${data.Meta.CurrentPage}` : 
                                        `/leaderboard?page=${data.Meta.CurrentPage+1}`
                                    } 
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardContent>
        </Card>
    )
}

export default Leaderboard
