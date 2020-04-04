import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import TextToSkills from "../containers/TextToSkills";
import JobsByKeyWords from "../containers/JobsByKeyWords";

const ControlledTabsComponent = props => {
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={props.keyInput.key}
      onSelect={props.keyInput.onSelect}
    >
      <Tab eventKey="home" title="Words to skills">
        <TextToSkills />
      </Tab>
      <Tab eventKey="profile" title="Jobs by keywords">
        <JobsByKeyWords />
      </Tab>
      <Tab eventKey="contact" title="Training by keywords">
        <h1>Training by keywords</h1>
      </Tab>
    </Tabs>
  );
};

export default ControlledTabsComponent;
