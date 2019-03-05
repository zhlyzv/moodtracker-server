const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers/index');
const context = require('./context');
const logger = require('./logging');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    cors: true,
});

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
                process.env.MONGO_INITDB_ROOT_PASSWORD
            }@database:27017/${
                process.env.MONGO_INITDB_DATABASE
            }?authSource=admin&retryWrites=true`,
            {
                useNewUrlParser: true,
                // connectTimeoutMS: 25000,
                // socketTimeoutMS: 25000,
            },
        );
        await server.listen({ port: process.env.PORT });
        logger.info(`🚀 Server running at http://localhost:${process.env.PORT}`);
    } catch (err) {
        logger.error('Server failed to start %s', new Error(err));
    }
};

start();
