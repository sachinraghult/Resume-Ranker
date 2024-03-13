// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const log = require("./log");
const celery = require("./celery");

const authRouter = require("./api/auth");
const userRouter = require("./api/user");
const postRouter = require("./api/post");
const applicationRouter = require("./api/application");
const landingDashboardRouter = require("./api/landingDashboard");
const jobSpecificDashboardRouter = require("./api/jobSpecificDashboard");
const reportRouter = require("./api/report");
const profileRouter = require("./api/profile");
const normaliserRouter = require("./api/normaliser");
const utilsRouter = require("./api/utils");

// create express app
const app = express();

// open db
require("./db/mongoose");

// dummy index route
app.get("/", async (_req, res) => {
  res.send("Hello, CCIBT9!");
});

// MIDDLEWARE
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(morgan("combined", { stream: log.stream }));
app.use(fileUpload());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ROUTERS
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/application", applicationRouter);
app.use("/landingDashboard", landingDashboardRouter);
app.use("/jobSpecificDashboard", jobSpecificDashboardRouter);
app.use("/report", reportRouter);
app.use("/profile", profileRouter);
app.use("/normaliser", normaliserRouter);
app.use("/utils", utilsRouter);

module.exports = app;
