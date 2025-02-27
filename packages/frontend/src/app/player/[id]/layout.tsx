import { FC, PropsWithChildren } from "react";

const PlayerLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex flex-col w-full grow items-center">
            {children}
        </div>
    )
}

export default PlayerLayout
