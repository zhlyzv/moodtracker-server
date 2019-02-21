const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
    login: async (root, { email, password }) => {
        const user = await User.findOne({ email });
        // console.log(context.userId);
        if (!user) {
            throw Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw Error('Password incorrect!');
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
