import React, { useRef, useState } from "react";
import DatePicker from "react-date-picker";
import randomstring from "randomstring";
import axios from "axios";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { useReactToPrint } from "react-to-print";

function Create(props) {
  const [date, setdate] = useState();
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [tel, settel] = useState("");
  const [usern, setusern] = useState("");
  const [userpass, setuserpass] = useState("");
  const [errmsg, seterrmsg] = useState();
  const [updata, setupdata] = useState(undefined);
  const componentRef = useRef();

  const generate = () => {
    if (nom.trim() == "" || prenom.trim() == "") {
      seterrmsg("nom/prenom vide !!");
    } else {
      seterrmsg("");
      const usrn = nom[0].toLowerCase() + prenom.toLowerCase();
      const pass = randomstring.generate({
        length: 6,
        charset: "alphabetic",
      });
      setuserpass(pass);
      setusern(usrn);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const reseti = () => {
    setnom("");
    setprenom("");
    settel("");
    setusern("");
    setuserpass("");
    setdate("");
  };
  const create = () => {
    if (
      nom.trim() == "" ||
      prenom.trim() == "" ||
      tel.trim() == "" ||
      usern.trim() == "" ||
      userpass.trim() == ""
    ) {
      seterrmsg("nom / prenom / tel / username / password  vide !!");
    } else {
      seterrmsg("");
      axios
        .post(
          "/lab/createUser",
          {
            nom: nom,
            prenom: prenom,
            tel: tel,
            username: usern,
            password: userpass,
          },
          { headers: { "x-access-token": localStorage.getItem("tkn") } }
        )
        .then((res) => {
          if (res.data.op) {
            setupdata(res.data.user);

            handlePrint();
            reseti();
          }
        });
    }
  };
  return (
    <div>
      <div className="form_create">
        <div className="form_user_name">
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => {
              setnom(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Prenom"
            value={prenom}
            onChange={(e) => {
              setprenom(e.target.value);
            }}
          />
        </div>
        <input
          type="tel"
          className="full_inp"
          placeholder="+213"
          value={tel}
          onChange={(e) => {
            settel(e.target.value);
          }}
        />
        <DatePicker
          className="full_inp"
          format="dd/MM/y"
          value={date}
          onChange={(val) => {
            setdate(val);
          }}
        />
        <input
          type="text"
          className="full_inp"
          placeholder="username"
          value={usern}
          onChange={(e) => {
            setusern(e.target.value);
          }}
        />
        <input
          type="text"
          className="full_inp"
          placeholder="password"
          value={userpass}
          onChange={(e) => {
            setuserpass(e.target.value);
          }}
        />
        <div className="create_form_buttons">
          <div className="cr_btn" onClick={create}>
            Create{" "}
          </div>
          <div className="gn_btn" onClick={generate}>
            {" "}
            Generate
          </div>
        </div>
        <p>{errmsg}</p>
        {updata ? (
          <div>
            <div className="comptoprint">
              <ComponentToPrint
                ref={componentRef}
                user={updata}
                lab={props.name}
              />
              <div
                style={{ marginLeft: "10px" }}
                className="add_btn"
                onClick={handlePrint}
              >
                Imprimer
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Create;
