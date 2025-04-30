import Redis from "ioredis";
import { v4 as uuid } from "uuid";
import { CoreMessage } from "ai";

type AiMessage = CoreMessage;

const URL = process.env.AI_MESSAGES_REDIS_REDIS_URL;

if (!URL) {
  throw new Error("AI_MESSAGES_REDIS_REDIS_URL is not set");
}

const redis = new Redis(URL);

// Types
export interface Conversation {
  id: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Message extends Omit<AiMessage, "createdAt"> {
  id: string;
  conversationId: string;
  createdAt: number;
}

// Redis Schema
// ------------
// conversation:{id} -> JSON string of Conversation object
//   - Stores individual conversation data
//
// conversation:{conversationId}:messages -> List of Message IDs
//   - Stores message IDs in chronological order
//
// user:{userId}:conversations -> Sorted Set of Conversation IDs
//   - Maps user to their conversations
//   - Score: timestamp (for chronological ordering)
//   - Value: conversationId
//
// message:{id} -> JSON string of Message object
//   - Stores individual message data

// Conversation helpers
export async function createConversation({
  userId,
}: {
  userId: string;
}): Promise<Conversation> {
  const conversationId = uuid();
  const now = Date.now();
  const conversation: Conversation = {
    id: conversationId,
    userId,
    createdAt: now,
    updatedAt: now,
  };

  await redis.set(
    `conversation:${conversationId}`,
    JSON.stringify(conversation)
  );

  await redis.zadd(`user:${userId}:conversations`, now, conversationId);

  return conversation;
}

export async function getConversationsByUser(
  userId: string
): Promise<Conversation[]> {
  // Get all conversation IDs for this user in reverse chronological order (newest first)
  // We use a sorted set (zset) with timestamp as score to maintain conversation order
  // In Redis, 0 is the start index and -1 means "until the end of the list"
  const ids = await redis.zrevrange(`user:${userId}:conversations`, 0, -1);
  if (!ids.length) return [];

  const conversations = await Promise.all(
    ids.map((id) => redis.get(`conversation:${id}`))
  );

  return conversations.filter(Boolean).map((str: any) => JSON.parse(str!));
}

export async function getConversationById(
  id: string
): Promise<Conversation | null> {
  const conversation = await redis.get(`conversation:${id}`);
  return conversation ? JSON.parse(conversation) : null;
}

export async function deleteConversation(
  conversationId: string,
  userId: string
): Promise<void> {
  await redis.del(`conversation:${conversationId}`);
  await redis.zrem(`user:${userId}:conversations`, conversationId);
  await deleteMessagesByConversation(conversationId);
}

export async function createMessage({
  conversationId,
  aiMessage,
}: {
  conversationId: string;
  aiMessage: Omit<AiMessage, "createdAt" | "id">;
}): Promise<Message> {
  const messageId = uuid();
  const now = Date.now();

  const message: Message = {
    ...aiMessage,
    id: messageId,
    conversationId,
    createdAt: now,
  } as const;

  await redis.set(`message:${messageId}`, JSON.stringify(message));
  await redis.rpush(`conversation:${conversationId}:messages`, messageId);

  // Update conversation's updatedAt and its position in the sorted set
  const conversation = await getConversationById(conversationId);
  if (conversation) {
    conversation.updatedAt = now;
    await redis.set(
      `conversation:${conversationId}`,
      JSON.stringify(conversation)
    );
    // Update the score in the sorted set to reflect new updatedAt
    await redis.zadd(
      `user:${conversation.userId}:conversations`,
      now,
      conversationId
    );
  }

  return message;
}

export async function getMessagesByConversation(
  conversationId: string
): Promise<Message[]> {
  const messageIds = await redis.lrange(
    `conversation:${conversationId}:messages`,
    0,
    -1
  );
  if (!messageIds.length) return [];

  const messages = await Promise.all(
    messageIds.map((id) => redis.get(`message:${id}`))
  );

  return messages.filter(Boolean).map((str) => JSON.parse(str!));
  // .sort(
  //   (a, b) =>
  //     new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  // ); // TODO: this sort is probably not needed, because we add messages in order
}

export async function getFirstMessageOfConversation(
  conversationId: string
): Promise<Message | null> {
  const messageIds = await redis.lrange(
    `conversation:${conversationId}:messages`,
    0,
    0
  );

  if (!messageIds.length) return null;

  const messageStr = await redis.get(`message:${messageIds[0]}`);
  if (!messageStr) return null;

  return JSON.parse(messageStr);
}

export async function deleteMessagesByConversation(
  conversationId: string
): Promise<void> {
  const messageIds = await redis.lrange(
    `conversation:${conversationId}:messages`,
    0,
    -1
  );
  if (messageIds.length) {
    const keys = messageIds.map((id) => `message:${id}`);
    await redis.del(...keys);
  }
  await redis.del(`conversation:${conversationId}:messages`);
}
