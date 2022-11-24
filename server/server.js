const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { sequelize } = require("./models");
const initDataController = require("./controllers/init-data");
const examController = require("./controllers/exam");
const dashboardController = require("./controllers/dashboard");
const authController = require("./controllers/auth");
const { API_PREFIX } = require("./utils");

const app = express();

app.set("trust proxy", true);

// TODO: apply redis later

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(`${API_PREFIX}/auth`, authController);
app.use(`${API_PREFIX}/init-data`, initDataController);
app.use(`${API_PREFIX}/exams`, examController);
app.use(`${API_PREFIX}/dashboard`, dashboardController);

sequelize.sync();

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => console.log("Server is running"));
