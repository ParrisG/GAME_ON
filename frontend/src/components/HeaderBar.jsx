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
      setLogin(true)
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setLogin(false)
    navigate("/login");
  }
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/dashbaord">
          <img
            alt=""
            src='https://dbdzm869oupei.cloudfront.net/img/vinylrugs/preview/32155.png'
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{' '}
        Game On
        </Navbar.Brand>
        <Button></Button>
      </Container>
    </Navbar>
  </>
  )
}