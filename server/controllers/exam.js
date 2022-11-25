const express = require("express");
const { models } = require("../models");
const { isAuthenticated } = require("../middlewares/authentication");
const uniqBy = require("lodash/uniqBy");
const Sequelize = require("sequelize");
const { isAnswerForThisQuestionRight } = require("../utils");

const router = express.Router();

router.get("/:id", isAuthenticated, async (req, res) => {
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
        userId: req.user.id,
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

router.post("/:id", isAuthenticated, async (req, res) => {
  try {
    await models.UserExamQuestion.destroy({
      where: {
        examId: req.params.id,
        userId: req.user.id,
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
      const isAnswerRight = isAnswerForThisQuestionRight(
        type,
        req.body.data[questionId],
        answer
      );

      if (isAnswerRight) {
        score += 10;
      } else {
        score += 0;
      }

      return {
        userId: req.user.id,
        examId: req.params.id,
        questionId,
        userAnswer: req.body.data[questionId],
      };
    });

    data = data.map((d) => ({
      ...d,
      examScore: `${score}/${listQuestionIds.length * 10}`,
    }));

    const response = await models.UserExamQuestion.bulkCreate(data);
    res.json({
      response,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const { page = "1", size = "10", search } = req.query;
    let paginationParams = {};
    if (!isNaN(Number(size))) {
      paginationParams.limit = Number(size);
    }
    if (!isNaN(Number(page))) {
      paginationParams.offset = Number(size) * (Number(page) - 1);
    }
    if (search) {
      paginationParams.where = {
        name: {
          [Sequelize.Op.like]: `%${search}%`,
        },
      };
    }
    const listExams = Object.keys(paginationParams).length
      ? await models.Exam.findAndCountAll(paginationParams)
      : await models.Exam.findAndCountAll();
    const userExamsQuestion = await models.UserExamQuestion.findAll({
      where: { userId: req.user.id },
    });

    const uniqUserExams = uniqBy(userExamsQuestion, "examId");

    const data = listExams?.rows?.map((exam) => ({
      id: exam.id,
      name: exam.name,
      description: exam.description,
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
      score:
        uniqUserExams?.find((e) => exam.id === e.examId)?.examScore ?? null,
    }));

    res.json({
      page: Number(page),
      size: Number(size),
      totalRecords: listExams.count,
      data,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
