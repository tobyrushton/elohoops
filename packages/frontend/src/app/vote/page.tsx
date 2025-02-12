import { CreateMatchResponse } from "@/lib/types"
import { FC } from "react"
import { Resource } from "sst"
import { BalldontlieAPI } from "@balldontlie/sdk"
import { PlayerHead, PlayerStatRow } from "@/components/player"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody } from "@/components/ui/table"
import { VoteButtons } from "@/components/vote-button"

const Vote: FC = async () => {
    const res = await fetch(Resource.GoApi.url + "/create-match", { method: "POST" })
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
        <div className="flex w-full grow items-center justify-center">
            <div className="flex flex-col gap-5 p-2">
                <div className="flex gap-2">
                    <PlayerHead player={match.Player1} />
                    <PlayerHead player={match.Player2} />
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
                                <PlayerStatRow title="GP" val1={player1Stats.games_played} val2={player2Stats.games_played} />
                                <PlayerStatRow title="PTS/G" val1={player1Stats.pts} val2={player2Stats.pts} />
                                <PlayerStatRow title="REB/G" val1={player1Stats.reb} val2={player2Stats.reb} />
                                <PlayerStatRow title="AST/G" val1={player1Stats.ast} val2={player2Stats.ast} />
                                <PlayerStatRow title="STL/G" val1={player1Stats.stl} val2={player2Stats.stl} />
                                <PlayerStatRow title="BLK/G" val1={player1Stats.blk} val2={player2Stats.blk} />
                                <PlayerStatRow title="FG%" val1={player1Stats.fg_pct*100} val2={player2Stats.fg_pct*100} />
                                <PlayerStatRow title="3P%" val1={player1Stats.fg3_pct*100} val2={player2Stats.fg3_pct*100} />
                                <PlayerStatRow title="FT%" val1={player1Stats.ft_pct*100} val2={player2Stats.ft_pct*100} />
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <VoteButtons matchID={match.ID} />
            </div>
        </div>
    )
}

export default Vote
