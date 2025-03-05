import { RatingsChart } from "@/components/ratings-chart"
import { GetPlayersResponse, Player } from "@/lib/types"
import { FC } from "react"
import { Resource } from "sst"

type ComparePageProps = {
    searchParams: Promise<{
        player_ids: string[] | string
    }>
}

const constructUrl = (ids: string[]): string => {
    const baseUrl = Resource.GoApi.url + "/players"

    const searchParams = ids.map((id, idx) => `${idx === 0 ? "?" : "&"}player_ids=${id}`).join("")
    return baseUrl + searchParams
}

const ComparePage: FC<ComparePageProps> = async ({ searchParams }) => {
    const playerIDs = (await searchParams).player_ids

    // get the different players
    const res = await fetch(constructUrl(typeof playerIDs === "string" ? [playerIDs] : playerIDs))
    const data = await res.json() as GetPlayersResponse

    return (
        <div className="flex w-full grow justify-center">
            <div className="flex w-full max-w-4xl p-2">
                <RatingsChart players={data.Data} />
            </div>
        </div>
    )
}

export default ComparePage
