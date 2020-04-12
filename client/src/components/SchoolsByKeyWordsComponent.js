import React from 'react'
import {
  Spinner,
  ListGroup,
  Form,
  Button,
} from 'react-bootstrap'
import Notification from './Notification'

const SchoolsByKeyWordsComponent = (props) => {
  console.log('schoolsByKeyWords Components schools', props.schools)
  return (
    <>
      {props.message && <Notification message={props.message} />}
      <h1>Search schools with keywords</h1>
      <Form onSubmit={props.submitHandler}>
        <Form.Group>
          <Form.Label>Skills:</Form.Label>
          <Form.Control
            required
            name="words"
            placeholder="e.g. ohjelmointi"
            {...props.skill}
          />
          <Form.Label>Language:</Form.Label>
          <Form.Control
            required
            name="area"
            placeholder="e.g. fi"
            {...props.lang}
          />
          <Form.Label>Course limit:</Form.Label>
          <Form.Control
            required
            name="area"
            placeholder="e.g. 10"
            {...props.limit}
          />
          <br />
          <Button variant="primary" type="submit">
            Search for skills
          </Button>
        </Form.Group>
      </Form>
      <br />
      {props.loading ? (
        <div className="d-flex justify-content-center">
          <Spinner center animation="border" />
        </div>
      ) : (
        <>
          {props.schools ? (
            <ListGroup>
              {props.schools.map((school) => {
                return (
                  <>
                    <ListGroup.Item
                      as="a"
                      style={{ cursor: 'pointer' }}
                      action
                      hover
                      href={school.url}
                    >
                      <span style={{ fontSize: '24px' }}>{school.author}</span>
                      <span>
                        {school.skills_that_match
                          ? ` (${school.title}) `
                          : null}
                      </span>
                      <p>{school.description}</p>
                    </ListGroup.Item>
                  </>
                )
              })}
            </ListGroup>
          ) : (
            <h4>School opportunities are displayed here</h4>
          )}
        </>
      )}
    </>
  )
}

export default SchoolsByKeyWordsComponent
