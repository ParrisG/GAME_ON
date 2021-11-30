import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FilterBox from "./FilterBox";
import StockList from "./StockList";
import SymbolSearch from "./SymbolSearch";
import jwt from "jsonwebtoken";
import {Container, Row, Col } from "react-bootstrap";
import "./Dashboard.module.css";

export default function Dashboard(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);
    } else {
      localStorage.removeItem("token");
      alert("You have to Login To view this page");
      navigate("/start");
    }
  }, []);


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
