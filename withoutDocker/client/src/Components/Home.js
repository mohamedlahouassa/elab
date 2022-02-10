import React from "react";
import "../App.css";
import pic from "../images/picture.svg";
function Home() {
  return (
    <div className="home">
      <div className="home_fr">
        <div className="home_fr_description h_vi">
          <h2>Bienvenue</h2>
          <p>
            Bienvenue chez Elab une platform web qui va faire une relation entre
            les patients et les laboratoires au niveau mondiale dans le cadre de
            numerisation pour le but de facilite la communication entre le
            patient et les laboratoires et aussi les medecins
          </p>
        </div>
        <div className="home_fr_description h_ve">
          <h2>Comment Utiliser</h2>
          <p>
            si vous etes un patient et vous voulez voir ton resultat c juste
            vous consulter le laboraoire et li va vous cree un compte et il va
            vous donner ton username/password et apres vous pouvez utiliser ce
            compte
          </p>
        </div>
      </div>
      <div className="home_sc">
        <img src={pic} alt="labo" />
      </div>
    </div>
  );
}

export default Home;
