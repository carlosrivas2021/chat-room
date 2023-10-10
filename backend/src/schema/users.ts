const typeDefs = /* GraphQL */ `
  scalar Date

  type User {
    id: String
    username: String
  }

  type Query {
    searchUsers(userId: String!): [User]
  }

  type Mutation {
    createUsername(username: String!): User
  }

  type Subscription {
    userNew: User
  }
`;
export default typeDefs;
