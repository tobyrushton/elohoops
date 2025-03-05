import { RatingsChart } from "@/components/ratings-chart"
import { Separator } from "@/components/ui/separator"
import { GetPlayersResponse } from "@/lib/types"
import { getNBAImageUrl } from "@/lib/utils"
import Image from "next/image"
import { FC } from "react"
import { Resource } from "sst"
import Link from "next/link"

type PlayerPageProps = {
    params: Promise<{
        id: string
    }>
}

const Player: FC<PlayerPageProps> = async ({ params }) => {
    const playerID = (await params).id

    const res = await fetch(Resource.GoApi.url + `/players?player_ids=${playerID}`)
    const data = await res.json() as GetPlayersResponse

    if (data.Data.length < 1) throw new Error("Unable to get player")
    const player = data.Data[0]

    return (
        <div className="flex flex-col max-w-4xl p-2 gap-2">
            <div className="flex w-full gap-2">
                <Image
                    src={getNBAImageUrl(player.NBAID)}
                    alt={`${player.FirstName} ${player.LastName} headshot`}
                    width="150"
                    height="150"
                />
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-xl">
                        {player.FirstName} {player.LastName}
                    </p>
                    <p className="font-semibold">
                        Rating: {player.Rating}
                    </p>
                    <Link
                        className="text-accent-foreground underline"
                        href={`/compare?player_ids=${player.ID}`}
                    >
                        Compare?
                    </Link>
                </div>
            </div>
            <Separator />
            <div>
                <RatingsChart players={[player]} />
            </div>
        </div>
    )
}

export default Player