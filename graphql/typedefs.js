const { gql } = require('graphql-tag');
module.exports = gql`
  enum RoleType {
    USER
    ADMIN
  }

  enum VoteType {
    UPVOTE
    DOWNVOTE
  }

  enum SortByType {
    HOT
    VOTES
    VIEWS
    NEWEST
    OLDEST
  }

  type Query {
    helloWord: String!
  }

  type LoggedUser {
    id: ID!
    username: String!
    token: String!
    role: String!
  }

  scalar DateTime

  type Mutation {
    register(username: String!, password: String!): LoggedUser
    login(username: String!, password: String!): LoggedUser
  }
`;
