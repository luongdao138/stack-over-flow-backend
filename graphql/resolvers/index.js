const userResolvers = require('./user');

module.exports = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  User: {
    reputation: (parent) => {
      const questionRep = parent.questions.reduce((sum, q) => sum + q.rep, 0);
      const answerRep = parent.answers.reduce((sum, q) => sum + q.rep, 0);
      return questionRep + answerRep + 1;
    },
    totalAnswers: (parent) => parent.answers.length,
    totalQuestions: (parent) => parent.questions.length,
  },
  RoleType: {
    ADMIN: 'admin',
    USER: 'user',
  },
  SortByType: {
    HOT: 'hot',
    VOTES: 'votes',
    VIEWS: 'views',
    NEWEST: 'newest',
    OLDEST: 'oldest',
  },
  VoteType: {
    UPVOTE: 'upvote',
    DOWNVOTE: 'downvote',
  },
};
