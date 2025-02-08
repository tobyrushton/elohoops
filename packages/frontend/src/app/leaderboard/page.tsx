import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { LeaderboardResponse } from "@/lib/types"
import { FC } from "react"
import { Resource } from "sst"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationPrevious, PaginationItem, PaginationNext, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination"
import { SearchParams } from "next/dist/server/request/search-params"

const Leaderboard: FC<{
    searchParams: Promise<SearchParams>
}> = async ({ searchParams }) => {
    const params = await searchParams

    const data = await fetch(Resource.GoApi.url + "/leaderboard" + (params["page"] ? `?page=${params["page"]}`:""))

    const res = await data.json() as unknown as LeaderboardResponse

    const pageNumbers = []
    let end = res.Meta.CurrentPage + 1
    if (end >= res.Meta.TotalPages) end--
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
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {res.Data.map((player, index) => (
                            <TableRow key={player.NBAID}>
                                <TableCell>
                                    {((res.Meta.CurrentPage-1)*res.Meta.PerPage)+(index+1)}
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
                                        res.Meta.CurrentPage === 1 ? 
                                            "/leaderboard" : 
                                            `/leaderboard?page=${res.Meta.CurrentPage-1}`
                                    } 
                            />
                        </PaginationItem>
                        {
                            res.Meta.CurrentPage > 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }
                        {pageNumbers.map(pageNo => (
                            <PaginationItem key={pageNo}>
                                <PaginationLink href={`/leaderboard?page=${pageNo}`} isActive={pageNo === res.Meta.CurrentPage}>
                                    {pageNo}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {
                            res.Meta.CurrentPage < res.Meta.TotalPages - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }
                        <PaginationItem>
                            <PaginationNext 
                                href={
                                    res.Meta.CurrentPage === res.Meta.TotalPages ? 
                                        `/leaderboard?page=${res.Meta.CurrentPage}` : 
                                        `/leaderboard?page=${res.Meta.CurrentPage+1}`
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
