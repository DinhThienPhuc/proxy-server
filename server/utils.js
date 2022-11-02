const queryPromise = (mysqlConnector, sql) => {
  return new Promise((resolve, reject) => {
    mysqlConnector.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

const difference = (arr1, arr2) => arr1.filter((x) => !arr2.includes(x))

const isAnswerForThisQuestionRight = (question) => {
  if (question.type === 'MULTIPLE_CHOICE') {
    !difference(
      question.answer?.split('::'),
      question.UserExamQuestions.userAnswer?.split('::')
    )?.length
  }
  return question.answer === question.UserExamQuestions.userAnswer
}

module.exports = {
  queryPromise,
  isAnswerForThisQuestionRight,
}
