const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const teacherRouter = require("./routes/teachersRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({ message: "This is your API response" });
  console.log(req.cookies.jwt);
});

app.use("/api/v1/teachers", teacherRouter);

module.exports = app;
