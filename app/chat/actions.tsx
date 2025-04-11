// "use server";

import { streamText, generateText, LanguageModelV1 } from "ai";
import { Message } from "./types";
import { openai } from "@ai-sdk/openai";
import { Suspense, useEffect, useState } from "react";
import { createDeepSeek, deepseek } from "@ai-sdk/deepseek";

const getTextStreamFromChatgpt = async (messages: Message[]) => {
  const { textStream } = await streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return textStream;
};

const getTextStreamFromDeepseek = async (messages: Message[]) => {
  const { textStream } = await streamText({
    model: deepseek("deepseek-chat") as LanguageModelV1,
    messages,
  });

  return textStream;
};

const getTextStream =
  process.env.NODE_ENV === "development"
    ? getTextStreamFromDeepseek
    : getTextStreamFromChatgpt;

export const getAssistantMessageContentStream = async (
  messages: Message[]
): Promise<AsyncGenerator<string>> => {
  const textStream = await getTextStream(messages);
  const reader = textStream.getReader();

  async function* generateText() {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  }

  return generateText();
};

// ----------------------DeepSeek----------------------
interface SearchParams {
  query: string;
}

const DeepSeek = ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const [query, setQuery] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  });

  const fetchData = async () => {
    const { query } = await searchParams;
    if (!query) return;
    setQuery(query);

    const reader = await streamText({
      model: deepseek("deepseek-chat") as LanguageModelV1,
      prompt: query,
    });

    const { text } = await generateText({
      model: deepseek("deepseek-chat") as LanguageModelV1,
      prompt: query,
    });
    setText(text);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  if (!query || !text) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%]">
          <p className="text-sm">{query}</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};
