import React, { useState } from "react";
import Avatar_Img from "./Avatar";
import "../styles/start.css";
import Start_btn from "./Start_btn";
import Scribbl_heading from "./Scribbl_heading";
import Name from "./Name";
export default function Start() {
//   const [name, setName] = useState("");
  return (
    //   flag &&

    <div className="start-block">
      <Avatar_Img />
      <Scribbl_heading />
      <Start_btn />
      <Name />
    </div>
  );
}
