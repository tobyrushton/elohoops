import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FC } from "react"
import { Resource } from "sst"
import { MoveUpRight, Trophy } from "lucide-react"
import { LeaderboardResponse } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// regenerate every hour
export const revalidate = 3600

const Home: FC = async () => {
    const res = await fetch(Resource.GoApi.url + "/leaderboard?per_page=3")
    const data = await res.json() as LeaderboardResponse

    const trophyColors: {[key: number]: string} = {
        1: 'stroke-[#FFD700]',
        2: 'stroke-[#C0C0C0]',
        3: 'stroke-[#CE8946]'
    }

    return (
        <div className="flex flex-col items-center justify-center grow p-2">
            <div className="flex flex-col gap-3 items-center text-center max-w-3xl">
                <h1 className="text-4xl font-bold">
                    Discover the largest NBA player community rankings
                </h1>
                <p className="text-md">
                    Elohoops uses an ELO rating system to compare players between one another
                    and rank them accordingly.
                </p>
                <Button className="w-fit" asChild>
                    <Link href="/vote">
                        Join the action
                        <MoveUpRight />
                    </Link>
                </Button>
                <h2 className="font-semibold text-2xl pt-5">
                    Current Leaders
                </h2>
                <div className="flex gap-2 w-fit sm:w-full flex-col sm:flex-row">
                    {
                        data.Data.map((player, index) => (
                            <Card className="flex flex-col flex-1" key={player.NBAID}>
                                <CardHeader>
                                    <CardTitle className="flex gap-2 items-center w-full">
                                        <Trophy className={trophyColors[index+1]} />
                                        <Image
                                            className="sm:hidden"                                   
                                            src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.NBAID}.png`}
                                            width={32}
                                            height={32}
                                            alt={`${player.FirstName} ${player.LastName} headshot`} 
                                        />
                                        <p className="text-left sm:text-center w-full">
                                            {player.FirstName} {player.LastName}
                                        </p>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="hidden sm:flex justify-center">
                                    <Image
                                        src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.NBAID}.png`}
                                        width={128}
                                        height={128}
                                        alt={`${player.FirstName} ${player.LastName} headshot`}
                                    />
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home