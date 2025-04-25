// import { Comment } from "@prisma/client";

type Comment = /*unresolved*/ any;

const API_URL = "/api/comments";

export const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
};

export const createComment = async (
  data: Partial<Comment>
): Promise<Comment> => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create comment");
  }
  return response.json();
};

export const updateComment = async (
  data: Partial<Comment>
): Promise<Comment> => {
  const response = await fetch(`${API_URL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update comment");
  }
  return response.json();
};

export const deleteComment = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
};
