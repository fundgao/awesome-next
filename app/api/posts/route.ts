import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { slug, title, body, authorId } = await req.json();

  try {
    const post = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        authorId,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create post" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comments: true },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Unable to fetch posts" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, slug, title, body } = await req.json();

  try {
    const post = await prisma.post.update({
      where: { id },
      data: { slug, title, body },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to delete post" },
      { status: 500 }
    );
  }
}
