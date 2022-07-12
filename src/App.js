/** @format */

import { useEffect } from "react";
import FileList from "./FileList/FileList";
import FileUpload from "./FileUpload/FileUpload";

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="container">
        <h1>Uploader</h1>
        <FileUpload />
        <FileList />
      </div>
    </>
  );
}

export default App;
