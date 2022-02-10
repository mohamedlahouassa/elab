import React from "react";
import { AiOutlineLogout } from "react-icons/ai";

function Logout(props) {
  const logout = () => {
    localStorage.removeItem("tkn");
    localStorage.removeItem("user");
    props.update();
  };
  return (
    <div>
      <AiOutlineLogout className="Logout" onClick={logout} />
    </div>
  );
}

export default Logout;
