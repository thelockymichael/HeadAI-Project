import React, { useState } from "react";
import skillService from "../services/skills";
import TextToSkillComponent from "../components/TextToSkillsComponent";
import { useField } from "../hooks/index";

const TextToSkills = () => {
  const textInput = useField("text");
  const [skills, setSkills] = useState(null);

  const [message, setMessage] = useState({
    type: "",
    message: ""
  });

  const submitHandler = event => {
    event.preventDefault();
    skillService
      .create(textInput.value)
      .then(response => {
        if (!response.length) {
          return null;
        }
        setMessage({
          type: "success",
          message: `Your skills are${response.map((skill, index) =>
            index === response.length - 1 ? ` and ${skill}` : ` ${skill}`
          )}`
        });
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setSkills(response);
        console.log("message", message);
        console.log(response);
      })
      .catch(error => {
        setMessage({
          type: "danger",
          message: `${error.message}`
        });
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  return (
    <TextToSkillComponent
      message={message}
      submitHandler={submitHandler}
      skills={skills}
      textInput={textInput}
    />
  );
};

export default TextToSkills;

/* import React, { useState } from "react";
import { Table, Form, InputGroup, Button, FormControl } from "react-bootstrap";
import Notification from "../components/Notification";
import skillService from "../services/skills";

const TextToSkills = () => {
  const [text, setText] = useState("");
  const [skills, setSkills] = useState(null);

  const [message, setMessage] = useState({
    type: "",
    message: ""
  });

  const submitHandler = event => {
    event.preventDefault();
    console.log("text", text);
    skillService
      .create(text)
      .then(response => {
        if (!response.length) {
          return null;
        }
        setMessage({
          type: "success",
          message: `Your skills are${response.map((skill, index) =>
            index === response.length - 1 ? ` and ${skill}` : ` ${skill}`
          )}`
        });
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setSkills(response);
        console.log("message", message);
        console.log(response);
      })
      .catch(error => {
        setMessage({
          type: "danger",
          message: `${error.message}`
        });
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  return (
    <>
      {message && <Notification message={message} />}
      <Form onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            onChange={({ target }) => setText(target.value)}
            required
            placeholder="Insert the text from your CV and convert it into words"
            as="textarea"
            aria-label="Search for skills"
          />
          <InputGroup.Append>
            <Button type="submti" variant="outline-secondary">
              Search for skills
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <br />
      {!skills ? (
        <h4>Skills are displayed here</h4>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => {
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
        </Table>
      )}
    </>
  );
};

export default TextToSkills;
 */
