import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import User from "@/app/models/User";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let user = await User.findById(params.id);
  if (!user) return NextResponse.json("User is not found", { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const validation = schema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors[0].message, {
        status: 400,
      });

    let topics = await User.findById(params.id);

    if (!topics) return NextResponse.json("User is not found", { status: 404 });

    const updateTopic = await User.findByIdAndUpdate(params.id, {
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json(updateTopic, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let topics = await User.findById(params.id);
    if (!topics) return NextResponse.json("User is not found", { status: 404 });

    await User.findByIdAndDelete(params.id);

    return NextResponse.json("The user is deleted");
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
