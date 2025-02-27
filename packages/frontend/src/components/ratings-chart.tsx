"use client"

import { FC } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "./ui/chart"
import { GetPlayerRatingsResponse } from "@/lib/types"
import dayjs from "dayjs"

export type RatingsChartProps = {
    ids: number
}

const formatDate = (dateStr: string): string =>
    dayjs(dateStr).format("DD/MM/YYYY")


export const RatingsChart: FC<RatingsChartProps> = ({ ids }) => {
    const { data } = useQuery({
        queryKey: ['player-ratings'],
        queryFn: async () => {
            const res = 
                await fetch(
                    process.env.NEXT_PUBLIC_API_URL + 
                    `/player-rating/${ids}?until=${dayjs().subtract(1, 'week').format("DD/MM/YYYY")}`
                )
            const data = await res.json() as GetPlayerRatingsResponse
            return data.Data
        }
    })

    return (
        <ChartContainer config={{}} className="w-full h-48 sm:h-96">
            <AreaChart data={data}>
                <XAxis 
                    dataKey="Day"
                    reversed
                    tickFormatter={formatDate}
                    interval={0}
                />
                <YAxis 
                    dataKey="Rating" 
                    domain={[
                        (dataMin: number) => dataMin-50,
                        (dataMax: number) => dataMax+50
                    ]}
                />
                <Area type="monotone" dataKey="Rating" />
                <CartesianGrid strokeDasharray="3 3" />
                <ChartTooltip 
                    content={
                        <ChartTooltipContent
                            labelFormatter={formatDate}
                        />
                    } 
                />
            </AreaChart>
        </ChartContainer>
    )
}