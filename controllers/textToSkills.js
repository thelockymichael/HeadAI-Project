const _ = require('lodash')
const textToSkillRouter = require('express').Router()
const SearchSkill = require('../models/searchSkill')
const axios = require('axios')
const baseUrl =
  'https://3amkapi.headai.com/microcompetencies?action=text_to_skills'

textToSkillRouter.get('/from-react', async (req, res) => {
  const response = await SearchSkill.find({})
  return res.json(response.map(skill => skill.toJSON()))
})

textToSkillRouter.post('/from-react', async (req, res) => {
  console.log('Received a post request from react')
  if (_.isEmpty(req.body)) {
    return res.status(400).json({ error: 'Object is empty.' })
  }

  try {
    const response = await axios.post(
      `${baseUrl}&text=${req.body.text}&token=${process.env.TOKEN}`
    )
    if (!response.data.data.length) {
      return res.status(501).json({ error: 'No skills found.' })
    }
    await new SearchSkill({
      skills: response.data.data
    }).save()

    return res.json(response.data.data)
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({
      error: 'Cannot receive data from server.'
    })
  }
})


module.exports = textToSkillRouter
