import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { GET_CHATBOTS_BY_USER } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { Chatbot } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
  const { userId } = await auth();
  if (!userId) return;

  try {
    // Fetch chatbots from the working chatbotsList query
    const { data } = await serverClient.query({
      query: GET_CHATBOTS_BY_USER, // This refers to the query for chatbotsList
    });

    // Safeguard against undefined or empty data
    if (!data || !data.chatbotsList) {
      console.warn("No chatbots found in the response");
      return (
        <div className="flex1-1 pb-20 p-10">
          <p>Error: Unable to fetch chatbots. Please try again later.</p>
        </div>
      );
    }

    // Filter chatbots by user ID
    const chatbotsByUser: Chatbot[] = data.chatbotsList.filter(
      (chatbot: Chatbot) => chatbot.clerk_user_id === userId
    );

    // Sort chatbots by creation date
    const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Return UI
    return (
      <div className="flex1-1 pb-20 p-10">
        <h1 className="text-xl lg:text-3xl font-semibold mb-5">Your Chatbots</h1>
        {sortedChatbotsByUser.length === 0 && (
          <div>
            <p>You have not created any chatbots yet. Click the button below to create one.</p>
            <Link href="/create-chatbot">
              <Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
                Create Chatbot
              </Button>
            </Link>
          </div>
        )}
        <ul className="flex flex-col space-y-5">
          {sortedChatbotsByUser.map((chatbot) => (
            <Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
              <li className="relative p-10 border rounded-md max-w-3xl bg-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar seed={chatbot.name} />
                    <h2 className="text-xl font-bold">{chatbot.name}</h2>
                  </div>
                  <p className="absolute top-5 right-5 text-xs text-gray-400">
                    Created: {new Date(chatbot.created_at).toLocaleString()}
                  </p>
                </div>
                <hr className="mt-2" />
                <div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
                  <h3 className="italic">Characteristics</h3>
                  <ul className="text-xs">
                    {!chatbot.chatbot_characteristics.length && (
                      <p>No characteristics added yet.</p>
                    )}
                    {chatbot.chatbot_characteristics.map((characteristic) => (
                      <li
                        className="list-disc break-words"
                        key={characteristic.id}
                      >
                        {characteristic.content}
                      </li>
                    ))}
                  </ul>

                  <h3 className="italic">No of Sessions:</h3>
                  <p>{chatbot.chat_sessions.length}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching chatbots:", error);
    return <div>Error loading chatbots. Please try again later.</div>;
  }
}

export default ViewChatbots;
