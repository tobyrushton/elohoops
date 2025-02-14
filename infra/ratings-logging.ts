export const ratingsCron = new sst.aws.Cron("RatingsCron", {
    function: {
        runtime: "go",
        handler: "packages/ratings-logging",
        environment: {
            DATABASE_URL: process.env.DATABASE_URL
        }
    },
    schedule: "cron(0 0 * * ? *)"
})