const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const User = require('./models/user');
const Entry = require('./models/entry');
const bcrypt = require('bcryptjs');

const populateUser = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            entries: populateEntries.bind(this, user._doc.entries),
        };
    } catch (err) {
        throw err;
    }
};

const populateEntries = async ids => {
    try {
        const entries = await Entry.find({ _id: { $in: ids } });
        return entries.map(entry => {
            return {
                ...entry._doc,
                _id: entry.id,
                addedBy: populateUser.bind(this, entry.addedBy),
            };
        });
    } catch (err) {
        throw err;
    }
};

module.exports = {
    Query: {
        user: (root, { id }) => users[id],
        users: async () => {
            try {
                const result = await User.find();
                return result.map(user => {
                    return {
                        ...user._doc,
                        _id: user.id,
                        entries: populateEntries.bind(this, user._doc.entries),
                    };
                });
            } catch (err) {
                throw err;
            }
        },
        entries: async () => {
            try {
                const result = await Entry.find();
                return result.map(entry => {
                    return {
                        ...entry._doc,
                        _id: entry.id,
                        addedBy: populateUser.bind(this, entry._doc.addedBy),
                    };
                });
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
                    ...result._doc,
                    _id: result.id,
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
                newEntry = {
                    ...result._doc,
                    _id: result.id,
                };
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
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type ⏲',
        parseValue(value) {
            // value from the client
            return new Date(value);
        },
        serialize(value) {
            // value sent to the client
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // ast value is always in string format
                return new Date(ast.value);
            }
            return null;
        },
    }),
};
