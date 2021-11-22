import React from "react";
import Register from "./Login/Register";
import { Container } from "react-bootstrap";

export default function Start(props) {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Register />
      </div>
    </Container>
  );
}
