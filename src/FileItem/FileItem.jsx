/** @format */

import React from "react";
import "./FileItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
const FileItem = () => {
  return (
    <li className="file-item">
      <FontAwesomeIcon icon={faFileAlt} />
      <p>filename</p>
      <div className="actions">
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </li>
  );
};

export default FileItem;
