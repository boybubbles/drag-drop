/** @format */

import { http } from "../../ulti/setting";
import { deleteFiles, getFiles, updateFiles } from "../reducers/filesReducer";

export const getFilesAction = () => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/getFiles");
      dispatch(getFiles(result.data));
    } catch (errors) {}
  };
};

export const uploadFilesAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/upload", formData);
      dispatch(updateFiles({ ...result.data, status: result.status }));
    } catch (errors) {
      dispatch(
        updateFiles({ ...errors.response.data, status: errors.response.status })
      );
    }
  };
};
export const deleteFilesAction = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.delete(`/api/deleteFiles/${id}`);
      dispatch(deleteFiles(result.data));
    } catch (errors) {
      console.log(errors);
    }
  };
};
