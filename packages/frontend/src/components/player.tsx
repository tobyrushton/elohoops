import { FC } from "react"
import { Player as TPlayer } from "@/lib/types"
import { TableCell, TableRow } from "./ui/table"
import { cn } from "@/lib/utils"
import Image from "next/image"

export type PlayerHeadProps = {
    player: TPlayer
}

export const PlayerHead: FC<PlayerHeadProps> = ({ player }) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <Image 
                src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.NBAID}.png`} 
                width={256} 
                height={256} 
                alt={`${player.FirstName} ${player.LastName} headshot`}
            />
            <h2 className="text-xl font-bold text-center">
                {player.FirstName} {player.LastName}
            </h2>
        </div>
    )
}

export type PlayerStatRowProps = {
    title: string,
    val1: number,
    val2: number
}

export const PlayerStatRow: FC<PlayerStatRowProps> = ({ title, val1, val2 }) => {
    const rounded1 = Math.round((val1 + Number.EPSILON) * 100) / 100
    const rounded2 = Math.round((val2 + Number.EPSILON) * 100) / 100
    return (
        <TableRow>
            <TableCell className={cn({ 'bg-green-100': rounded1 >= rounded2 })}>{rounded1}</TableCell>
            <TableCell className="font-bold">{title}</TableCell>
            <TableCell className={cn({ 'bg-green-100': rounded2 >= rounded1 })}>{rounded2}</TableCell>
        </TableRow>
    )
}