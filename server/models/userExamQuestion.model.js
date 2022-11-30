const { DataTypes } = require("sequelize");
const sequelize = require("./init");

const UserExamQuestion = sequelize.define(
  "UserExamQuestion",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
    },
    examId: {
      type: DataTypes.UUID,
    },
    questionId: {
      type: DataTypes.UUID,
    },
    userAnswer: {
      type: DataTypes.TEXT,
    },
    examScore: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "users_exams_questions",
  }
);

module.exports = UserExamQuestion;
