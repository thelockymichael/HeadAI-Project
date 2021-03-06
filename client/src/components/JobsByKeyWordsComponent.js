import React from 'react'
import {
  Spinner,
  ListGroup,
  Form,
  Button,
} from 'react-bootstrap'
import Notification from './Notification'

const JobsByKeyWordsComponent = (props) => {
  console.log('JobsByKeyWords Components Jobs', props.jobs)
  return (
    <>
      {props.message && <Notification message={props.message} />}
      <h1>Search jobs with keywords</h1>
      <Form onSubmit={props.submitHandler}>
        <Form.Group>
          <Form.Label>Skill words:</Form.Label>
          <Form.Control
            required
            name="words"
            placeholder="e.g. software, company, java, director"
            {...props.words}
          />
          <Form.Label>Area:</Form.Label>
          <Form.Control
            required
            name="area"
            placeholder="e.g. Helsinki"
            {...props.area}
          />
          <Form.Label>Time range start:</Form.Label>
          <Form.Control
            required
            name="area"
            placeholder="e.g. 2018-11"
            {...props.time_range_start}
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
          {props.jobs ? (
            <ListGroup>
              {props.jobs.map((job) => {
                return (
                  <>
                    <ListGroup.Item
                      as="a"
                      style={{ cursor: 'pointer' }}
                      action
                      hover
                      href={job.url}
                    >
                      <span style={{ fontSize: '24px' }}>{job.id}</span>
                      <span>
                        {job.skills_that_match
                          ? `(skills that match: ${job.skills_that_match})`
                          : null}
                      </span>
                      <p>{job.time}</p>
                    </ListGroup.Item>
                  </>
                )
              })}
            </ListGroup>
          ) : (
            <h4>Job opportunities are displayed here</h4>
          )}
        </>
      )}
    </>
  )
}

export default JobsByKeyWordsComponent
