"use client"

import { FC } from "react"
import { Button } from "./ui/button"
import { useMutation } from "@tanstack/react-query"

export type VoteButtonProps = {
    matchID: number
}

const uploadResponse = async ({ id , result }: { id: number, result: number }): Promise<{ Data: { Message: string }}> => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/result-match?matchID=${id}&result=${result}`, { method: "PUT" })

    return await res.json()
}

export const VoteButtons: FC<VoteButtonProps> = ({ matchID }) => {
    const { mutate } = useMutation({
        mutationFn: uploadResponse,
        onSuccess: () => {
            console.log('success')
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return (
        <div className="flex gap-2 p-2">
            <Button className="grow" onClick={() => {
                mutate({ id: matchID, result: 1 })
            }}>Vote</Button>
            <Button className="grow" onClick={() => {
                mutate({ id: matchID, result: 2 })
            }}>Vote</Button>
        </div>
    )
}