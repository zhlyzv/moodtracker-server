const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers/index');
const context = require('./context');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    cors: true,
    // TODO: Consider adding authentication https://www.apollographql.com/docs/apollo-server/v2/features/authentication.html#context
});

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${
                process.env.MONGO_PASSWORD
            }@cluster0-g7ofj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
            { useNewUrlParser: true, dbName: process.env.MONGO_DB },
        );
        await server.listen({ port: process.env.PORT });
        // eslint-disable-next-line
        console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    } catch (err) {
        throw Error('Failed to start server 😱', err);
    }
};

start();
