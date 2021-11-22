
import React, { useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";

export default function Register () {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  function handleSubmit(e){
    e.preventDefault()
    console.log(firstnameRef.current.value)
    console.log(lastnameRef.current.value)
    console.log(emailRef.current.value)
    console.log(passwordRef.current.value)
    console.log('hit')
  }
  return (
    <>
      <Card>git 
        <Card.Body>
          <h2 className="text-center mb-4"> Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="firstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                ref={firstnameRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="lastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                ref={lastnameRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button  type='submit' className="w-100 mt-2">Register</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log in
      </div>
    </>
  );
}