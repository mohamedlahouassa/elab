import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineFilePdf,
} from "react-icons/ai";
import ContentLoader from "react-content-loader";

import { TiDeleteOutline } from "react-icons/ti";

import ReactTooltip from "react-tooltip";

function Resultat(props) {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const MyLoader = () => (
    <ContentLoader
      speed={3}
      width={1000}
      height={1000}
      viewBox="0 0 1000 1000"
      backgroundColor="#F3F3F3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="17" rx="0" ry="0" width="800" height="40" />
      <rect x="0" y="67" rx="0" ry="0" width="800" height="40" />
      <rect x="0" y="115" rx="0" ry="0" width="800" height="40" />
    </ContentLoader>
  );
  useEffect(() => {
    setloading(true);
    axios
      .post(
        "http://localhost:3001/getFilesLab",
        { labId: props.id, clientId: props.client },
        { headers: { "x-access-token": localStorage.getItem("tkn") } }
      )
      .then((res) => {
        if (res.data.auth) {
          setdata(res.data.files);
          setloading(false);
        }
      });
  }, [props.client]);
  const redi = (a) => {
    var params = {
      "x-access-token": localStorage.getItem("tkn"),
    };

    var url =
      "http://localhost:3001/getDataLab/" +
      a +
      "/" +
      localStorage.getItem("tkn");
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
  const dela = (name, id) => {
    axios
      .delete("http://localhost:3001/deleteData/" + id + "/" + name, {
        headers: { "x-access-token": localStorage.getItem("tkn") },
      })
      .then((res) => {
        if (res.data.op) {
          props.refr();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      {loading ? (
        MyLoader()
      ) : (
        <ul className="pdf_list">
          {data.map((fi) => {
            const ext = fi.pdf.split("-");
            const name = ext[ext.length - 1];
            return (
              <li key={fi.id}>
                <div className="ol" onClick={() => redi(fi.pdf)}>
                  <div className="dfl">
                    {compare(fi.date_seen)}
                    <AiOutlineFilePdf className="pdf_icon" /> {name}
                  </div>
                  <p className="dfl">{formatdate(fi.add_date)} </p>
                </div>
                <div className="deletebtn" onClick={() => dela(fi.pdf, fi.id)}>
                  <TiDeleteOutline />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Resultat;
