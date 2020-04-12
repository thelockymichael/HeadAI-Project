const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const SearchCourses = require('../models/searchCoursesByKeyWords')

beforeEach(async () => {
  await SearchCourses.deleteMany({})

  await SearchCourses.insertMany(helper.initialSearchCourses)
})

test('SearchCourses are returned as json', async () => {
  await api
    .get('/api/courses-by-keywords/from-react')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all SearchCourses are returned', async () => {
  const response = await api.get('/api/courses-by-keywords/from-react')
  expect(response.body.length).toBe(helper.initialSearchCourses.length)
})

test('a specific SearchCourse is within the returned SearchCourses', async () => {
  const response = await api.get('/api/courses-by-keywords/from-react')
  const contents = response.body.map(search => search.skill)

  expect(contents).toContain('programming, engineer, design')
})

test('a valid SearchCourse can be added', async () => {
  const newSearchCourse =
  {
    skill: 'business, selling',
    lang: 'fi',
    limit: '3'
  }


  await api
    .post('/api/courses-by-keywords/from-react')
    .send(newSearchCourse)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const SearchCoursesAtEnd = await helper.searchCoursesInDb()
  expect(SearchCoursesAtEnd.length).toBe(helper.initialSearchCourses.length + 1)

  const content = SearchCoursesAtEnd.map(course => course.skill)

  expect(content).toContain(
    'business, selling'
  )
})

describe('invalid SearchCourse is not added', () => {

  test('empty object fails with proper status code', async () => {
    const SearchCoursesAtStart = await helper.searchCoursesInDb()

    const newSearchCourse = {}

    const result = await api
      .post('/api/courses-by-keywords/from-react')
      .send(newSearchCourse)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Object is empty.')

    const searchCoursesAtEnd = await helper.searchCoursesInDb()
    expect(searchCoursesAtEnd.length).toBe(SearchCoursesAtStart.length)
  })

  test('empty fields fail with proper status code', async () => {
    const SearchCoursesAtStart = await helper.searchCoursesInDb()

    const newSearchCourse = {
      skill: ''
    }

    const result = await api
      .post('/api/courses-by-keywords/from-react')
      .send(newSearchCourse)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('SearchCourses validation failed')

    const searchCoursesAtEnd = await helper.searchCoursesInDb()
    expect(searchCoursesAtEnd.length).toBe(SearchCoursesAtStart.length)
  })

  test('field validation fails with proper status code', async () => {
    const SearchCoursesAtStart = await helper.searchCoursesInDb()

    const newSearchCourse =
    {
      skill: 'rakennus, automaatio',
      lang: 'en',
      limit: '33'
    }

    const result = await api
      .post('/api/courses-by-keywords/from-react')
      .send(newSearchCourse)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `limit` (33) is more')

    const searchCoursesAtEnd = await helper.searchCoursesInDb()
    expect(searchCoursesAtEnd.length).toBe(SearchCoursesAtStart.length)
  })

  test('no courses were found with specific fields, with proper status code', async () => {
    const SearchCoursesAtStart = await helper.searchCoursesInDb()

    const newSearchCourse =
    {
      skill: 'wp',
      lang: 'gg',
      limit: '3'
    }

    const result = await api
      .post('/api/courses-by-keywords/from-react')
      .send(newSearchCourse)
      .expect(501)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('No courses found.')

    const searchCoursesAtEnd = await helper.searchCoursesInDb()
    expect(searchCoursesAtEnd.length).toBe(SearchCoursesAtStart.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})