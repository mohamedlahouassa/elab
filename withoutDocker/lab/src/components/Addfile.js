import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillFolderAdd } from "react-icons/ai";

function Addfile(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler = (event) => {
      console.log("hamouud");
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
        setIsFilePicked(true);
      };
    
      const handleSubmission = () => {
        const dataForm = new FormData();
        
        dataForm.append("labId", props.id);
        dataForm.append("clientId", props.client);
        dataForm.append("file", selectedFile);
        axios
          .post("http://localhost:3001/upload/single", dataForm)
          .then((res) => {
            setSelectedFile({});
            setIsFilePicked(false);
            props.refr();
          })
          .catch((err) => console.log(err));
      };
  return (
    <div>
      <div className="add_table" >
        <input
          onChange={changeHandler}
          onClick={(event)=> { 
            event.target.value = null
       }}
          accept=".pdf"
          type="file"
          className="custom-file-input"
        />
     
        <span className="add_btn" onClick={handleSubmission}>
          <AiFillFolderAdd /> ajouter
        </span>
        <div className="file_info">
        {isFilePicked ? (
				<div >
					<p> {selectedFile?.name}</p>
					<p> Type : {selectedFile?.type}</p>
			
				
				</div>
			) : (
				<p>Selectionner Un fichier avant </p>
			)}
            </div>
      </div>
    </div>
  );
}

export default Addfile;
