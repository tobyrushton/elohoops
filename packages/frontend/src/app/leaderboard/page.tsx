import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { LeaderboardResponse } from "@/lib/types"
import { FC } from "react"
import { Resource } from "sst"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Leaderboard: FC = async () => {
    const data = await fetch(Resource.GoApi.url + "/leaderboard")

    const res = await data.json() as unknown as LeaderboardResponse

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
                                <TableCell>{index+1}</TableCell>
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
            </CardContent>
        </Card>
    )
}

export default Leaderboard
