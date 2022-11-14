const express = require("express");
const { models } = require("../models");
const { isAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

router.get("/", isAuthenticated, async (_, res) => {
  try {
    const questions = await models.Question.findAll();
    const exams = await models.Exam.findAll();
    const examsQuestions = await models.ExamQuestion.findAll();

    res.json({ questions, exams, examsQuestions });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create", isAuthenticated, async (req, res) => {
  try {
    await models.ExamQuestion.destroy({
      where: {
        examId: req.body.data.examId,
      },
    });
    const data = req.body.data.questionIds?.map((questionId) => ({
      examId: req.body.data.examId,
      questionId,
    }));
    const response = await models.ExamQuestion.bulkCreate(data);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
