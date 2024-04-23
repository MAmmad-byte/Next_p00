import { z } from "zod";

export default z.object({
    name:z.string().min(3),
    price:z.number().min(0).max(1000)
})