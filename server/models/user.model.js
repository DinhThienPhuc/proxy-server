import sequelize from '.'

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
})

export default User
