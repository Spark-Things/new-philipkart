import React,{useState} from "react";
import Panelcontainer from "../widget/panelcontainer";

function Home() {
  
   const Adds =[
    {link: ""},
    {link: ""},
    {link: ""},
    {link: ""},
   ] 

  return (
    <div className="maincontainer">
      <div className="Adcontainer">
        content
        </div>
        <Panelcontainer category="Shoes" />
        <Panelcontainer category="Mobile"/>
        <Panelcontainer category="Electronic"/>
        <Panelcontainer category="TV" />
    </div>
  );
}

export default Home;
