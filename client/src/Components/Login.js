import React, { useState } from "react";
import Loader from "react-loader-spinner";

function Login(props) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="login">
      <div className="login_inside">
        <h2>Login</h2>
        {props.loading ? (
          <Loader type="Puff" color="#582dd0" height={30} width={30} />
        ) : (
          <></>
        )}
        <input
          className="login_inp"
          type="text"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
          disabled={props.loading}
          placeholder="Username"
        />
        <input
          className="login_inp"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          type="password"
          placeholder="Password "
          disabled={props.loading}
        />
        <div
          className="login_btn"
          onClick={() =>
            props.onclick({ username: username, password: password })
          }
        >
          Login
        </div>
        <p className="mes">{props.mess}</p>
      </div>
    </div>
  );
}

export default Login;
