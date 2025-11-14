import { j, publicProcedure } from "../jstack"

export const postRouter = j.router({
  recent: publicProcedure.get(({ c }) => {
    return c.json({ title: "first post!!!!" })
  }),
})
