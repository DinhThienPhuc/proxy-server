const express = require("express");
const { models } = require("../models");
const uniqBy = require("lodash/uniqBy");
const Sequelize = require("sequelize");
const { isAnswerForThisQuestionRight, FAKE_USER_ID } = require("../utils");

const router = express.Router();

// TOOD: remove later

router.get("/:id", async (req, res) => {
  try {
    const examInfo = await models.Exam.findOne({
      where: {
        id: req.params.id,
      },
    });

    const listQuestionsOfExam = await models.ExamQuestion.findAll({
      where: {
        examId: req.params.id,
      },
    });

    const listQuestionsWithDetailOfExam = await models.Question.findAll({
      where: {
        id: listQuestionsOfExam?.map((data) => data.questionId),
      },
    });

    const listQuestionsOfUser = await models.UserExamQuestion.findAll({
      where: {
        examId: req.params.id,
        userId: FAKE_USER_ID,
      },
    });

    const result = listQuestionsWithDetailOfExam.map((questionData) => {
      const userQuestionData = listQuestionsOfUser?.find(
        (data) => data.questionId === questionData.id
      );

      let isRight = false;
      if (userQuestionData?.userAnswer) {
        isRight = isAnswerForThisQuestionRight(
          questionData.type,
          userQuestionData?.userAnswer,
          questionData.answer
        );
      }

      return {
        id: questionData.id,
        title: questionData.title,
        type: questionData.type,
        a: questionData.a,
        b: questionData.b,
        c: questionData.c,
        d: questionData.d,
        examScore: userQuestionData?.examScore || null,
        userAnswer: userQuestionData?.userAnswer || null,
        // answer: questionData.answer,
        isRight,
        createdAt: questionData.createdAt,
        updatedAt: questionData.updatedAt,
      };
    });

    res.json({
      id: examInfo.id,
      name: examInfo.name,
      description: examInfo.description,
      examScore: listQuestionsOfUser?.[0]?.examScore || null,
      questions: result,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/:id", async (req, res) => {
  try {
    await models.UserExamQuestion.destroy({
      where: {
        examId: req.params.id,
        userId: FAKE_USER_ID,
      },
    });

    let score = 0;
    const questionsDictionary = {};
    const listQuestionIds = Object.keys(req.body.data);

    const listQuestions = await models.Question.findAll({
      where: {
        id: {
          [Sequelize.Op.or]: listQuestionIds,
        },
      },
    });

    listQuestions.forEach((questionData) => {
      questionsDictionary[questionData.id] = questionData;
    });

    let data = listQuestionIds.map((questionId) => {
      const type = questionsDictionary[questionId]?.type;
      const answer = questionsDictionary[questionId]?.answer;
      score += isAnswerForThisQuestionRight(
        type,
        req.body.data[questionId],
        answer
      )
        ? 10
        : 0;

      return {
        userId: FAKE_USER_ID,
        examId: req.params.id,
        questionId,
        userAnswer: req.body.data[questionId],
      };
    });

    data = data.map((d) => ({ ...d, examScore: `${score}/100` }));

    const response = await models.UserExamQuestion.bulkCreate(data);
    res.json({
      response,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/", async (_, res) => {
  try {
    console.log("listExams first");
    const listExams = await models.Exam.findAll();
    console.log("listExams", listExams);
    const userExams = await models.UserExamQuestion.findAll({
      where: { userId: FAKE_USER_ID },
    });

    const uniqUserExams = uniqBy(userExams, "userId", "examId");

    const result = listExams?.map((exam) => ({
      id: exam.id,
      name: exam.name,
      description: exam.description,
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
      score:
        uniqUserExams?.find((e) => exam.id === e.examId)?.examScore ?? null,
    }));

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
