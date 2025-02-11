import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FC } from "react"

const Home: FC = () => {
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
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Home