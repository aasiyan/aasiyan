import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Loading/Loading";
import "./Authentication.css";
function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const defaultUsername = "";
  const defaultPassword = "";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      setLoading(false);
      setData();
    }, 1500); // simulate a 2-second loading time
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === defaultUsername && password === defaultPassword) {
      navigate("/certificateGenerator");
    } else {
      alert("Incorrect username or password");
    }
  };

  // alert("only admin can access the certificate page!!");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="auth-container">
        <div className="App">
          {loading ? <LoadingSpinner loading={loading} /> : <div>{data}</div>}
        </div>
        <h1 className="auth-note">
          Only admin can able to access the certificate
        </h1>
        <form onSubmit={handleLogin}>
          <div className="auth-card">
            <h2 className="auth-head">Login</h2>

            <div>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="password-container">
              <label>
                Password:
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={togglePasswordVisibility}
                />
              </label>
              
            </div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Authentication;
