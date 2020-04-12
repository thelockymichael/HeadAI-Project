
const SearchSkill = require('../models/searchSkill')
const SearchJob = require('../models/searchJobsByKeyWords')
const SearchCourse = require('../models/searchCoursesByKeyWords')

const initialSearchSkills = [
  {
    skills: ['programming', 'accounting', 'testing']
  },
  {
    skills: ['marketing', 'management', 'customer service']
  },
  {
    skills: ['designing', 'serving', 'project']
  }
]

const initialSearchJobs = [
  {
    words: 'qualified, engineer, experience',
    area: 'Pori',
    time_range_start: '2020-01'
  },
  {
    words: 'programming, engineer, design',
    area: 'Tampere',
    time_range_start: '2020-04'
  },
  {
    words: 'coordination, presentation, sales',
    area: 'Helsinki',
    time_range_start: '2020-03'
  }
]

const initialSearchCourses = [
  {
    skill: 'programming, engineer, design',
    lang: 'fi',
    limit: '3'
  },
  {
    skill: 'marketing, healthcare',
    lang: 'fi',
    limit: '5'
  },
  {
    skill: 'caring, selling',
    lang: 'en',
    limit: '10'
  }
]

const searchSkillsInDb = async () => {
  const searchSkills = await SearchSkill.find({})
  return searchSkills.map(search => search.toJSON())
}

const searchJobsInDb = async () => {
  const searchJobs = await SearchJob.find({})
  return searchJobs.map(search => search.toJSON())
}

const searchCoursesInDb = async () => {
  const searchCourses = await SearchCourse.find({})
  return searchCourses.map(search => search.toJSON())
}

module.exports = {
  initialSearchSkills,
  initialSearchJobs,
  initialSearchCourses,
  searchSkillsInDb,
  searchJobsInDb,
  searchCoursesInDb
}