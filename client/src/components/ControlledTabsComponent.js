import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import TextToSkills from '../containers/TextToSkills'
import JobsByKeyWords from '../containers/JobsByKeyWords'
import SchoolsByKeyWords from '../containers/SchoolsByKeyWords'

const ControlledTabsComponent = props => {
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={props.keyInput.key}
      onSelect={props.keyInput.onSelect}
    >
      <Tab eventKey="skills" title="Words to skills">
        <TextToSkills />
      </Tab>
      <Tab eventKey="jobs" title="Jobs by keywords">
        <JobsByKeyWords />
      </Tab>
      <Tab eventKey="schools" title="Schools by keywords">
        <SchoolsByKeyWords />
      </Tab>
    </Tabs>
  )
}

export default ControlledTabsComponent
