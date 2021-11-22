import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function HeaderBar(props) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand style={{fontSize: 30}}>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            width="45"
            height="45"
            className="d-inline-block align-top"
          />{' '}
        GAME ON!
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}