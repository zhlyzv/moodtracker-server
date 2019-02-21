const Entry = require('../../models/entry');
const User = require('../../models/user');
const { transformData } = require('../util');

module.exports = {
    createEntry: async (root, { EntryInput: { mood, note } }) => {
        let newEntry;
        const entry = new Entry({
            mood,
            note,
            addedBy: '5c6dcf5bdd89210a6d1fa4c8',
        });
        try {
            const result = await entry.save();
            newEntry = transformData(result);
            const user = await User.findById('5c6dcf5bdd89210a6d1fa4c8');
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
