import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = props => {
  return (
    <>
      <Alert variant={props.message.type}>{props.message.message}</Alert>
    </>
  )
}

export default Notification
