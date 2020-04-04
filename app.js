const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("express-async-errors");

const textToSkillRouter = require("./controllers/textToSkills");
const jobsByKeyWords = require("./controllers/jobsByKeyWords");
/* const searchSkillsRouter = require('./controllers/searchSkill')
 */
//&text=technical director at software company where I mostly did java&token=your_secret_token'
/* const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login') */

const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

const path = require("path");

console.log("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/text-to-skills/", textToSkillRouter);
app.use("/api/jobs-by-keywords/", jobsByKeyWords);
//app.use('/api/jobs-by-keywords/', jobsByKeyWords)
/* app.use('/api/webhooks/search-skills', searchSkillsRouter)
 */
if (process.env.NODE_ENV === "test") {
  console.log("TESTING");
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
