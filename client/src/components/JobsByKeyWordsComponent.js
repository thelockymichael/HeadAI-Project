import React from "react";
import {
  ListGroup,
  Table,
  Form,
  InputGroup,
  Button,
  FormControl
} from "react-bootstrap";
import Notification from "./Notification";

const JobsByKeyWordsComponent = props => {
  console.log("JobsByKeyWords Components Jobs", props.jobs);
  return (
    <>
      {props.message && <Notification message={props.message} />}
      <h1>Search jobs with keywords</h1>
      <Form onSubmit={props.submitHandler}>
        <Form.Group>
          <Form.Control
            name="words"
            placeholder="e.g. software, company, java, director"
            {...props.words}
          />
          <Form.Label>area:</Form.Label>
          <Form.Control
            name="area"
            placeholder="e.g. Helsinki"
            {...props.area}
          />
          <Form.Label>time range:</Form.Label>
          <Form.Control
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
      {props.jobs.length === 0 ? (
        <h4>Job opportunities are displayed here</h4>
      ) : (
        <ListGroup>
          {props.jobs.map(job => {
            return (
              <>
                <ListGroup.Item
                  as="a"
                  style={{ cursor: "pointer" }}
                  action
                  hover
                  href={job.url}
                >
                  <span style={{ fontSize: "24px" }}>{job.id}</span>
                  <span>
                    {job.skills_that_match
                      ? `(skills that match: ${job.skills_that_match})`
                      : null}
                  </span>
                  <p>{job.time}</p>
                </ListGroup.Item>
              </>
            );
          })}
        </ListGroup>
        /*         <Table striped bordered hover>
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
              );
            })}
          </tbody>
        </Table> */
      )}
    </>
  );
};

export default JobsByKeyWordsComponent;
