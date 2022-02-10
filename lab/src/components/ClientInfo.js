import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import axios from "axios";
import { ComponentToPrint } from "./ComponentToPrint";
import { useReactToPrint } from "react-to-print";
function ClientInfo(props) {
  const [selecte, setselecte] = useState({});
  const componentRef = useRef();

  useEffect(() => {
    axios
      .post(
        "/lab/getSignleClient",
        { id: props.client },
        { headers: { "x-access-token": localStorage.getItem("tkn") } }
      )
      .then((res) => {
        setselecte(res.data);
      });
  }, [props.client]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="client_info">
      <div className="dfl daw">
        <Avatar
          name={selecte?.nom + " " + selecte?.prenom}
          className="prf_avatar"
          color="#582dd0"
          size="40"
          round={true}
        />
        <div>
          <p>
            {selecte?.nom} {selecte?.prenom}
          </p>
          <p>{selecte?.tel} </p>
        </div>
        <div style={{ marginLeft: "50px" }}>
          <p>Nom d'utilisateur : {selecte?.username}</p>
          <p>mot de pass : {selecte?.password}</p>
        </div>
        <div style={{ marginLeft: "50px" }}>
          <div>
            <div className="comptoprint">
              <div style={{ display: "none" }}>
                <ComponentToPrint
                  ref={componentRef}
                  user={selecte}
                  lab={props.name}
                />
              </div>
              <span
                style={{ marginLeft: "10px" }}
                className="login_btn"
                onClick={handlePrint}
              >
                Imprimer Ces Informations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
