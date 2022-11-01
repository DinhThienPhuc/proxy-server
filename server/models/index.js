const { Sequelize } = require('sequelize')

const databaseInfo = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
}

const sequelize = new Sequelize(
  databaseInfo.database,
  databaseInfo.user,
  databaseInfo.password,
  {
    host: databaseInfo.host,
    dialect: 'mysql',
  }
)

export const User = sequelize.define('User', {
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

export default sequelize
