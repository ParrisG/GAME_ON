import React, { useEffect, useState } from "react";
import FilterBox from "./FilterBox";
import StockList from "./StockList";
import axios from "axios";
import Button from "@restart/ui/esm/Button";

export default function Dashboard(props) {
  axios.defaults.withCredentials = true;
  const [loginStatus, setLoginStatus] = useState('');

  useEffect(() => {
    axios.get('/users/authenticate').then((response) => {
      console.log('line 13',response.data);
    
      if(response.data.loggedIn === true){
        //console.log('line num 16:',response.data.loggedIn);
        setLoginStatus(response.data.user[0].email);
      }
    });
  }, []);

  function logout() {
    localStorage.clear();
    // Remove saved data from sessionStorage
    sessionStorage.removeItem('userId');
    return axios.post('/users/logout',{
      //email: emailRef.current.value,
      //password: passwordRef.current.value
    }).then((response) => {
      console.log(response);
      window.location.href = '/login';
      //navigate('/dashboard');
      //history.push('/dashboard');
    });

    window.location.href = '/login';
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