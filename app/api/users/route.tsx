import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/app/libs/mongoose";
import User from "../../models/User";
import schema from "./schema";

export async function GET(request: NextRequest) {
  await connectMongoDb();

  try {
    const topics = await User.find();
    return NextResponse.json(topics);
  } catch (error: any) {
    NextResponse.json(error, { status: 500 });
    // return NextResponse.error(error.message);
  }
}

export async function POST(request: NextRequest) {
  await connectMongoDb();

  try {
    const { name, email, password } = await request.json();

    const validation = schema.safeParse({ name, email, password });

    if (!validation.success)
      return NextResponse.json(validation.error.errors[0].message, {
        status: 400,
      });

    const topics = await User.findOne({ email: email });
    if (topics)
      return NextResponse.json("User is already existed", { status: 400 });

    const add = new User({
      name: name,
      email: email,
      password: password,
    });

    await add.save();

    return NextResponse.json(add, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
