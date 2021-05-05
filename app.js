const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typedefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(process.env.DATABASE_CONNECTION_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected database successfully!');
    return server.listen(PORT);
  })
  .then(() => {
    console.log(`Server listening on port ${PORT}`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
