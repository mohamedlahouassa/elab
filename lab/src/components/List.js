import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import ContentLoader from "react-content-loader";

function List(props) {
  const [clients, setclients] = useState([]);
  const [selectedId, setselectedId] = useState();
  const [search, setsearch] = useState();
  const [cser, setcser] = useState(clients);
  const [loading, setloading] = useState(false);
  const select = (id) => {
    console.log(id);
    setselectedId(id);
    props.onSelect(id);
  };
  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      viewBox="0 0 500 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="37" rx="0" ry="0" width="800" height="58" />
      <rect x="0" y="98" rx="0" ry="0" width="800" height="58" />
      <rect x="0" y="159" rx="0" ry="0" width="800" height="58" />
      <rect x="0" y="220" rx="0" ry="0" width="800" height="58" />
    </ContentLoader>
  );
  const format = (b) => {
    let date = new Date(b);
    return (
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      (date.getFullYear() - 2000)
    );
  };

  useEffect(async () => {
    setloading(true);
    axios
      .post(
        "/lab/getClient",
        {
          labI: props.id,
        },
        { headers: { "x-access-token": localStorage.getItem("tkn") } }
      )
      .then((res) => {
        if (res.data.ope) {
          setclients(res.data.data);
          setcser(res.data.data);
          setloading(false);
        } else {
          props.logout();
        }
      });
  }, []);
  useEffect(() => {
    if (search?.length > 0) {
      var searchString = search.trim().toLowerCase();
      var libraries = clients.filter(function (i) {
        const se = i.nom + " " + i.prenom;
        return se.toLowerCase().match(searchString);
      });
      setcser(libraries);
    } else {
      setcser(clients);
    }
  }, [search]);

  return (
    <div>
      <div className="list_of_client">
        <h2>Clients</h2>
        <div className="search_inp">
          <FiSearch />
          <input
            type="text"
            placeholder="Recherche"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
        </div>
        <div className="list_stat">
          {" "}
          <p>{cser.length}</p> <p>all : {clients.length}</p>
        </div>
        {loading ? (
          <MyLoader />
        ) : (
          <ul className="list_of_client_elements">
            {cser.map((a) => {
              return (
                <li
                  onClick={() => {
                    select(a.id);
                  }}
                  className={a.id == selectedId ? "active_client" : ""}
                >
                  <div className="dfl">
                    <AiOutlineUserAdd />{" "}
                    <p className="lis_name">{a.nom + " " + a.prenom}</p>
                  </div>
                  <p className="list-date">{format(a.date_de_creation)}</p>{" "}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default List;
