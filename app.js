const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const globalErrorHandler = require("./Controller/errorController");
// const blogRouter = require("./Routes/blogsRoutes");
// const eventRouter = require("./Routes/eventsRoutes");
// const projectRouter = require("./Routes/projectRoutes");
// const teamRouter = require("./Routes/teamRoutes");
// const videoRouter = require("./Routes/videoRoutes");
const auditorRouter = require("./Routes/auditorRoute");
const contestRouter = require("./Routes/contestRoute");
const judgeRouter = require("./Routes/judgeRoutes");

const AppError = require("./utils/appError");
dotenv.config();

const app = express();

const allowList = [process.env.ALLOWED_URL_1, process.env.ALLOWED_URL_2];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = {
    credentials: true,
  };

  if (allowList.indexOf(req.header("Origin")) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions.origin = false; // disable CORS for this request
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(express.json());
app.use(cors(corsOptionsDelegate));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/test", (req, res) => {
  res.send("Working");
});

app.use(express.json({ limit: "8mb" }));

//All the routes comes here

app.get("/api/v1", (req, res, next) => {
  res.send("Test working");
});

app.use("/auditor", auditorRouter);
app.use("/contest", contestRouter);
app.use("/judge", judgeRouter);

// app.use("/api/v1/blog", blogRouter);
// app.use("/api/v1/event", eventRouter);
// app.use("/api/v1/project", projectRouter);
// app.use("/api/v1/team", teamRouter);
// app.use("/api/v1/video", videoRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//This is the global error handler
app.use(globalErrorHandler);

module.exports = app;