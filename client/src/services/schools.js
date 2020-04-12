import axios from 'axios'
const baseUrl = '/api/courses-by-keywords/from-react'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const request = await axios.post(baseUrl, newObject)

  return request.data
}

export default { getAll, create }
