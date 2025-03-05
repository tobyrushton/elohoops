"use client"

import { FC } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "./ui/chart"
import { GetPlayerRatingsResponse, Player, PlayerRatings } from "@/lib/types"
import dayjs from "dayjs"

export type RatingsChartProps = {
    players: Player[]
}

type RenderedRating = {
    date: string
    [key: number]: number
}

const formatDate = (dateStr: string): string =>
    dayjs(dateStr).format("DD/MM/YYYY")

const fetchRatings = async (player: Player): Promise<PlayerRatings[]> => {
    const res = 
        await fetch(
            process.env.NEXT_PUBLIC_API_URL + 
            `/player-rating/${player.ID}?until=${dayjs().subtract(1, 'week').format("DD/MM/YYYY")}`
        )

    const data = await res.json() as GetPlayerRatingsResponse
    return data.Data 
}

const groupRatings = (ratings: PlayerRatings[][]): RenderedRating[] => {
    const ratingMap = new Map<string, RenderedRating>()

    ratings.forEach(playerRatings => {
        playerRatings.forEach(rating => {
            const key = formatDate(rating.Day)

            const mapEntry = ratingMap.get(key)
            if (!mapEntry) {
                ratingMap.set(key, {
                    date: key,
                    [rating.PlayerID]: rating.Rating
                })
            } else {
                mapEntry[rating.PlayerID] = rating.Rating
            }
        }) 
    })

    return Array.from(ratingMap.values())
}

export const RatingsChart: FC<RatingsChartProps> = ({ players }) => {
    const { data } = useQuery({
        queryKey: ['player-ratings'],
        queryFn: async () => {
            const data =  await Promise.all(
                players.map(player => fetchRatings(player))
            )

            return groupRatings(data)
        }
    })

    return (
        <ChartContainer config={{}} className="w-full h-48 sm:h-96">
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                    right: 40,
                    left: 5,
                    top: 5,
                    bottom: 5
                }}
            >
                <XAxis 
                    dataKey="date"
                    reversed
                    allowDuplicatedCategory={false}
                    interval={0}
                />
                <YAxis 
                    domain={[
                        (dataMin: number) => dataMin-50,
                        (dataMax: number) => dataMax+50
                    ]}
                />
                {
                    players.map((player, index) => (
                        <Line
                            dataKey={player.ID}
                            key={player.ID}
                            type="monotone"
                            stroke={`hsl(var(--chart-${index+1}))`}
                            dot={false}
                        />
                    ))
                }
                <CartesianGrid vertical={false} />
                <ChartTooltip 
                    content={
                        <ChartTooltipContent labelKey="date" nameFormatter={(id) => {
                            if (!id) return ""
                            const player = players.find(player => player.ID === id)

                            return `${player?.FirstName} ${player?.LastName}`
                        } } />
                    }
                />
            </LineChart>
        </ChartContainer>
    )
}