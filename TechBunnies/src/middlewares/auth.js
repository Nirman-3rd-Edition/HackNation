const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils');

const auth = async (req, res, next) => {
    let token = req.cookies.accessToken;
    try {
      let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      let matchedUser = await user.findById(payload.id, "-password -__v");
      if (!matchedUser) {
        return errorResponse(req, res, "User Not Found", 404);
      }
      req.user = matchedUser;

      next();
    } catch (error) {
      return errorResponse(req, res, 'Unauthorized!!!', 401);
    }
}

module.exports = { auth }
