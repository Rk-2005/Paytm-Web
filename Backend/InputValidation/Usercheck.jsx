import { z } from "zod";

export const userschema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstname: z.string().max(50),
  lastName: z.string().max(50)
});
