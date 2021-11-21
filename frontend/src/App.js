
import { Routes, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import './App.css';
import Start from "./components/Start";
import Dashboard from "./components/Dashboard";
import StockDetail from "./components/StockDetail";



function App() {
  return (
    <div className="App">
      <h1>Welcome to GAME ON!</h1>
      <Button variant="success" size="lg">
      Large button
      </Button>

      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock/:ticker" element={<StockDetail />} />
      </Routes>
      
    </div>
    
  );
}

export default App;
