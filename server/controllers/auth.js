const express = require("express");
const { models } = require("../models");
const bcrypt = require("bcrypt");
const randToken = require("rand-token");
const {
  SALT_KEY,
  generateToken,
  REFRESH_TOKEN_SIZE,
  decodeToken,
} = require("../utils");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body.data;
    const user = await models.User.findOne({
      where: { username },
    });

    if (user) {
      res.status(409).json({
        code: 409,
        message: "User existed!",
      });
    } else {
      const hashPassword = bcrypt.hashSync(password, SALT_KEY);
      const newUser = {
        username,
        password: hashPassword,
      };
      const createdUser = await models.User.create(newUser);
      if (!createdUser) {
        return res.status(400).json({
          code: 400,
          message: "Create new account failed. Please try again.",
        });
      }
      return res.json({
        username,
        status: "Register success!",
      });
    }
  } catch (error) {
    res.json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body.data;

    const user = await models.User.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "Username doesn't exist!",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        message: "Password incorrect!",
      });
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
      id: user.id,
    };
    const accessToken = await generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return res
        .status(401)
        .json({ code: 401, message: "Login failed. Please try again!" });
    }

    let refreshToken = randToken.generate(REFRESH_TOKEN_SIZE);
    if (!user.refreshToken) {
      user.set({
        refreshToken,
      });
      await user.save();
    } else {
      refreshToken = user.refreshToken;
    }

    return res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/refresh", async (req, res) => {
  const [, accessTokenFromHeader] = req.headers.authorization.split(" ");
  if (!accessTokenFromHeader) {
    return res.status(400).json({
      code: 400,
      message: "Cann't find access token",
    });
  }

  const refreshTokenFromBody = req.body.data?.refreshToken;
  if (!refreshTokenFromBody) {
    return res.status(400).json({
      code: 400,
      message: "Cann't find refresh token",
    });
  }

  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const decoded = await decodeToken(accessTokenFromHeader, accessTokenSecret);
  if (!decoded) {
    return res.status(400).json({
      code: 400,
      message: "Invalid access token!",
    });
  }

  const userId = decoded.payload.id;

  const user = await models.User.findOne({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(401).json({
      code: 401,
      message: "User doesn't exist!",
    });
  }

  if (refreshTokenFromBody !== user.refreshToken) {
    return res.status(400).json({
      code: 400,
      message: "Invalid refresh token!",
    });
  }

  const dataForAccessToken = {
    id: userId,
  };

  const accessToken = await generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife
  );
  if (!accessToken) {
    return res.status(400).json({
      code: 400,
      message: "Create access token failed! Please try again!",
    });
  }
  return res.json({
    accessToken,
  });
});

module.exports = router;
