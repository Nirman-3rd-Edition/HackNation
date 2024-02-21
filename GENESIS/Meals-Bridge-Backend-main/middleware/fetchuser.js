var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.Secretsignature;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token'); //--->here we are getting the authentication token from the header of the api request. we are storing the token in the variable token.
    console.log(token);
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; //-->here we are storing the user id in the req.user. we are getting the user id from the token.
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;