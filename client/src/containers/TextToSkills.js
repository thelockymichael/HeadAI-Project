import React, { useState } from 'react'
import skillService from '../services/skills'
import TextToSkillComponent from '../components/TextToSkillsComponent'
import { useField } from '../hooks/index'

const TextToSkills = () => {
  const textInput = useField('text')
  const [skills, setSkills] = useState(null)
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState({
    type: '',
    message: '',
  })

  const submitHandler = (event) => {
    event.preventDefault()

    setLoading(true)
    skillService
      .create(textInput.value)
      .then((response) => {
        if (!response.length) {
          return null
        }
        setMessage({
          type: 'success',
          message: `Your skills are${response.map((skill, index) =>
            index === response.length - 1 ? ` and ${skill}` : ` ${skill}`
          )}`,
        })
        setTimeout(() => {
          setMessage('')
        }, 5000)
        setSkills(response)
        setLoading(false)
        console.log('message', message)
        console.log(response)
      })
      .catch((error) => {
        setLoading(false)

        console.log(error.response.data)
        if (error.response.data.error)
          setMessage({
            type: 'danger',
            message: `${error.response.data.error}`,
          })
        else
          setMessage({
            type: 'danger',
            message: 'Cannot connect to server.',
          })
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
  }

  return (
    <TextToSkillComponent
      message={message}
      submitHandler={submitHandler}
      skills={skills}
      textInput={textInput}
      loading={loading}
    />
  )
}

export default TextToSkills