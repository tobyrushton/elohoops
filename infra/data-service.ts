export const dataCron = new sst.aws.Cron("DbUpdateCron", {
    function: {
        handler: "packages/data-service",
        runtime: "go",
        environment: {
            BALL_DONT_LIE_API_KEY: process.env.BALL_DONT_LIE_API_KEY,
            DATABASE_URL: process.env.DATABASE_URL
        }
    },
    schedule: "rate(7 days)",
})