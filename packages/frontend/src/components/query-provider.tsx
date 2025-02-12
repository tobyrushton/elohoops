"use client"

import { FC, PropsWithChildren, useState } from "react"
import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query"

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
    const [client] = useState(() => new QueryClient())

    return (
        <QCP client={client}>{children}</QCP>
    )
}