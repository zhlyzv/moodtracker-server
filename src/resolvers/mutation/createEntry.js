const { AuthenticationError } = require('apollo-server');
const { NotFoundError } = require('../../errorUtil');
const Entry = require('../../models/entry');
const User = require('../../models/user');
const { transformData } = require('../util');

module.exports = {
    createEntry: async (root, { EntryInput: { mood, note } }, context) => {
        if (!context.isAuthorized) {
            throw new AuthenticationError('Unauthorized access to mutation.');
        }

        const entry = new Entry({
            mood,
            note,
            addedBy: context.userId,
        });

        const result = await entry.save();
        const newEntry = transformData(result);
        const user = await User.findById(context.userId);

        if (!user) {
            NotFoundError('User does not exist.');
        }

        user.entries.push(entry);
        await user.save();
        return newEntry;
    },
};
