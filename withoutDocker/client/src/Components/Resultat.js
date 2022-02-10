import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineFilePdf,
} from "react-icons/ai";
import ReactTooltip from "react-tooltip";
function Resultat(props) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/getFiles",
        { labId: props.id, clientId: props.client },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.data.auth) {
          setdata(res.data.files);
        }
      });
  }, [props.client]);

  const redi = (a, b) => {
    axios
      .post(
        "http://localhost:3001/seen",
        { id: b },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((reso) => {
        console.log(reso);
      });
    var url =
      "http://localhost:3001/getData/" + a + "/" + localStorage.getItem("tkn");
    window.open(url);
    // axios
    //   .get("http://localhost:3001/getDataLab/" + a, {
    //     headers: { "x-access-token": localStorage.getItem("tkn") },
    //   })
    //   .then((res) => {

    //     window.open('http://localhost:3001/getDataLab/'+a);

    //   });
  };

  const formatdate = (a) => {
    var date = new Date(a);
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      ", " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  };
  const compare = (a) => {
    const seen = new Date(a);
    if (seen < new Date()) {
      return (
        <div
          className="dfl"
          data-tip={"vu : " + seen.getHours() + ":" + seen.getMinutes()}
        >
          <AiOutlineCheck className="pdf_icon" /> <ReactTooltip />
        </div>
      );
    } else {
      return <AiOutlineClockCircle className="pdf_icon" />;
    }
  };

  return (
    <div className="all_elements">
      <ul className="pdf_list">
        {data.map((fi) => {
          const ext = fi.pdf.split("-");
          const name = ext[ext.length - 1];
          return (
            <li onClick={() => redi(fi.pdf, fi.id)} key={fi.id}>
              {" "}
              <div className="dfl">
                {" "}
                {compare(fi.date_seen)}{" "}
                <AiOutlineFilePdf className="pdf_icon" /> {name}
              </div>{" "}
              <p>{formatdate(fi.add_date)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Resultat;
