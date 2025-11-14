import { jstack } from "jstack"

interface Env {
  Bindings: { DATABASE_URL: string }
}

export const j = jstack.init<Env>()

/**
 * Public (unauthenticated) procedures
 * This is the base part you use to create new procedures.
 */
export const publicProcedure = j.procedure
