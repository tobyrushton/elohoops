import { FC, PropsWithChildren } from "react"

const LeaderboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex justify-center p-4">
            {children}
        </div>
    )
}

export default LeaderboardLayout