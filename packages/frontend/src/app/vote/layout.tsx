import { FC, PropsWithChildren } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Vote",
    description: "Who's the better player? Vote now."
}

const VoteLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex w-full grow items-center justify-center">
            <div className="flex flex-col gap-5 p-2">
                {children}
            </div>
        </div>
    )
}

export default VoteLayout
