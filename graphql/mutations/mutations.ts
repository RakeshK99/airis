import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
  mutation CreateChatbot($clerk_user_id: String!, $name: String!, $created_at: String!) {
    insertChatbots(clerk_user_id: $clerk_user_id, name: $name, created_at: $created_at) {
      id
      name
    }
  }
`;



// import { gql } from "@apollo/client";

// export const CREATE_CHATBOT = gql`
//   mutation CreateChatbot($clerk_user_id: String!, $name: String!) {
//     insertChatbots(clerk_user_id: $clerk_user_id, name: $name) {
//       id
//       name
//     }
//   }
// `;

