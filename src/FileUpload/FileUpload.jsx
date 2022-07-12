/** @format */

import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.scss";
import { http as axios } from "../ulti/setting";
import { useDispatch } from "react-redux";
import { updateFiles } from "../redux/reducers/filesReducer";
import ProgressBar from "react-bootstrap/ProgressBar";

const FileUpload = () => {
  const dispatch = useDispatch();
  const wrapperInput = useRef(null);
  const onDragEnter = () => wrapperInput.current.classList.add("onDrag");
  const onDragLeave = () => wrapperInput.current.classList.remove("onDrag");
  const onDrop = () => wrapperInput.current.classList.remove("onDrag");

  const [errormessage, setErrormessage] = useState(null);
  const [uploadedPercent, setUploadedPercent] = useState(0);

  const handleUpload = (e) => {
    if (
      e.target.files[0] !== undefined &&
      e.target.files[0].type.includes("image") &&
      e.target.files[0].size < 5000000
    ) {
      setErrormessage(null);
      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);

          if (percent < 100) {
            setUploadedPercent(percent);
          }
        },
      };
      let formData = new FormData();
      formData.append("fileupload", e.target.files[0]);

      axios
        .post("/api/upload", formData, config)
        .then((res) => {
          setUploadedPercent(100);
          setTimeout(() => {
            setUploadedPercent(0);
          }, 1000);
          dispatch(updateFiles({ ...res.data, status: res.status }));
        })
        .catch((err) => {
          setErrormessage(err.response?.data);
        });
    } else if (e.target.files[0] === undefined) {
      setErrormessage("Vui lòng chọn file để upload");
    } else {
      setErrormessage(
        `Định đạng ${e.target.files[0].type.toUpperCase()} không hợp lệ`
      );
    }
  };

  return (
    <>
      <div className="file-card">
        <div
          ref={wrapperInput}
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          className="file-input"
        >
          <input id="file-input" type="file" onChange={handleUpload} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            UPLOAD HERE
          </button>
        </div>
        {uploadedPercent > 0 && (
          <ProgressBar
            className="progressBar"
            now={uploadedPercent}
            label={`${uploadedPercent}%`}
            animated
          />
        )}
        {errormessage && <p className="main text-danger">{errormessage}</p>}
        <p className="main">Support File</p>
        <p className="info">JPG, PNG...</p>
      </div>
    </>
  );
};

export default FileUpload;
