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

  type User {
    id: ID!
    username: String!
    role: RoleType
    answers: [AnswerRep]
    questions: [QuestionRep]
    createdAt: DateTime
    reputation: Int
    recentQuestions: [RecentActivity]
    recentAnswers: [RecentActivity]
    totalQuestions: Int
    totalAnswers: Int
  }

  type QuestionRep {
    quesId: ID!
    rep: Int!
  }

  type AnswerRep {
    ansId: ID!
    rep: Int!
  }

  type RecentActivity {
    id: ID!
    title: String!
    createdAt: DateTime!
    points: Int!
  }

  type Query {
    getUser(username: String!): User
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
