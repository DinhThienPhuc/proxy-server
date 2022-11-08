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
    console.log("answer, answer", answer, userAnswer);
    !difference(answer?.split("::"), userAnswer?.split("::"))?.length;
  }
  return answer === userAnswer;
};

const FAKE_USER_ID = "7cd4ca79-e354-4978-af2b-6a1d19dd74bd";

module.exports = {
  queryPromise,
  isAnswerForThisQuestionRight,
  FAKE_USER_ID,
};
