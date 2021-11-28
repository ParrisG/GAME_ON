import{Button,Navbar,Container} from 'react-bootstrap'
import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function HeaderBar(props) {
  const[islogin,setLogin]=useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);
      //setLogin(true)
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    //setLogin(false)
    navigate("/login");
  }
  return (
    <>
    <Navbar bg="dark" variant="dark" style={{ height:"5rem"}}>
      <Container>
        <Navbar.Brand href="/dashboard">
          <img
            alt=""
            src='https://dbdzm869oupei.cloudfront.net/img/vinylrugs/preview/32155.png'
            width="65rem"
            height="65rem"
            className="d-inline-block align-top"
          />{' '}
          <span style={{fontSize:"3rem"}}>Game On!</span>
        </Navbar.Brand>
        <Button onClick={logout}>logout</Button>
      </Container>
    </Navbar>
  </>
  )
}