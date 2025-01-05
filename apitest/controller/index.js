const db = require("../db");

const getTest = (req, res) => {
  try {
    res.status(200).json({
      message: "이거 안되면 500은 ok 안되는거임",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "에러남",
    });
  }
};

module.exports = { getTest };
