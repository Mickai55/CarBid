import React from "react";
import "./App.css";
import { LuLogIn } from "react-icons/lu";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from 'components/Home/Home';
import List from 'components/List/List';
import History from 'components/History/History';
import Login from 'components/Login/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-logo">
            CarBid
          </Link>
          <div className="d-flex">
            <Link to="/list" className="menu-item">Bidding</Link>
            <Link to="/history" className="menu-item">History</Link>
            <Link to="/login" className="menu-item">
              Login <LuLogIn />
            </Link>
          </div>
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/list" element={<List/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;