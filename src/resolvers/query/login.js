const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { NotFoundError } = require('../../errorUtil');
const User = require('../../models/user');

module.exports = {
    login: async (root, { email, password }) => {
        const user = await User.findOne({ email });
        // TODO: Obfuscate login errors for production
        if (!user) {
            NotFoundError('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new UserInputError('Password incorrect.');
        }
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );
        return {
            userId: user.id,
            token,
            // TODO: consider making 'tokenExpiration' a string in .env
            tokenExpiration: 1,
        };
    },
};
