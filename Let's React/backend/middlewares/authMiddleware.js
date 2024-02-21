const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
