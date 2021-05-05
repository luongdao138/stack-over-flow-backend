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

  type UserList {
    id: ID!
    username: String!
    createdAt: DateTime!
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

  type Author {
    id: ID!
    username: String!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Question {
    id: ID!
    title: String!
    body: String!
    author: Author
    points: Int!
    views: Int!
    tags: [String!]!
    acceptedAnswer: ID!
    comments: [Comment]
    answers: [Answer]
    upvotedBy: [ID]
    downVotedBy: [ID]
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Answer {
    id: ID!
    author: Author
    body: String!
    points: Int!
    comments: [Comment]
    upvotedBy: [ID]
    downVotedBy: [ID]
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type QuestionList {
    id: ID!
    title: String!
    body: String!
    author: Author
    points: Int!
    views: Int!
    tags: [String!]!
    answers: [Answer]
    answerCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Query {
    getUser(username: String!): User
    getAllUsers: [UserList]
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
    postQuestion(title: String!, body: String!, tags: [String!]!): Question
    deleteQuestion(quesId: ID!): ID!
  }
`;
