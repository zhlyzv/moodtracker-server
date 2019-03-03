const { ApolloError } = require('apollo-server');

module.exports = {
    NotFoundError: message => new ApolloError(message, 'NOT_FOUND'),
};
