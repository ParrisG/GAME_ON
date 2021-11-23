import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import FilterBox from "./FilterBox";
import StockList from "./StockList";
import axios from "axios";
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';

export default function Dashboard(props) {
  
  const navigate = useNavigate();

  useEffect(() => {
		const token = localStorage.getItem('token');
    
    if(token){
      const user = jwt.decode(token);
      console.log('This is Success', user);
    } else {
      console.log('Line NUmber 34');
      localStorage.removeItem('token');
      alert('You have to Login To view this page');
      navigate('/login');
    }
	}, [])


  function logout() {
    localStorage.removeItem('token');
    navigate('/login');    
  }

  return (
    <div>
      <h1>
        <Button  onClick={logout} >LogOut</Button>
      </h1>
      <h1>I am Dashboard</h1>
      <div>
        <h2>Here is FilterBox:</h2>
        <FilterBox />
      </div>
      
      <div>
        <h2>Here is StockList:</h2>
        <StockList />
      </div>
    </div>
  )
}