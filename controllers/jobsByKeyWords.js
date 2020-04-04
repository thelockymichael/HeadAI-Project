const textToSkillRouter = require("express").Router();
const SearchJobs = require("../models/searchJobsByKeywords");

const axios = require("axios");
const baseUrl =
  "https://3amkapi.headai.com/microcompetencies?action=request_jobs_by_keywords";

textToSkillRouter.post("/from-react", async (req, res) => {
  console.log("Received a post request from react");
  if (!req.body) return res.sendStatus(400);

  console.log(req.body);
  await new SearchJobs({
    words: req.body.words,
    area: req.body.area,
    time_range_start: req.body.time_range_start
  }).save();

  try {
    const response = await axios.post(
      `${baseUrl}&words=${req.body.words}&area=${req.body.area}&time_range_start=${req.body.time_range_start}
      &token=${process.env.TOKEN}`
    );
    console.log("response.data", response.data.results);

    return res.json(response.data.results);
  } catch (error) {
    console.log("error", error.message);
    return res.status(401).json({
      error: "cannot receive data from server"
    });
  }
});

textToSkillRouter.post("/webhook", async (req, res) => {
  console.log("Received a post request");

  if (!req.body) return res.sendStatus(400);
  const text = req.body.queryResult.parameters.text;

  try {
    const response = await axios.post(
      `${baseUrl}&words=${req.body.words}&area=${req.body.area}&time_range_start=${req.body.time_range_start}
      &token=${process.env.TOKEN}`
    );
    /*     const response = await axios.post(
      `${baseUrl}&text=${text}&token=${process.env.TOKEN}`
    ) */
    const textResponse = `Your following skills are ${response.data.data.toString()}`;
    console.log("response.data", response.data.data);

    await new SearchJobs({
      words: req.body.text,
      area: req.body.area,
      time_range_start: req.body.time_range_start
    }).save();

    const setOfSkills = createTextResponse(textResponse);
    return res.send(setOfSkills); // Returns result to Dialogflow as JSON
  } catch (error) {
    console.log("error", error.message);
    return res.status(401).json({
      error: "cannot receive data from server"
    });
  }

  function createTextResponse(textResponse) {
    const response = {
      fulfillmentText: "This is a text response",
      fulfillmentMessages: [
        {
          text: {
            text: [textResponse]
          }
        }
      ],
      source: "example.com",
      payload: {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: "this is a simple response"
                }
              }
            ]
          }
        },
        facebook: {
          text: "Hello, Facebook!"
        },
        slack: {
          text: "This is a text response for Slack."
        }
      }
    };
    console.log("createTexResponse", response);
    return response;
  }
});

module.exports = textToSkillRouter;
