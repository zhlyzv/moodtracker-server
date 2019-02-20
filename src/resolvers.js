const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const User = require('./models/user');
const Entry = require('./models/entry');
const bcrypt = require('bcryptjs');

module.exports = {
    Query: {
        user: (root, { id }) => users[id],
        users: () => {
            return User.find()
                .then(result =>
                    result.map(user => {
                        return {
                            ...user._doc,
                            _id: user.id,
                        };
                    }),
                )
                .catch(err => {
                    throw err;
                });
        },
    },
    Mutation: {
        createUser: (root, { UserInput: { email, password, name } }) => {
            return User.findOne({ email })
                .then(user => {
                    if (user) {
                        throw Error('User already exists.');
                    }
                    return bcrypt.hash(password, 12);
                })
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        password: hashedPassword,
                        name,
                    });
                    return user.save();
                })
                .then(result => {
                    return {
                        ...result._doc,
                        _id: result.id,
                        // we don't want to be able to retrieve passwords
                        password: null,
                    };
                })
                .catch(err => {
                    throw err;
                });
        },
        createEntry: (root, { EntryInput: { mood, note } }) => {
            const entry = new Entry({
                mood,
                note,
            });

            return entry
                .save()
                .then(result => {
                    return {
                        ...result._doc,
                        _id: result.id,
                    };
                })
                .catch(err => {
                    throw err;
                });
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
