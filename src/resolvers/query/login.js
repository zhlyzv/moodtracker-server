const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { NotFoundError } = require('../../errorUtil');
const User = require('../../models/user');

module.exports = {
    /**
     * login - Issue user with JWT for login.
     *
     * @param {Object} root - the root GQL query
     * @param {String} email - the user email
     * @param {String} password - the user password
     * @returns {Object}
     */
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
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION },
        );
        return {
            userId: user.id,
            token,
            tokenExpiration: parseInt(process.env.JWT_TOKEN_EXPIRATION, 10),
        };
    },
};
