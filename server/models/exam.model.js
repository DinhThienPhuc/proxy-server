import sequelize from '.'

const Exam = sequelize.define('Exam', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
})

export default Exam
