export interface Message {
  role: "user" | "assistant";
  content: string;
  isOptimistic?: boolean;
}
