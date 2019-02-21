const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Entry = require('./models/entry');
const scalars = require('./scalars');

const transformData = data => ({
    ...data._doc,
    _id: data.id,
});

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

module.exports = {
    Query: {
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
        entries: async () => {
            try {
                const result = await Entry.find();
                return result.map(entry => ({
                    ...transformData(entry),
                    addedBy: populateUser.bind(this, entry._doc.addedBy),
                }));
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createUser: async (root, { UserInput: { email, password, name } }) => {
            try {
                if (await User.findOne({ email })) {
                    throw Error('User already exists.');
                }
                const user = new User({
                    email,
                    password: await bcrypt.hash(password, 12),
                    name,
                });

                const result = await user.save();

                return {
                    ...transformData(result),
                    // we don't want to be able to retrieve passwords
                    password: null,
                };
            } catch (err) {
                throw err;
            }
        },
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
    },
    ...scalars,
};
