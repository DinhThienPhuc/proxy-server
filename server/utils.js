const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const queryPromise = (mysqlConnector, sql) => {
  return new Promise((resolve, reject) => {
    mysqlConnector.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const difference = (arr1, arr2) => arr1.filter((x) => !arr2.includes(x));

const isAnswerForThisQuestionRight = (type, userAnswer, answer) => {
  if (type === "MULTIPLE_CHOICE") {
    return !difference(answer?.split("::"), userAnswer?.split("::"))?.length;
  }
  return answer === userAnswer;
};

const generateToken = async (payload, secretSignature, tokenLife) => {
  try {
    return await sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
};

const verifyToken = async (token, secretKey) => {
  try {
    return await verify(token, secretKey);
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
    return null;
  }
};

const decodeToken = async (token, secretKey) => {
  try {
    return await verify(token, secretKey, {
      ignoreExpiration: true,
    });
  } catch (error) {
    console.log(`Error in decode access token: ${error}`);
    return null;
  }
};

const API_PREFIX = "/api/v1";

const SALT_KEY = 7;

const REFRESH_TOKEN_SIZE = 100;

module.exports = {
  queryPromise,
  isAnswerForThisQuestionRight,
  generateToken,
  decodeToken,
  verifyToken,
  API_PREFIX,
  REFRESH_TOKEN_SIZE,
  SALT_KEY,
};
