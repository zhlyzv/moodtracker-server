const User = require('../../models/user');
const { populateEntries, transformData } = require('../util');

module.exports = {
    users: async () => {
        try {
            const result = await User.find();
            return result.map(user => ({
                ...transformData(user),
                entries: populateEntries.bind(this, user._doc.entries),
            }));
        } catch (err) {
            throw err;
        }
    },
};
