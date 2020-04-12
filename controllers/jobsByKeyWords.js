const skillsToJobsRouter = require('express').Router()
const SearchJobs = require('../models/searchJobsByKeyWords')
const axios = require('axios')

const baseUrl =
  'https://3amkapi.headai.com/microcompetencies?action=request_jobs_by_keywords'

skillsToJobsRouter.get('/from-react', async (req, res) => {
  const response = await SearchJobs.find({})
  return res.json(response.map((job) => job.toJSON()))
})

skillsToJobsRouter.post('/from-react', async (req, res) => {

  console.log('Received a post request from react')

  await new SearchJobs(req.body).save()

  try {
    const response = await axios.post(
      `${baseUrl}&words=${req.body.words}&area=${req.body.area}&time_range_start=${req.body.time_range_start}
      &token=${process.env.TOKEN}`
    )

    if (!response.data.results) {
      return res.status(501).json({ error: 'No jobs found.' })
    }

    return res.json(response.data.results)
  } catch (error) {
    console.log('error', error.message)
    return res.status(500).json({
      error: 'cannot receive data from server',
    })
  }
})

module.exports = skillsToJobsRouter
