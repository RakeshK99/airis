import  client  from "@/graphql/apolloClient";
import { INSERT_CHAT_SESSION } from "@/graphql/mutations/mutations";
import { gql } from "@apollo/client";

export const INSERT_GUEST = gql`
  mutation insertGuest($name: String!, $email: String!) {
    insertGuests(name: $name, email: $email) {
      id
    }
  }
`;

async function startNewChat(guestName: string, guestEmail: string) {
  try {
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: {
        name: guestName,
        email: guestEmail,
      },
    });
    const guestId = guestResult.data.insertGuests.id;
    console.log("Guest created with ID:", guestId);


    // 2. Initialize a new chat session
const chatSessionResult = await client.mutate({
    mutation: INSERT_CHAT_SESSION
  const chatSessionId = chatSessionResult.data.insertChat_sessions.id;


  } catch (error) {
    console.error("Error starting new chat session:", error);
  }
}
