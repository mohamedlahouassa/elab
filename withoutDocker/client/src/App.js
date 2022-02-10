import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Avatar from "react-avatar";
import logo from "./images/logo.svg";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import Resultat from "./Components/Resultat";
import Info from "./Components/Info";
function App() {
  const [user, setuser] = useState({});
  const [mess, setmess] = useState();
  const [authstate, setauthstate] = useState(false);
  const [labname, setlabname] = useState("");
  const [loading, setloading] = useState(false);
  const login = (user) => {
    setloading(true);
    axios
      .post("http://localhost:3001/login", {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        if (res.data.auth) {
          setmess("");
          localStorage.setItem("token", res.data.token);
          setuser(res.data.user);
          localStorage.setItem("user", res.data.user);
          setauthstate(true);
          setloading(false);
        } else {
          setmess(res.data.message);
          setloading(false);
        }
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/isAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.auth) {
          setmess("");
          setuser(res.data.user);
          axios
            .post(
              "http://localhost:3001/getLab",
              { id: res.data.user.lab_id },
              { headers: { "x-access-token": localStorage.getItem("token") } }
            )
            .then((rese) => {
              setlabname(rese.data.username);
            });
          localStorage.setItem("user", res.data.user);
          setauthstate(true);
        }
      });
  }, [localStorage.getItem("token")]);
  const logout = () => {
    setuser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setauthstate(false);
  };
  return (
    <div>
      {authstate ? (
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
                  name={user.nom + " " + user.prenom}
                  size="40"
                  round={true}
                />
                <div className="prf_name">
                  {" "}
                  <p>
                    {user.nom} {user.prenom}
                  </p>
                  <p>id: {user.username}</p>
                </div>
                <AiOutlineLogout onClick={logout} className="Logout" />
              </div>
            </nav>
            <div className="entered">
              <div className="entered_inside">
                <div className="list_att">
                  <Info lab={labname} user={user} />
                </div>
                <div className="list_info">
                  <h2>Resultat des Analyses </h2>
                  <Resultat id={user.lab_id} client={user.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Router>
          <div className="app">
            <div className="inside">
              <nav className="nav">
                <div className="Logo">
                  <img src={logo} className="logo" alt="Elab Logo" />
                </div>
                <ul>
                  <li>
                    <Link to="/Desc">Home</Link>
                  </li>
                  <li>
                    <Link to="/">Login</Link>
                  </li>
                </ul>
              </nav>
              <div className="elements">
                <Switch>
                  <Route path="/Desc">
                    <Home />
                  </Route>
                  <Route path="/">
                    <Login onclick={login} loading={loading} mess={mess} />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
