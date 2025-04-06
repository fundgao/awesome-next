"use client";

import { generateText, LanguageModelV1, streamText } from "ai";
import Form from "next/form";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { Suspense } from "react";

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

const DeepSeek = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { query } = await searchParams;

  if (!query) {
    return null;
  }

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  });

  const reader = await streamText({
    model: deepseek("deepseek-chat") as LanguageModelV1,
    prompt: query,
  });

  const { text } = await generateText({
    model: deepseek("deepseek-chat"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

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
    <Form action="/chat">
      <input name="query" />
      <button type="submit">提交</button>
      <Suspense fallback={"加载中..."}>
        <DeepSeek searchParams={searchParams} />
      </Suspense>
    </Form>
  );
}
