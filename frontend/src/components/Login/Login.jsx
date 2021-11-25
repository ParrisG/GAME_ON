import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef,useState } from "react";
import { Form, Button, Card, Alert,Container } from "react-bootstrap";
import axios from "axios";
import './Login.css'

//import { response } from 'express';

export default function Login () {
  //axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error,setError] = useState('');

  function handleSubmit(e){
    e.preventDefault()
    if(emailRef.current.value.trim().length === 0 || passwordRef.current.value.trim().length === 0){
      return setError('Please fill the form')
    }
    return axios.post('/users/login',{
      email: emailRef.current.value,
      password: passwordRef.current.value
    }).then((response) => {
      console.log(response);
      if(response.data.msg){
        console.log(response.data.msg)
        setError(response.data.msg)
        return
      }
      setError(response.data.msg)
      if(response.data.user){
        localStorage.setItem('token', response.data.user);
        navigate('/dashboard');
      }
    });
        
  }


  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 car__class" style={{ maxWidth: "400px" }}>
      <Card className='card-body__class'>
        <Card.Body>
          <div className="car__class">
          <h2 className="text-center mb-4"> Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
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
            <Button  type='submit' className="w-100 mt-3">Log In</Button>
          </Form>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to ="/start">Sign up</Link>
      </div>
      </div>
      </Container>
  );
}