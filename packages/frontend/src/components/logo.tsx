import { FC } from "react"
import Image from "next/image"

export const Logo: FC<{ width: number, height: number, className?: string }> = ({ width, height, className }) => {
    return (
        <Image src='logo.svg' width={width} height={height} alt="logo" className={className} />
    )
}