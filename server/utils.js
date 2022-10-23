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

const parseAnswerRightOrWrong = (questions = []) => {
  return questions.map((question) => {
    const isThisAnswerRight = !difference(
      question.answer?.split('::'),
      question.user_answer?.split('::')
    )?.length

    return {
      id: question?.id || 0,
      title: question.title || '',
      type: question.type || '',
      option_1: question.option_1,
      option_2: question.option_2,
      option_3: question.option_3,
      option_4: question.option_4,
      is_this_answer_right: isThisAnswerRight,
      question_id: 1,
    }
  })
}

module.exports = {
  queryPromise,
  parseAnswerRightOrWrong,
}
