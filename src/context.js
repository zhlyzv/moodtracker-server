// Set the global context for each resolver.
const jwt = require('jsonwebtoken');

module.exports = async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || '';
    const token = auth.split(' ')[1];
    if (!token) {
        return {
            isAuthorized: false,
            userId: null,
        };
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
        return {
            isAuthorized: false,
            userId: null,
        };
    }
    return {
        isAuthorized: true,
        userId: decodedToken.userId,
    };
};
