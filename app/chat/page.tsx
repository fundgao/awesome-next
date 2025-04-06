"use client";

import { generateText, LanguageModelV1, streamText } from "ai";
import Form from "next/form";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { Suspense, useEffect, useState } from "react";

/**
 * DeepSpeed
 * https://www.deepseek.com/
 *
 * Vercel AI SDK
 * https://sdk.vercel.ai/providers/ai-sdk-providers/deepseek#deepseek-provider
 *
 *
 * Vercel Form
 * https://nextjs.org/docs/app/api-reference/components/form
 *
 */
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

export default function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DeepSeek Chat</h1>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse text-muted-foreground">
                Loading...
              </div>
            </div>
          }
        >
          <DeepSeek searchParams={searchParams} />
        </Suspense>
      </div>
      <Form action="/chat">
        <input name="query" />
        <button type="submit">提交</button>
      </Form>
    </div>
  );
}
