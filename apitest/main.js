const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { getTest } = require("./controller");

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/getTest", getTest);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
