const _ = require('lodash')
const skillsToCoursesRouter = require('express').Router()
const SearchCourses = require('../models/searchCoursesByKeyWords')
const axios = require('axios')
const baseUrl =
  'https://3amkapi.headai.com/microcompetencies?action=skill_to_education'

skillsToCoursesRouter.get('/from-react', async (req, res) => {
  const response = await SearchCourses.find({})
  return res.json(response.map(school => school.toJSON()))
})

skillsToCoursesRouter.post('/from-react', async (req, res) => {

  console.log('Received a post request from react')
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ error: 'Object is empty.' })
  }

  await new SearchCourses(req.body).save()

  try {

    const response = await axios.post(
      `${baseUrl}&skill=${req.body.skill}&lang=${req.body.lang}&limit=${req.body.limit}&token=${process.env.TOKEN}`
    )

    if (_.isEmpty(response.data.data)) {
      return res.status(501).json({ error: 'No courses found.' })
    }

    return res.json(response.data.data)
  } catch (error) {
    console.log('error', error.message)
    return res.status(500).json({
      error: 'cannot receive data from server'
    })
  }
})

module.exports = skillsToCoursesRouter
