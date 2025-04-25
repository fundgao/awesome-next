// import { Post } from "@prisma/client";

type Post = /*unresolved*/ any;

const API_URL = "/api/posts";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}`);
  return response.json();
};

export const createPost = async (data: Partial<Post>): Promise<Post> => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updatePost = async (data: Partial<Post>): Promise<Post> => {
  const response = await fetch(`${API_URL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deletePost = async (id: string): Promise<void> => {
  await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};
