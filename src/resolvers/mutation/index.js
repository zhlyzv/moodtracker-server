/**
 * Main entry for Mutation types.
 * Each mutation should be contained in its own file.
 */
const createUser = require('./createUser');
const createEntry = require('./createEntry');

module.exports = {
    Mutation: {
        ...createUser,
        ...createEntry,
    },
};
