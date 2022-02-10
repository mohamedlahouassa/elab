import React from "react";

function Info(props) {
  return (
    <div className="info_profile">
      <h2>Informations</h2>
      <div className="tir"></div>
      <p>Nom: {props.user.nom}</p>
      <p>Preom: {props.user.prenom}</p>

      <p>Date de naissance : {props.user.date}</p>
      <p>Telephone : {props.user.tel} </p>
      <p>laboratoire : {props.lab}</p>
    </div>
  );
}

export default Info;
