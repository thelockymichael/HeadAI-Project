import React, { useState } from 'react'
import jobService from '../services/jobs'
import JobsByKeyWordsComponent from '../components/JobsByKeyWordsComponent'
import { useField } from '../hooks/index'

const JobsByKeyWords = () => {
  const words = useField('text')
  const area = useField('text')
  const time_range_start = useField('text')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState({
    type: '',
    message: '',
  })

  const submitHandler = (event) => {
    event.preventDefault()

    setLoading(true)

    jobService
      .create({
        words: words.value,
        area: area.value,
        time_range_start: time_range_start.value,
      })
      .then((response) => {
        if (!response.length) {
          return null
        }
        setMessage({
          type: 'success',
          message: `Found job positions with the following skills ${response.skills_that_match}`,
        })
        setTimeout(() => {
          setMessage('')
        }, 5000)
        setLoading(false)
        console.log('setJobs', response)
        setJobs(response)
        console.log('message', message)
        console.log(response)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.response.data.error)
        console.log('toinen', error.response)

        setMessage({
          type: 'danger',
          message: `${error.response.data.error}`,
        })
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
  }

  return (
    <JobsByKeyWordsComponent
      words={words}
      area={area}
      time_range_start={time_range_start}
      message={message}
      submitHandler={submitHandler}
      jobs={jobs}
      loading={loading}
    />
  )
}

export default JobsByKeyWords