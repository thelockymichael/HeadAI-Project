const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const SearchJobs = require('../models/searchJobsByKeyWords')

beforeEach(async () => {
  await SearchJobs.deleteMany({})

  await SearchJobs.insertMany(helper.initialSearchJobs)
})

test('searchJobs are returned as json', async () => {
  await api
    .get('/api/jobs-by-keywords/from-react')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all searchJobs are returned', async () => {
  const response = await api.get('/api/jobs-by-keywords/from-react')
  expect(response.body.length).toBe(helper.initialSearchJobs.length)
})

test('a specific searchJob is within the returned searchJobs', async () => {
  const response = await api.get('/api/jobs-by-keywords/from-react')
  const contents = response.body.map(search => search.words)

  expect(contents).toContain('qualified, engineer, experience')
})

test('a valid searchJob can be added', async () => {
  const newSearchJob =
    {
      words: 'fire, engineer',
      area: 'Mikkeli',
      time_range_start: '2020-02'
    }


  await api
    .post('/api/jobs-by-keywords/from-react')
    .send(newSearchJob)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const searchJobsAtEnd = await helper.searchJobsInDb()
  expect(searchJobsAtEnd.length).toBe(helper.initialSearchJobs.length + 1)

  const content = searchJobsAtEnd.map(job => job.words)

  expect(content).toContain(
    'fire, engineer'
  )
})

describe('invalid searchJob is not added', () => {

  test('empty objects fails with proper status code', async () => {
    const searchJobsAtStart = await helper.searchJobsInDb()

    const newSearchJob = {}

    const result = await api
      .post('/api/jobs-by-keywords/from-react')
      .send(newSearchJob)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Object is empty.')

    const searchJobsAtEnd = await helper.searchJobsInDb()
    expect(searchJobsAtEnd.length).toBe(searchJobsAtStart.length)
  })

  test('empty words field fails with proper status code', async () => {
    const searchJobsAtStart = await helper.searchJobsInDb()

    const newSearchJob = {
      words: ''
    }

    const result = await api
      .post('/api/jobs-by-keywords/from-react')
      .send(newSearchJob)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('SearchJobs validation failed')

    const searchJobsAtEnd = await helper.searchJobsInDb()
    expect(searchJobsAtEnd.length).toBe(searchJobsAtStart.length)
  })

  test('field validation fails fails with proper status code', async () => {
    const searchJobsAtStart = await helper.searchJobsInDb()

    const newsearchJob =
    {
      words: 'programming, engineer, design',
      area: 'T',
      time_range_start: '2020-06'
    }

    const result = await api
      .post('/api/jobs-by-keywords/from-react')
      .send(newsearchJob)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `area` (`T`) is shorter')

    const searchJobsAtEnd = await helper.searchJobsInDb()
    expect(searchJobsAtEnd.length).toBe(searchJobsAtStart.length)
  })

  test('no jobs were found with specific fields, with proper status code', async () => {
    const searchJobsAtStart = await helper.searchJobsInDb()

    const newsearchJob =
    {
      words: 'programming, engineer, design',
      area: 'Tampere',
      time_range_start: '2021-01'
    }

    const result = await api
      .post('/api/jobs-by-keywords/from-react')
      .send(newsearchJob)
      .expect(501)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('No jobs found.')

    const searchJobsAtEnd = await helper.searchJobsInDb()
    expect(searchJobsAtEnd.length).toBe(searchJobsAtStart.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})