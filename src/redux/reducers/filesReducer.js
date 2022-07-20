/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  errorMesssages: "",
};

const filesReducer = createSlice({
  name: "filesReducer",
  initialState,
  reducers: {
    getFiles: (state, actions) => {
      state.data = actions.payload.map((item) => ({
        ...item,
        path: `https://back-end-nodejs1.herokuapp.com${item.path}`,
      }));
    },
    updateFileWithId: (state, actions) => {
      const index = state.data.findIndex(
        (item) => item.localID === actions.payload.localID
      );
      console.log(actions);
      state.data[index] = actions.payload;
    },
    updateFiles: (state, actions) => {
      if (actions.payload?.status === 200) {
        state.data.push(actions.payload);
      } else {
        state.errorMesssages = actions.payload;
      }
    },
    deleteFiles: (state, actions) => {
      state.data = state.data.filter((item) => {
        return item.id !== actions.payload.id;
      });
    },
  },
});

export const { updateFileWithId, deleteFiles, updateFiles, getFiles } =
  filesReducer.actions;

export default filesReducer.reducer;
