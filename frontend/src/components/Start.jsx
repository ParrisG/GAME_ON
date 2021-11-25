import React from "react";
import Register from "./Login/Register";
import Login from './Login/Login'
import { Container } from "react-bootstrap";
import './Start.css'

export default function Start(props) {
  return (
    <div className='back__image'>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Login />
      </div>
    </Container> 
    </div>
  );
 
}
