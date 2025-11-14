import { Context, Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { Scalar } from "@scalar/hono-api-reference"
import appRouter from "./server"
import openApiSpec from "./openapi.json"
import { auth } from "./lib/auth"

const app = new Hono()

app.use(logger())
app.use(cors())

// Mount the jstack router
app.route("/", appRouter.handler)

// Better auth server handler
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))

// Serve OpenAPI spec as JSON
app.get("/openapi.json", (c) => {
  return c.json(openApiSpec)
})

// Scalar documentation route
app.get(
  "/scalar",
  Scalar((c: Context) => {
    return {
      url: "/openapi.json",
      proxyUrl:
        c.env.ENVIRONMENT === "development" ? "https://proxy.scalar.com" : undefined,
    }
  })
)

export default {
  port: 4000,
  hostname: "0.0.0.0", // Listen on all network interfaces
  fetch: app.fetch,
}
