import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/info">Hackathon</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">AI</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/stats">Statistics</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default Navigation;
