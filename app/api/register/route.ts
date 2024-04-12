import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import connectMongoDb from "../../libs/mongoose";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  name: z.string().min(2),
});

export async function POST(request: NextRequest) {
  await connectMongoDb();

  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await User.findOne({ email: body.email });
  if (user) return NextResponse.json("User is already exists", { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = new User({
    email: body.email,
    password: hashedPassword,
    name: body.name,
  });

  await newUser.save();
  return NextResponse.json({ email: body.email }, { status: 201 });
}
