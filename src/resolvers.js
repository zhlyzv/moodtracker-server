const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const User = require('./models/user');

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
                    throw new Error('Failed to fetch users!', err);
                });
        },
    },
    Mutation: {
        createUser: (root, { name, email, password }) => {
            const user = new User({
                email: email,
                password: password,
                name: name,
            });

            return user
                .save()
                .then(result => {
                    return {
                        ...result._doc,
                        _id: result.id,
                    };
                })
                .catch(err => {
                    throw new Error('Failed to save user!', err);
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
