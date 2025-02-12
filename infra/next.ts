import { api } from "./api"

export const next = new sst.aws.Nextjs("Frontend", {
    path: "packages/frontend",
    link: [api],
    environment: {
        BALL_DONT_LIE_API_KEY: process.env.BALL_DONT_LIE_API_KEY,
        NEXT_PUBLIC_API_URL: api.url
    }
})