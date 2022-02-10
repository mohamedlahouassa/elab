import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import List from "./List";
import Create from "./Create";
import Resultat from "./Resultat";
import Addfile from "./Addfile";
import ClientInfo from "./ClientInfo";
import { useState } from "react";
function Lab(props) {
  const [user, setuser] = useState(props.user);
  const [selectedClient, setselectedClient] = useState();
  const selecte = (a) => {
    setselectedClient(a);
  };
  const logout = () => {
    localStorage.removeItem("tkn");
    localStorage.removeItem("user");
    props.update();
  };
  return (
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
                  <Create name={user.name} />
                </Route>
                <Route path="/List">
                  <List onSelect={selecte} logout={logout} />
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
  );
}

export default Lab;
