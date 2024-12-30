import client from "@/graphql/apolloClient";
import { INSERT_GUEST} from "@/graphql/mutations/mutations";
import { gql } from "@apollo/client";

async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    // 1. Create a new guest entry
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST
      variables: { name: guestName, email: guestEmail },
    });
    const guestId = guestResult.data.insertGuests.id;
  } catch (error) {
    console.error("Error starting new chat session:", error);
  }
}
