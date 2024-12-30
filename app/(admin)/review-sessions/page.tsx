import ChatBotSessions from "@/components/ChatBotSessions";
import { GET_USER_CHATBOTS } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { Chatbot } from "@/types/types";
import { auth } from "@clerk/nextjs/server";

async function ReviewSessions() {
  const { userId } = await auth();
  if (!userId) return null;

  const {
    data: { chatbotsList },
  } = await serverClient.query<{
    chatbotsList: Chatbot[];
  }>({
    query: GET_USER_CHATBOTS,
  });

  // Filter chatbots belonging to the current user
  const userChatbots = chatbotsList.filter(
    (chatbot) => chatbot.clerk_user_id === userId
  );

  // Sort chat sessions for each chatbot
  const sortedChatbotsByUser: Chatbot[] = userChatbots.map((chatbot) => ({
    ...chatbot,
    chat_sessions: [...chatbot.chat_sessions].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  }));

  return (
    <div className="flex-1 px-10">
      <h1 className="text-xl lg:text-3xl font-semibold mt-10">Chat Sessions</h1>
      <h2 className="mb-5">
        Review all the chat sessions the chatbots have had with your customers.
      </h2>
      <ChatBotSessions chatbots={sortedChatbotsByUser} />
    </div>
  );
}

export default ReviewSessions;
