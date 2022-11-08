const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models");
const initDataController = require("./controllers/init-data");
const examController = require("./controllers/exam");
const dashboardController = require("./controllers/dashboard");

const app = express();

app.set("trust proxy", true);

// TODO: apply redis later

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/init-data", initDataController);
app.use("/exams", examController);
app.use("/dashboard", dashboardController);

sequelize.sync();

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => console.log("Server is running"));
