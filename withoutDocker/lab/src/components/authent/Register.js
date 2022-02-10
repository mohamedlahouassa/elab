import React from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { dz } from "../../data/dt";
import { useEffect } from "react";

function Register() {
  //owner
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  //lab
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [wilaya, setwilaya] = useState("");
  const [mess, setmess] = useState("");
  const [loadin, setloadin] = useState(false);
  useEffect(() => {
    console.log(dz);
  }, []);
  const register = () => {
    //owner
    if (
      name.trim() == "" ||
      email.trim() == "" ||
      phone.trim() == "" ||
      password.trim() == "" ||
      username.trim() == ""
    ) {
      alert("champ vide");
    } else {
      axios
        .post("http://localhost:3001/addLab", {
          username: username,
          password: password,
          phone: phone,
          email: email,
          name: name,
          wilaya: wilaya,
        })
        .then((res) => {
          if (res.data.succ) {
            setmess(res.data.message);
            reset();
          } else {
            setmess(res.data.message);
          }
        });
    }
  };
  const reset = () => {
    setname("");
    setusername("");
    setpassword("");
    setemail("");
    setphone("");
  };
  return (
    <div className="login">
      <div className="register">
        <div className="owner_regist">
          <h2>Owner Informations</h2>
          <p>{mess}</p>
          <input
            className="login_inp"
            type="text"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            disabled={loadin ? true : false}
            placeholder="Name"
          />
          <input
            className="login_inp"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            disabled={loadin ? true : false}
            type="email"
            placeholder="email"
          />
          <input
            className="login_inp"
            value={phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
            disabled={loadin ? true : false}
            type="tel"
            placeholder="Phone"
          />
        </div>
        <div className="lab_regist">
          <h2>Lab Informations</h2>
          <input
            className="login_inp"
            type="text"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            disabled={loadin ? true : false}
            placeholder="Username"
          />
          <input
            className="login_inp"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            disabled={loadin ? true : false}
            type="password"
            placeholder="Password"
          />
          <select
            className="selectBtn"
            value={wilaya}
            onChange={(e) => setwilaya(e.target.value)}
          >
            {dz.map((el) => {
              return <option value={el.city}>{el.city}</option>;
            })}
          </select>
        </div>
        <div className="register_btn" onClick={register}>
          Register
        </div>
      </div>
    </div>
  );
}

export default Register;
