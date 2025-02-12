import { FC, PropsWithChildren } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Leaderboard",
    description: "View the highest rated players currently in the NBA."
}

const LeaderboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex justify-center p-4">
            {children}
        </div>
    )
}

export default LeaderboardLayout