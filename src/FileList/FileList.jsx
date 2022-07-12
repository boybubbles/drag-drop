/** @format */

import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilesAction,
  getFilesAction,
} from "../redux/actions/filesAction";
import "./FileList.scss";
const FileList = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((rootReducer) => rootReducer.filesReducer);
  const handleDetele = (id) => {
    dispatch(deleteFilesAction(id));
  };
  const imageToBlob = (imageURL) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.crossOrigin = "";
    img.src = imageURL;
    return new Promise((resolve) => {
      img.onload = function () {
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0);
        canvas.toBlob(
          (blob) => {
            // here the image is a blob
            resolve(blob);
          },
          "image/png",
          0.75
        );
      };
    });
  };
  const copyImage = async (imageURL) => {
    try {
      const blob = await imageToBlob(imageURL);
      //eslint-disable-next-line
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      alert("image copied successfully");
    } catch (err) {
      console.error(err?.name, err?.message);
    }
  };
  useEffect(() => {
    dispatch(getFilesAction());
  }, [dispatch]);
  return (
    <div className="file-list">
      {data &&
        data.map((item, index) => (
          <div className="file-list-item" key={index}>
            <img
              id={index}
              style={{ cursor: "pointer" }}
              src={`https://back-end-nodejs1.herokuapp.com${item.path}`}
              alt="..."
              key={index}
            />
            <div
              onClick={() => {
                let img = document.getElementById(index);
                copyImage(img.src);
              }}
              className="copy"
            >
              <FontAwesomeIcon className="icon-copy" icon={faCopy} />
            </div>
            <FontAwesomeIcon
              onClick={() => {
                handleDetele(item.id);
              }}
              className="btnDelete"
              icon={faTrash}
            />
          </div>
        ))}
    </div>
  );
};

export default FileList;
