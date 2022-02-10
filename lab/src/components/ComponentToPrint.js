import React, { useRef, useState } from "react";
import logo from "../images/logo.png";

export class ComponentToPrint extends React.PureComponent {
  format = () => {
    let date = new Date();
    return (
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      (date.getFullYear() - 2000)
    );
  };
  formatT = () => {
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes();
  };
  render() {
    return (
      <div className="cmppr">
        <div className="daw">
          <div>
            <p>
              {this.props.user.nom} {this.props.user.prenom}
            </p>
            <div className="daw">
              {" "}
              <p>{this.format()}</p>
              <p>{this.formatT()}</p>
            </div>
          </div>
          <img src={logo} className="print_logo" />
        </div>
        <div className="tir"></div>
        <p> Nom d'utilisateur : {this.props.user.username}</p>
        <p> Mot de pass : {this.props.user.password}</p>
        <div className="tir"></div>
        <p>laboratoire : {this.props.lab}</p>
      </div>
    );
  }
}
