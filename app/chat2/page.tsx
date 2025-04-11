import { getMessageReactNode } from "./action";
import ClientPage from "./client-page";

export default function Page() {
  return <ClientPage getMessageReactNode={getMessageReactNode} />;
}
