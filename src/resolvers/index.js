/**
 * Main entry for GraphQL resolvers.
 * Each type of resolver is contained in its own subdirectory.
 * E.g ./mutations contains all resolvers relevant to mutations.
 */
const mutation = require('./mutation/index');
const query = require('./query/index');
const scalars = require('./scalars/index');

module.exports = {
    ...query,
    ...mutation,
    ...scalars,
};
