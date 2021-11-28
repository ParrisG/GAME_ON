import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBox from "./FilterBox";
import StockList from "./StockList";
import SymbolSearch from "./SymbolSearch";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./Dashboard.module.css";

export default function Dashboard(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);
      //console.log("This is Success", user);
    } else {
      //console.log("Line NUmber 34");
      localStorage.removeItem("token");
      alert("You have to Login To view this page");
      navigate("/login");
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Container>
      <Row>
        <Col>
          <SymbolSearch />
          <FilterBox />
        </Col>
        <Col>
          <StockList /> 
        </Col>
      </Row> 
    </Container>
  );
}
