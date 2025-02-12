import { FC } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from "@/components/ui/skeleton"

const LoadingVote: FC = () => {
    const stats = ["GP", "PTS/G", "REB/G", "AST/G", "STL/G", "BLK/G", "FG%", "3P%", "FT%"]

    return (
        <>
            <div className="flex gap-2">
                {
                    new Array(2).fill(0).map((_, i) => (
                        <div className="flex flex-col gap-2 items-center" key={i}>
                            <Skeleton className="size-48 rounded-full" />
                            <Skeleton className="h-[2rem] w-[12rem]" />
                        </div>
                    ))
                }
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">
                        Player stats
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody className="text-center">
                            {
                                stats.map((stat, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="flex justify-center">
                                            <Skeleton className="h-4 w-8" />
                                        </TableCell>
                                        <TableCell className="font-bold">{stat}</TableCell>
                                        <TableCell className="flex justify-center">
                                            <Skeleton className="h-4 w-8" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default LoadingVote
