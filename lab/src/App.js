import "./App.css";
import logo from "./images/logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./components/authent/Login";
import Lab from "./components/Lab";
import Logout from "./components/authent/Logout";
import Avatar from "react-avatar";

function App() {
  const [user, setuser] = useState({});
  const [authstate, setauthstate] = useState(false);
  const [reload, setreload] = useState(false);
  useEffect(async () => {
    axios
      .get("/lab/isAuth", {
        headers: { "x-access-token": localStorage.getItem("tkn") },
      })
      .then((res) => {
        console.log(res);
        if (res.data.auth) {
          setuser(res.data.user);
          localStorage.setItem("user", res.data.user);
          setauthstate(true);
        } else {
          setauthstate(false);
        }
      });
  }, [reload]);

  return (
    <div className="app">
      <div className="inside">
        <nav className="nav">
          <div className="Logo">
            <img src={logo} className="logo" alt="Elab Logo" />
          </div>
          {authstate ? (
            <div className="prf">
              <Avatar
                className="prf_avatar"
                color="#582dd0"
                name={user.name}
                size="40"
                round={true}
              />
              <div className="prf_name">
                <p>{user.name}</p>
                <p>id: {user.username}</p>
              </div>
              <Logout
                update={() => {
                  setreload(!reload);
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </nav>

        {authstate ? (
          <Lab user={user} update={() => setreload(!reload)} />
        ) : (
          <Login update={() => setreload(!reload)} />
        )}
      </div>
    </div>
  );
}

export default App;
