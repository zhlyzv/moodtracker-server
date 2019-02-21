/**
 * Main entry for Query types.
 * Each query should be contained in its own file.
 */
const entries = require('./entries');
const users = require('./users');
const login = require('./login');

module.exports = {
    Query: {
        ...entries,
        ...users,
        ...login,
    },
};
