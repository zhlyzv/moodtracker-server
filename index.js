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

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
            process.env.MONGO_PASSWORD
        }@cluster0-g7ofj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
        { useNewUrlParser: true, dbName: process.env.MONGO_DB },
    )
    .then(() => {
        server
            .listen()
            .then(({ url }) => {
                console.log(`🚀 Server running at ${url}`);
            })
            .catch(err => {
                throw Error('Failed to start Apollo Server 😱', err);
            });
    })
    .catch(err => {
        throw Error('Failed to connect to MongoDB! 😱', err);
    });
