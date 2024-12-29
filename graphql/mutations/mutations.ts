import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
  mutation CreateChatbot($clerk_user_id: String!, $name: String!, $created_at: DateTime!) {
    insertChatbots(clerk_user_id: $clerk_user_id, name: $name, created_at: $created_at) {
      id
      name
      __typename
    }
  }
`;

export const REMOVE_CHARACTERISTIC = gql`
  mutation RemoveCharacteristic($characteristicId: Int!) {
    deleteChatbot_characteristics(id: $characteristicId) {
      id
    }
  }
`;

export const DELETE_CHATBOT = gql`
  mutation DeleteChatbot($id: Int!) {
    deleteChatbots(id: $id) {
      id
    }
  }
`;

export const ADD_CHARACTERISTIC = gql`
  mutation AddCharacteristic($chatbotId: Int!, $content: String!) {
    insertChatbot_characteristics(chatbot_id: $chatbotId, content: $content) {
      id
      content
      created_at
      # Add other fields you might want to return after adding
    }
  }
`;



