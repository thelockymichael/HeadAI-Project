import React, { useState } from 'react'
import schoolservice from '../services/schools'
import SchoolsByKeyWordsComponent from '../components/SchoolsByKeyWordsComponent'
import { useField } from '../hooks/index'

const SchoolsByKeyWords = () => {
  const skill = useField('text')
  const lang = useField('text')
  const limit = useField('number')
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState({
    type: '',
    message: '',
  })

  const submitHandler = (event) => {
    event.preventDefault()

    setLoading(true)

    console.log('newobject', {
      skill,
      lang,
      limit,
    })
    schoolservice
      .create({
        skill: skill.value,
        lang: lang.value,
        limit: limit.value,
      })
      .then((response) => {
        setLoading(false)
        console.log('RESE', response)
        setMessage({
          type: 'success',
          message: `Found schools with following skills: ${skill}`,
        })
        setTimeout(() => {
          setMessage('')
        }, 5000)
        console.log('setschools', response)
        setSchools(response)
        console.log('message', message)
        console.log(response)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.response.data.error)
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
    <SchoolsByKeyWordsComponent
      skill={skill}
      lang={lang}
      limit={limit}
      message={message}
      submitHandler={submitHandler}
      schools={schools}
      loading={loading}
    />
  )
}

export default SchoolsByKeyWords