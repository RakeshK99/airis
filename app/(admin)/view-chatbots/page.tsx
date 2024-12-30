import { GET_CHATBOTS_BY_USER } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { Chatbot } from "@/types/types"; // Assuming Chatbot matches the structure of your query
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
  const { userId } = await auth();
  if (!userId) return;

  const { data: { chatbots } } = await serverClient.query({
    query: GET_CHATBOTS_BY_USER,
  });

  const chatbotsByUser: Chatbot[] = chatbots.filter(
    (chatbot: Chatbot) => chatbot.clerk_user_id === userId
  );

  const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return <div>ViewChatbots</div>;
}

export default ViewChatbots;
