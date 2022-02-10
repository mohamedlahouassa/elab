import React from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [mess, setmess] = useState("");
  const [loadin, setloadin] = useState(false);

  const log = () => {
    setloadin(true);
    console.log("hello");
    axios
      .post("http://localhost:3001/log", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.auth) {
          setmess("");

          localStorage.setItem("tkn", res.data.token);
          //setuser(res.data.user);
          setusername("");
          setpassword("");

          localStorage.setItem("user", res.data.user);

          setloadin(false);
        } else {
          setmess(res.data.message);
          setloadin(false);
        }
      });
  };
  return (
    <div className="login">
      <div className="login_inside">
        <h2>Login</h2>
        {loadin ? (
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
          disabled={loadin ? true : false}
          placeholder="Username"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              log();
            }
          }}
        />
        <input
          className="login_inp"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          disabled={loadin ? true : false}
          type="password"
          placeholder="Password "
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              log();
            }
          }}
        />
        <div className="login_btn" onClick={log}>
          Login
        </div>
        <p>{mess}</p>
      </div>
    </div>
  );
}

export default Login;
