import {Link} from 'react-router-dom'
import React, { useRef,useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

export default function Register () {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error,setError]=useState('')
  function handleSubmit(e){
    e.preventDefault()
    console.log(firstnameRef.current.value.trim().length)
    if(firstnameRef.current.value.trim().length === 0 ||lastnameRef.current.value.trim().length === 0||emailRef.current.value.trim().length === 0 ||passwordRef.current.value.trim().length === 0){
      return setError('Please fill the form');
    } 
    return axios.post('/users/register',{
      first_name: firstnameRef.current.value,
      last_name: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value

    }).then((response) => {
      console.log(response);
    });


        

  }
  return (
    <>
      <Card>
        <Card.Body>
          
          <h2 className="text-center mb-4"> Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="firstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                ref={firstnameRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="lastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                ref={lastnameRef}
                
              ></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                
              ></Form.Control>
            </Form.Group>
            <Button  type='submit' className="w-100 mt-2">Register</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to ="/login">Log in</Link>
      </div>
    </>
  );
}