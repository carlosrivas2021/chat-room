const typeDefs = /* GraphQL */ `
  type Conversation {
    id: String
    members: [User]
    updatedAt: Date
  }

  type Member {
    id: String
    user: User
  }

  type Query {
    conversations(username: String!): [Conversation]
  }

  type Mutation {
    createConversation(participantIds: [String]): Conversation!
  }
`;

export default typeDefs;
