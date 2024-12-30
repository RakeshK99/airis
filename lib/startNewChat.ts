import client from "@/graphql/apolloClient";
import { INSERT_CHAT_SESSION, INSERT_GUEST, INSERT_MESSAGE } from "@/graphql/mutations/mutations";

async function startNewChat(guestName: string, guestEmail: string, chatbotId: number) {
  try {
    // 1. Create a new guest entry
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: {
        name: guestName,
        email: guestEmail,
        created_at: new Date().toISOString(), // DateTime format
      },
    });

    const guestId = guestResult.data?.insertGuests?.id;
    if (!guestId) {
      throw new Error("Failed to create guest. Guest ID is missing.");
    }
    console.log("Guest created with ID:", guestId);

    // 2. Initialize a new chat session
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHAT_SESSION,
      variables: {
        chatbot_id: chatbotId,
        guest_id: guestId,
      },
    });

    const chatSessionId = chatSessionResult.data?.insertChat_sessions?.id;
    if (!chatSessionId) {
      throw new Error("Failed to create chat session. Chat session ID is missing.");
    }
    console.log("Chat session created with ID:", chatSessionId);

    // 3. Insert initial message (optional)
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: "ai",
        content: `Welcome ${guestName}!\nHow can I assist you today? 😊`,
      },
    });

    console.log("New chat session started successfully!");
    return chatSessionId;
  } catch (error) {
    console.error("Error starting new chat session:", error);
    throw error;
  }
}

export default startNewChat;
