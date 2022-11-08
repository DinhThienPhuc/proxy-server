const express = require("express");
const { models } = require("../models");
const router = express.Router();

const questionsData = require("../database/questions.json");
const usersData = require("../database/users.json");
const examsData = require("../database/exams.json");

router.get("/questions", async (_, res) => {
  try {
    await models.Question.destroy();
    const response = await models.Question.bulkCreate(questionsData);
    res.json({
      response,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/exams", async (_, res) => {
  try {
    await models.Exam.destroy();
    const response = await models.Exam.bulkCreate(examsData);
    res.json({
      response,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/users", async (_, res) => {
  try {
    await models.User.destroy();
    const response = await models.User.bulkCreate(usersData);
    res.json({
      response,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
