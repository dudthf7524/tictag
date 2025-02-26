const express = require("express");
const router = express.Router();

router.post("/user", async (req, res, next) => {
  try {
    const { id, pw } = req.body;
    console.log("id : ", id);
    console.log("pw : ", pw);
    const data = { login: "kim" };
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
