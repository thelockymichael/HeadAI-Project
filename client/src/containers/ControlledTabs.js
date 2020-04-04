import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useKey } from "../hooks/index";
import ControlledTabsComponent from "../components/ControlledTabsComponent";

const ControlledTabs = () => {
  const keyInput = useKey("home");

  return <ControlledTabsComponent keyInput={keyInput} />;
};

export default ControlledTabs;
