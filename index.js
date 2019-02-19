const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const mongoose = require('mongoose');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true,
    // TODO: Consider adding authentication https://www.apollographql.com/docs/apollo-server/v2/features/authentication.html#context
});

server
    .listen()
    .then(({ url }) => {
        console.log(`🚀 Server running at ${url}`);
        mongoose
            .connect(
                `mongodb+srv://${process.env.MONGO_USER}:${
                    process.env.MONGO_PASSWORD
                }@cluster0-g7ofj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
                { useNewUrlParser: true },
            )
            .catch(err => {
                throw new Error('Failed to connect to MongoDB! 😱', err);
            });
    })
    .catch(err => {
        throw new Error('Failed to start Apollo Server 😱', err);
    });
