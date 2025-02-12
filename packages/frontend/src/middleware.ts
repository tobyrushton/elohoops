import { NextResponse } from "next/server"
import type { MiddlewareConfig, NextRequest } from "next/server"

export const middleware = (request: NextRequest): NextResponse => {
    if (request.nextUrl.pathname === "/leaderboard") {
        const pageNumber = request.nextUrl.searchParams.get("page") ?? "1"

        return NextResponse.rewrite(new URL(`/leaderboard/page/${pageNumber}`, request.url))
    }
    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: "/leaderboard"
}