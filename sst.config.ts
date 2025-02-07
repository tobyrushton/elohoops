/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "elohoops",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    }
  },
  async run() {
    await import("./infra/data-service")
    await import("./infra/api")
    await import("./infra/next")
    return {}
  },
})
