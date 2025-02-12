export const api = new sst.aws.ApiGatewayV2("GoApi", {
    domain: process.env.PULUMI_NODEJS_STACK === "prod" ? "api.elohoops.com" : undefined
})

api.route("$default", {
    handler: "packages/api",
    runtime: "go",
    environment: {
        DATABASE_URL: process.env.DATABASE_URL
    }
})