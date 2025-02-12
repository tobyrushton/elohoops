import { CreateMatchResponse } from "@/lib/types"
import { FC } from "react"
import { Resource } from "sst"
import { BalldontlieAPI } from "@balldontlie/sdk"
import { PlayerHead, PlayerStatRow } from "@/components/player"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody } from "@/components/ui/table"
import { VoteButtons } from "@/components/vote-button"

const Vote: FC = async () => {
    const res = await fetch(Resource.GoApi.url + "/create-match", { method: "POST", cache: "no-store" })
    const data = await res.json() as CreateMatchResponse
    const match = data.Data

    const api = new BalldontlieAPI({ apiKey: process.env.BALL_DONT_LIE_API_KEY as string })
    const [player1Data, player2Data] = await Promise.all([
        api.nba.getSeasonAverages({
            season: 2024,
            player_id: match.Player1ID
        }),
        api.nba.getSeasonAverages({
            season: 2024,
            player_id: match.Player2ID
        })
    ])

    const [player1Stats, player2Stats] = [player1Data.data[0], player2Data.data[0]] 

    return (
        <>
            <div className="flex gap-2">
                <PlayerHead player={match.Player1} />
                <PlayerHead player={match.Player2} />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">
                        2024-25 Season Stats
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody className="text-center">
                            <PlayerStatRow title="GP" val1={player1Stats?.games_played ?? 0} val2={player2Stats?.games_played ?? 0} />
                            <PlayerStatRow title="PTS/G" val1={player1Stats?.pts ?? 0} val2={player2Stats?.pts ?? 0} />
                            <PlayerStatRow title="REB/G" val1={player1Stats?.reb ?? 0} val2={player2Stats?.reb ?? 0} />
                            <PlayerStatRow title="AST/G" val1={player1Stats?.ast ?? 0} val2={player2Stats?.ast ?? 0} />
                            <PlayerStatRow title="STL/G" val1={player1Stats?.stl ?? 0} val2={player2Stats?.stl ?? 0} />
                            <PlayerStatRow title="BLK/G" val1={player1Stats?.blk ?? 0} val2={player2Stats?.blk ?? 0} />
                            <PlayerStatRow title="FG%" val1={(player1Stats?.fg_pct ?? 0)*100} val2={(player2Stats?.fg_pct ?? 0)*100} />
                            <PlayerStatRow title="3P%" val1={(player1Stats?.fg3_pct ?? 0)*100} val2={(player2Stats?.fg3_pct ?? 0)*100} />
                            <PlayerStatRow title="FT%" val1={(player1Stats?.ft_pct ?? 0)*100} val2={(player2Stats?.ft_pct ?? 0)*100} />
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <VoteButtons matchID={match.ID} />
        </>
    )
}

export default Vote
