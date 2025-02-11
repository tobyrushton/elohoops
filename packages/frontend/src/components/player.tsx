import { FC } from "react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Player as TPlayer } from "@/lib/types"
import { TableCell, TableRow } from "./ui/table"
import { cn } from "@/lib/utils"

export type PlayerHeadProps = {
    player: TPlayer
}

export const PlayerHead: FC<PlayerHeadProps> = ({ player }) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <Avatar className="size-48">
                <AvatarImage 
                    src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.NBAID}.png`} 
                    width={32} 
                    height={32} 
                    alt={`${player.FirstName} ${player.LastName} headshot`}
                />
            </Avatar>
            <h2 className="text-xl font-bold">
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
    return (
        <TableRow>
            <TableCell className={cn({ 'bg-green-100': val1 >= val2 })}>{val1}</TableCell>
            <TableCell className="font-bold">{title}</TableCell>
            <TableCell className={cn({ 'bg-green-100': val2 >= val1 })}>{val2}</TableCell>
        </TableRow>
    )
}