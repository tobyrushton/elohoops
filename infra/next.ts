import { api } from "./api"

export const next = new sst.aws.Nextjs("Frontend", {
    path: "packages/frontend",
    link: [api]
})