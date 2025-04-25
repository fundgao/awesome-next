// import { User } from "@prisma/client";

type User = /*unresolved*/ any;

const API_URL = "/api/users";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
};

export const updateUser = async (data: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_URL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};
