import React ,{useEffect} from "react";
import {useNavigate } from 'react-router-dom';
import jwt from "jsonwebtoken";


import StockInformation from "./StockInformation";
import StockChart from "./StockChart";
import StockNewsList from "./StockNewsList";

export default function StockDetail(props) {
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
    <div>
      <div>
        <StockInformation />
      </div>
      <div>
        <StockChart />
      </div>
      <div>
        <StockNewsList />
      </div>
    </div>
  )
}