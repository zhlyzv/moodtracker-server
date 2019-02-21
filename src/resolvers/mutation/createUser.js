const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const { transformData } = require('../util');

module.exports = {
    createUser: async (root, { UserInput: { email, password, name } }) => {
        console.log('createuser');
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
};
