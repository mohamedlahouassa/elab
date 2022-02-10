import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import logo from "./images/logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "react-avatar";
import { AiOutlineLogout } from "react-icons/ai";
import List from "./components/List";
import Create from "./components/Create";
import Resultat from "./components/Resultat";
import Addfile from "./components/Addfile";
import ClientInfo from "./components/ClientInfo";
import Loader from "react-loader-spinner";

function App() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [mess, setmess] = useState("");
  const [user, setuser] = useState({});
  const [authstate, setauthstate] = useState(false);
  const [selectedClient, setselectedClient] = useState();
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
          setuser(res.data.user);
          setusername("");
          setpassword("");

          localStorage.setItem("user", res.data.user);
          setauthstate(true);
          setloadin(false);
        } else {
          setmess(res.data.message);
          setloadin(false);
        }
      });
  };
  const selecte = (a) => {
    setselectedClient(a);
  };
  useEffect(async () => {
    axios
      .get("http://localhost:3001/LabisAuth", {
        headers: { "x-access-token": localStorage.getItem("tkn") },
      })
      .then((res) => {
        if (res.data.auth) {
          setmess("");
          setuser(res.data.user);
          localStorage.setItem("user", res.data.user);
          setauthstate(true);
        } else {
        }
      });
  }, [localStorage.getItem("tkn")]);
  const logout = () => {
    setuser({});
    localStorage.removeItem("tkn");
    localStorage.removeItem("user");
    setauthstate(false);
  };

  const avreg = () => {
    return (
      <div className="app">
        <div className="inside">
          <nav className="nav">
            <div className="Logo">
              <img src={logo} className="logo" alt="Elab Logo" />
            </div>
            <div className="prf"></div>
          </nav>
          <div className="elements">
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
          </div>
        </div>
      </div>
    );
  };

  const handleUpload = (e) => {
    const dataForm = new FormData();

    dataForm.append("labId", user.id);
    dataForm.append("clientId", 1);
    dataForm.append("file", e.target.files[0]);
    axios
      .post("http://localhost:3001/upload/single", dataForm)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const apreg = () => {
    return (
      <div className="app">
        <div className="inside">
          <nav className="nav">
            <div className="Logo">
              <img src={logo} className="logo" alt="Elab Logo" />
            </div>
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
              <AiOutlineLogout className="Logout" onClick={logout} />
            </div>
          </nav>
          <div className="entered">
            <div className="entered_inside">
              <div className="list_att">
                <Router>
                  <nav className="clients_nav">
                    <NavLink
                      to="/List"
                      className="clients_nav_list"
                      activeClassName="actived"
                    >
                      List
                    </NavLink>

                    <NavLink
                      to="/Create"
                      className="clients_nav_list"
                      activeClassName="actived"
                    >
                      Create
                    </NavLink>
                  </nav>
                  <div className="list_midd">
                    <Switch>
                      <Route path="/Create">
                        <Create id={user.id} name={user.name} />
                      </Route>
                      <Route path="/List">
                        <List id={user.id} onSelect={selecte} logout={logout} />
                      </Route>
                      <Route path="/">
                        <Redirect to="/List" />
                      </Route>
                    </Switch>
                  </div>
                </Router>
              </div>
              <div
                className="list_info"
                style={
                  selectedClient
                    ? { transform: "scaleX(1)" }
                    : { transform: "scaleX(0)" }
                }
              >
                <ClientInfo client={selectedClient} name={user.name} />
                <h2>Resultat des Analyses </h2>
                <Addfile
                  id={user.id}
                  client={selectedClient}
                  refr={() => {
                    console.log("hel");
                    var sel = selectedClient;
                    setselectedClient(0);
                    setselectedClient(sel);
                  }}
                />
                <Resultat
                  id={user.id}
                  client={selectedClient}
                  refr={() => {
                    console.log("hel");
                    var sel = selectedClient;
                    setselectedClient(0);
                    setselectedClient(sel);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const fasel = () => {
    if (authstate) {
      return apreg();
    } else {
      return avreg();
    }
  };

  return <div>{fasel()}</div>;
}

export default App;
