const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');
const User = require('../../models/user');
const { transformData } = require('../util');

module.exports = {
    createUser: async (root, { UserInput: { email, password, name } }) => {
        if (await User.findOne({ email })) {
            throw new UserInputError('User already exists.', { email });
        }

        const user = new User({
            email,
            password: await bcrypt.hash(password, 12),
            name,
        });

        const result = await user.save();

        return {
            ...transformData(result),
            // we shouldn't be able to retrieve the password
            password: null,
        };
    },
};
