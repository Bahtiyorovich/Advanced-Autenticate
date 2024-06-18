import { z } from "zod"
 
export const postSchema = z.object({
  title: z.string().min(5, {
    message: "title must be at least 5 characters.",
  }).max(50),
  body: z.string().min(15, {
    message: "description must be at least 15 characters.",
  })
})