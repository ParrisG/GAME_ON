
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import './App.css';
import Start from "./components/Start";
import Dashboard from "./components/Dashboard";
import StockDetail from "./components/StockDetail";
import HeaderBar from "./components/HeaderBar";



function App() {
  return (
    <div className="App">
      <HeaderBar />

      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock/:ticker" element={<StockDetail />} />
      </Routes>
      
    </div>
    
  );
}

export default App;
