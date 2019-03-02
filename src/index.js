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
});

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
                process.env.MONGO_INITDB_ROOT_PASSWORD
            }@cluster0-g7ofj.mongodb.net/${process.env.MONGO_INITDB_DATABASE}?retryWrites=true`,
            { useNewUrlParser: true, dbName: process.env.MONGO_INITDB_DATABASE },
        );
        await server.listen({ port: process.env.PORT });
        // eslint-disable-next-line
        console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    } catch (err) {
        throw Error('Failed to start server 😱', err);
    }
};

start();
