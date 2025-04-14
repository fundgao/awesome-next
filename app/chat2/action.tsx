"use server";

import { streamText } from "ai";
import { Message } from "./types";
import { openai } from "@ai-sdk/openai";
import { ReactNode, Suspense } from "react";
import { GET_NEXT_STATE } from "./GET_NEXT_STATE";
import { State } from "./GET_NEXT_STATE";
import { compiler } from "markdown-to-jsx";
// import prisma from "@/app/db/prisma";

const getTextStream = async (messages: Message[]) => {
  const { textStream } = await streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return textStream;
};

const getAssistantMessageContentStream = async (
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

const ParseToMarkdown = ({ block }: { block: string }) => {
  return compiler(block, { wrapper: null });
};

const addMessage = async (conversationId: string, message: Message) => {
  // await prisma.message.create({
  //   data: {
  //     role: message.role,
  //     content: message.content,
  //     conversationId,
  //   },
  // });
};

const Spinner = () => {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        style={{
          animation: "spin 0.5s linear infinite",
          borderRadius: "50%",
          height: "1rem",
          width: "1rem",
          border: "2px solid #d1d5db",
          borderTopColor: "#4b5563",
        }}
      />
    </>
  );
};

const StreamableParse = async ({
  generateBlocks,
  buffer,
  conversationId,
}: {
  generateBlocks: AsyncGenerator<string>;
  buffer: string;
  conversationId: string;
}) => {
  const { done, value: block } = await generateBlocks.next();
  if (done) {
    await addMessage(conversationId, {
      role: "assistant",
      content: buffer,
    });
    return;
  }

  return (
    <>
      <div>
        <ParseToMarkdown block={block} />
      </div>
      <Suspense fallback={<Spinner />}>
        <StreamableParse
          generateBlocks={generateBlocks}
          buffer={buffer + "\n\n" + block}
          conversationId={conversationId}
        />
      </Suspense>
    </>
  );
};

const StreamableRenderFromMessage = async ({
  message,
}: {
  message: Message;
}) => {
  const generator = await getAssistantMessageContentStream([message]);
  let remainingChars = "";
  // TODO: instead of getting next char, which turns every single
  // char into a react node, we should get the next token
  const getNextChar = async (): Promise<string | null> => {
    if (remainingChars.length > 0) {
      const nextChar = remainingChars[0];
      remainingChars = remainingChars.slice(1);
      return nextChar;
    }

    const { done, value } = await generator.next();
    if (done) return null;

    if (value.length > 1) {
      remainingChars = value.slice(1);
      return value[0];
    }
    return value;
  };

  let buffer: ReactNode = null;
  let currentState: State = "INITIAL";

  const RecursivelyRender = async () => {
    const nextChar = await getNextChar();
    const nextState = GET_NEXT_STATE(currentState, nextChar, buffer);
    buffer = nextState.nextBuffer;
    currentState = nextState.nextState;

    if (currentState === "COMPLETED") {
      return <>{nextState.flushPayload}</>;
    }
    if (nextState.flushPayload) {
      return (
        <>
          {nextState.flushPayload}
          <Suspense fallback={<div>...</div>}>
            <RecursivelyRender />
          </Suspense>
        </>
      );
    } else {
      // BUFFER
      return <RecursivelyRender />;
    }
  };

  return <RecursivelyRender />;
};

export const getMessageReactNode = async (message: Message) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StreamableRenderFromMessage message={message} />
    </Suspense>
  );
};
