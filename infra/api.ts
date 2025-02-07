export const api = new sst.aws.ApiGatewayV2("GoApi")

api.route("$default", {
    handler: "packages/api",
    runtime: "go",
    environment: {
        DATABASE_URL: process.env.DATABASE_URL
    }
})