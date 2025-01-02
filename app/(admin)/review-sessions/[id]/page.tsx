import Messages from "@/components/Messages";
import { GET_CHAT_SESSION_MESSAGES } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
  GetChatSessionMessagesResponse,
  GetChatSessionMessagesVariables,
} from "@/types/types";

export const dynamic = "force-dynamic";

async function ReviewSession({ params }: { params: { id: string } }) {
  const { id } = params;

  const {
    data: { chat_sessions },
  } = await serverClient.query<
    GetChatSessionMessagesResponse,
    GetChatSessionMessagesVariables
  >({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: parseInt(id) },
  });

  if (!chat_sessions) {
    return (
      <div className="flex-1 p-10 pb-24">
        <h1 className="text-xl lg:text-3xl font-semibold">Session Not Found</h1>
        <p className="font-light text-gray-500 mt-2">
          The session you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const {
    created_at,
    messages,
    chatbots: { name },
    guests: { name: guestName, email },
  } = chat_sessions;

  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-xl lg:text-3xl font-semibold">Session Review</h1>
      <p className="font-light text-xs text-gray-400 mt-2">
        Started at {new Date(created_at).toLocaleString()}
      </p>

      <h2 className="font-light mt-2">
        Between {name} &{" "}
        <span className="font-extrabold">
          {guestName} ({email || "No email provided"})
        </span>
      </h2>
      <hr className="my-10" />
      <Messages messages={messages} chatbotName={name} />
    </div>
  );
}

export default ReviewSession;
