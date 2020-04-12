# Text to skills and keywords to jobs/schools
 
Project was created for a 1-day hackathon that was organized online.
Project is created using HeadAI's Semantic AI to fetch data with API query calls. For hackathon HeadAI presented a 
Microcompetencies-platform. By using the platform, students can compare their skills and future job market, 
and see how well their skills match the labor market. All three universities of applied sciences organized parallelly separate events. Yet, all the events had common lectures from world-class speakers. 
The events proved that the result is just as good as in real life, if the participants are motivated.
(03.04.2020, quoted from this <a href="https://www.3amk.fi/en/2020/04/03/first-virtual-hackathon-succeeded-beyond-expectations/">article</a>). 

<a href="https://headai-text-to-skills-85t5322.herokuapp.com/">Link to app on heroku</a>

### Description
Instead of using Dialogflow and Firebase database I had decided to use MongoDB, React and Heroku to publish the app. 
NodeJS uses a RESTful API endpoint to receive a request body. Request body is forwarded to HeadAI's API. 
Response is validated and notification message is displayed to the user in front-end. Axios library is used to post a request.
