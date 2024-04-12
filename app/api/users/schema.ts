import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name should have minumum of 3 characters"),
  email: z.string().email("Invalid Email"),
  password: z.string(),
});

export default schema;
