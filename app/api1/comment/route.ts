import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { comment, postId } = await req.json();

  try {
    const newComment = await prisma.comment.create({
      data: {
        comment,
        postId,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create comment" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const comments = await prisma.comment.findMany({
      include: { post: true },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch comments" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, comment } = await req.json();

  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { comment },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to update comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    await prisma.comment.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to delete comment" },
      { status: 500 }
    );
  }
}
