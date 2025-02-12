"use client"

import { FC, useState, useEffect, useTransition } from "react"
import { Button } from "./ui/button"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { LoaderCircle } from "lucide-react"

export type VoteButtonProps = {
    matchID: number
}

const uploadResponse = async ({ id , result }: { id: number, result: number }): Promise<{ Data: { Message: string }}> => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/result-match?matchID=${id}&result=${result}`, { method: "PUT" })

    return await res.json()
}

export const VoteButtons: FC<VoteButtonProps> = ({ matchID }) => {
    const [complete, setComplete] = useState(false)
    const [isTransitionPending, startTransation] = useTransition()
    const { toast } = useToast()
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: uploadResponse,
        onSuccess: () => {
            toast({
                description: "Your vote has been recorded."
            })
            setComplete(true)
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please try again"
            })
        }
    })

    useEffect(() => {
        setComplete(false)
    }, [matchID])

    return (
        <div className="flex gap-2 p-2">
            { complete ? (
                <Button 
                    className="grow" 
                    onClick={() => {
                        startTransation(() => {
                            router.refresh()
                        })
                    }}
                    disabled={isTransitionPending}
                >
                    {
                        isTransitionPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : ( 
                            <>
                                Next
                            </> 
                        )
                    }
                </Button>
            ): (
                <>
                    <Button 
                        className="grow" 
                        onClick={() => mutate({ id: matchID, result: 1 })}
                        disabled={isPending}
                    >
                        Vote
                    </Button>
                    <Button 
                        className="grow" 
                        onClick={() => mutate({ id: matchID, result: 2 })}
                        disabled={isPending}
                    >
                        Vote
                    </Button>
                </>
            )}
        </div>
    )
}