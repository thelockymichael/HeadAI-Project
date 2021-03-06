import React from 'react'
import {
  Spinner,
  Table,
  Form,
  InputGroup,
  Button,
  FormControl,
} from 'react-bootstrap'
import Notification from '../components/Notification'

const TextToSkillComponent = (props) => {
  return (
    <>
      {props.message && <Notification message={props.message} />}
      <br />
      <h1>Words to skills</h1>
      <Form onSubmit={props.submitHandler}>
        <InputGroup>
          <FormControl
            {...props.textInput}
            required
            placeholder="Insert the text from your CV and convert it into words"
            as="textarea"
            aria-label="Search for skills"
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-secondary">
              Search for skills
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <br />
      <FormControl
        disabled={props.skills ? false : true}
        style={{ resize: 'none' }}
        value={props.skills ? props.skills.map((skill) => ` ${skill}`) : null}
        required
        placeholder="Skill word(s) will appear here."
        as="textarea"
        aria-label="Search for skills"
      />
      <br />
      {props.loading ? (
        <div className="d-flex justify-content-center">
          <Spinner center animation="border" />
        </div>
      ) : (
        <>
          {props.skills ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {props.skills.map((skill, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index}</td>
                        <td>{skill}</td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </Table>
          ) : (
            <h1>Your skills are displayed here</h1>
          )}
        </>
      )}
    </>
  )
}

export default TextToSkillComponent