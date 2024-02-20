import React from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import CameraComponent from "./cameraComponent";
import Home from "./screen/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const djangoUrl = "http://127.0.0.1:8000/";
  const [imageUrl, setUrl] = useState("");
  const [imageType, setType] = useState("");
  const [predicted, setPredict] = useState("");

  function handleChange(e) {
    const fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);
    let tmpresult;
    fr.addEventListener("load", () => {
      tmpresult = fr.result;

      var imgType = "";
      let ctr = 0;
      var i = 0;
      for (i = 0; tmpresult[i] !== ","; i++) {
        if (tmpresult[i] === ";") ctr = 0;
        if (ctr !== 0) imgType += tmpresult[i];
        if (tmpresult[i] === "/") ctr = 1;
      }
      // console.log(tmpresult.substring(i + 1));
      setType(imgType);
      setUrl(tmpresult.substring(i + 1));
    });
  }
  console.log("image uploaded");
  console.log(imageType);

  const handleClick = async (para) => {
    if (para === 1) {
      const resData = await axios
        .post(djangoUrl + "imgpredict/", {
          imageUrl: imageUrl,
          imageType: imageType,
        })
        .then((res) => {
          console.log(JSON.parse(res.data));
          setPredict(JSON.parse(res.data)[0]);
        })
        .catch((err) => console.log(err));
    } else if (para === 2) {
      const resData = await axios
        .post(djangoUrl + "numberPredict/", {
          imageUrl: imageUrl,
          imageType: imageType,
        })
        .then((res) => {
          console.log(JSON.parse(res.data));
          // setPredict(JSON.parse(res.data)[0]);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
