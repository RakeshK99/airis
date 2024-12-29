import { GET_CHATBOTS_BY_USER } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
    Chatbot,
  GetChatbotsByUserData,
  GetChatbotsByUserDataVariables,
} from "@/types/types";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
  const { userId } = await auth();
  if (!userId) return;

  const { data:{chatbotsByUser},
 } = await serverClient.query<
    GetChatbotsByUserData,
    GetChatbotsByUserDataVariables
  >({
    query: GET_CHATBOTS_BY_USER,
    variables: {
      clerk_user_id: userId,
    },
  });

  const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  
  return <div>ViewChatbots</div>;
}

export default ViewChatbots;
