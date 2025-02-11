import { FC } from "react"
import Image from "next/image"

export const Logo: FC<{ width: number, height: number}> = ({ width, height }) => {
    return (
        <Image src='logo.svg' width={width} height={height} alt="logo" />
    )
}