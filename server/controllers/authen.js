const express = require("express");
const router = express.Router();

router.post("/login", async (_, res) => {
  try {
    res.json({
      login: "login",
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/logout", async (_, res) => {
  try {
    res.json({
      logout: "logout",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
