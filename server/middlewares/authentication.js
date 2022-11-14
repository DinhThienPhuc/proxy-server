const { models } = require("../models");
const { verifyToken } = require("../utils");

const isAuthenticated = async (req, res, next) => {
  const [, accessTokenFromHeader] = req.headers.authorization.split(" ");
  if (!accessTokenFromHeader) {
    return res.status(401).json({
      code: 401,
      message: "Cann't find access token!",
    });
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const verified = await verifyToken(accessTokenFromHeader, accessTokenSecret);
  if (!verified) {
    return res.status(401).json({
      code: 401,
      message: "You don't have permission to access this page!",
    });
  }

  const user = await models.User.findOne({
    where: {
      id: verified.payload.id,
    },
  });

  req.user = user;

  return next();
};

module.exports = {
  isAuthenticated,
};
