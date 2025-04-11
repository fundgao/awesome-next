import { Message } from "./types";

const LoadingDots = () => {
  return (
    <span className="ml-1">
      <span className="inline-block animate-[bounce_1s_infinite_0ms]">.</span>
      <span className="inline-block animate-[bounce_1s_infinite_200ms]">.</span>
      <span className="inline-block animate-[bounce_1s_infinite_400ms]">.</span>
    </span>
  );
};

export const RenderMessages = ({
  messages,
  bottomRef,
  className,
}: {
  messages: Message[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) => {
  return (
    <div className={className}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "assistant" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`rounded-lg px-4 py-2 max-w-[80%] ${
              message.role === "assistant"
                ? "bg-[#2c2d30] text-white"
                : "bg-[#007a5a] text-white"
            }`}
          >
            <div className="whitespace-pre-wrap break-words">
              {message.content}
              {message.isOptimistic && <LoadingDots />}
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};
