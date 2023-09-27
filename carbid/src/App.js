import React, { useEffect, useState } from "react";
import "./App.css";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "components/Home/Home";
import List from "components/List/List";
import History from "components/History/History";
import Login from "components/Login/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Details from "components/Details/Details";
import Register from "components/Register/Register";
import { apiLogout } from "ServiceUsers";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.user) {
      setIsLoggedIn(true);
    }
  });
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-logo">
            CarBid
          </Link>
          <div className="d-flex">
            <Link to="/list" className="menu-item">
              Bidding
            </Link>
            <Link to="/history" className="menu-item">
              History
            </Link>
            {!isLoggedIn ? (
              <Link to="/login" className="menu-item">
                <span>
                  Login <LuLogIn />
                </span>
              </Link>
            ) : (
              <span className="px-2">
                Hello, <span className="fw-bold">{localStorage.user}</span>
              </span>
            )}
            {isLoggedIn && (
              <span
                className="menu-item"
                onClick={() => apiLogout().then(() => setIsLoggedIn(false))}
              >
                Logout <LuLogOut />
              </span>
            )}
          </div>
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/history" element={<History />} />
            <Route
              path="/login"
              element={
                <Login
                  // @ts-ignore
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  // @ts-ignore
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
        <div className="App-footer">
          <div className="pt-3">
            <span className="mx-3">Regulations</span>
            <span className="mx-3">Terms and Conditions</span>
            {false && (
              <span className="mx-3">
                Logout <LogoutIcon style={{ height: 16 }} />
              </span>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
