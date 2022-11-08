const { DataTypes } = require("sequelize");
const sequelize = require("./init");

const ExamQuestion = sequelize.define(
  "ExamQuestion",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    examId: {
      type: DataTypes.UUID,
    },
    questionId: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "exams_questions",
  }
);

module.exports = ExamQuestion;
