const User = require('../models/user');
const Entry = require('../models/entry');

/**
 * transformData - Transform the MongoDB data into a useful format for GraphQL.
 *
 * @param {Object} data
 * @returns {Object}
 */
const transformData = data => ({
    ...data._doc,
    _id: data.id,
});

/**
 * populateUser - Given a userId, populate entries for the user.
 *
 * @param {String} userId
 * @returns {Object}
 */
const populateUser = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...transformData(user),
            // eslint-disable-next-line
            entries: populateEntries.bind(this, user._doc.entries),
        };
    } catch (err) {
        throw err;
    }
};

/**
 * populateEntries - Given an array of ids, populate the addedBy field user data.
 *
 * @param {Array} ids
 * @returns {Object}
 */
const populateEntries = async ids => {
    try {
        const entries = await Entry.find({ _id: { $in: ids } });
        return entries.map(entry => ({
            ...transformData(entry),
            addedBy: populateUser.bind(this, entry.addedBy),
        }));
    } catch (err) {
        throw err;
    }
};

exports.populateEntries = populateEntries;
exports.populateUser = populateUser;
exports.transformData = transformData;
