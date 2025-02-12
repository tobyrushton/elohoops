import { FC, PropsWithChildren } from "react"

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
