/**
 * Main entry for Query types.
 * Each query should be contained in its own file.
 */
const entries = require('./entries');
const users = require('./users');

module.exports = {
    Query: {
        ...entries,
        ...users,
    },
};
