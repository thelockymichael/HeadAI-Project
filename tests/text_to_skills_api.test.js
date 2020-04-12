const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const SearchSkill = require('../models/searchSkill')

beforeEach(async () => {
  await SearchSkill.deleteMany({})

  await SearchSkill.insertMany(helper.initialSearchSkills)
})

test('searchSkills are returned as json', async () => {
  await api
    .get('/api/text-to-skills/from-react')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all searchSkills are returned', async () => {
  const response = await api.get('/api/text-to-skills/from-react')
  expect(response.body.length).toBe(helper.initialSearchSkills.length)
})

test('a specific booking is within the returned searchSkills', async () => {
  const response = await api.get('/api/text-to-skills/from-react')
  const contents = response.body.map(search => search.skills)
  const merge = contents.flat(1) // IMPORANT: flat() method Introduced in ES2019

  expect(merge).toContain('programming')
})

test('a valid searchSkill can be added', async () => {
  const newSearchSkill = {
    text: 'I am a professionally qualified fire engineer with 7 years experience.'
  }

  await api
    .post('/api/text-to-skills/from-react')
    .send(newSearchSkill)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const searchSkillsAtEnd = await helper.searchSkillsInDb()
  expect(searchSkillsAtEnd.length).toBe(helper.initialSearchSkills.length + 1)

  const content = searchSkillsAtEnd.map(b => b.skills).flat(1)

  expect(content).toContain(
    'qualified'
  )
})

describe('invalid searchSkill is not added', () => {

  test('empty objects fails with proper status code', async () => {
    const searchSkillsAtStart = await helper.searchSkillsInDb()

    const newSearchSkill = {}

    const result = await api
      .post('/api/text-to-skills/from-react')
      .send(newSearchSkill)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Object is empty.')

    const searchSkillsAtEnd = await helper.searchSkillsInDb()
    expect(searchSkillsAtEnd.length).toBe(searchSkillsAtStart.length)
  })

  test('empty text string fails with proper status code', async () => {
    const searchSkillsAtStart = await helper.searchSkillsInDb()

    const newSearchSkill = {
      text: ''
    }

    const result = await api
      .post('/api/text-to-skills/from-react')
      .send(newSearchSkill)
      .expect(501)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('No skills found.')

    const searchSkillsAtEnd = await helper.searchSkillsInDb()
    expect(searchSkillsAtEnd.length).toBe(searchSkillsAtStart.length)
  })

  test('gibberish text string fails with proper status code', async () => {
    const searchSkillsAtStart = await helper.searchSkillsInDb()

    const newSearchSkill = {
      text: 'fsajfoisja blah blah...'
    }

    const result = await api
      .post('/api/text-to-skills/from-react')
      .send(newSearchSkill)
      .expect(501)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('No skills found.')

    const searchSkillsAtEnd = await helper.searchSkillsInDb()
    expect(searchSkillsAtEnd.length).toBe(searchSkillsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})