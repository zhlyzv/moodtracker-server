const Entry = require('../../models/entry');
const User = require('../../models/user');
const { transformData } = require('../util');

module.exports = {
    createEntry: async (root, { EntryInput: { mood, note } }, context) => {
        if (!context.isAuthorized) {
            throw Error('Unauthorized!');
        }
        let newEntry;
        const entry = new Entry({
            mood,
            note,
            addedBy: context.userId,
        });
        try {
            const result = await entry.save();
            newEntry = transformData(result);
            const user = await User.findById(context.userId);
            if (!user) {
                throw Error('User does not exist.');
            }
            user.entries.push(entry);
            await user.save();
            return newEntry;
        } catch (err) {
            throw err;
        }
    },
};
