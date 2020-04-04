const textToSkillRouter = require("express").Router();
const SearchSkill = require("../models/searchSkill");

const axios = require("axios");
const baseUrl =
  "https://3amkapi.headai.com/microcompetencies?action=text_to_skills";

textToSkillRouter.post("/from-react", async (req, res) => {
  console.log("Received a post request from react");
  if (!req.body) return res.sendStatus(400);

  console.log(req.body);

  try {
    const response = await axios.post(
      `${baseUrl}&text=${req.body.text}&token=${process.env.TOKEN}`
    );
    console.log("response IMPORTANT!", response.data.data);
    if (response.data.data.length === 0) {
      return res.status(400).json({ error: "no skills collected" });
    }
    console.log("response.data", response.data.data);
    await new SearchSkill({
      skills: response.data.data
    }).save();

    return res.json(response.data.data);
  } catch (error) {
    console.log("error", error.message);
    return res.status(401).json({
      error: "cannot receive data from server".toString
    });
  }
});

textToSkillRouter.post("/webhook", async (req, res) => {
  console.log("Received a post request");

  if (!req.body) return res.sendStatus(400);
  const text = req.body.queryResult.parameters.text;

  try {
    const response = await axios.post(
      `${baseUrl}&text=${text}&token=${process.env.TOKEN}`
    );
    const textResponse = `Your following skills are ${response.data.data.toString()}`;
    console.log("response.data", response.data.data);

    await new SearchSkill({
      skills: response.data.data,
      date: new Date()
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
