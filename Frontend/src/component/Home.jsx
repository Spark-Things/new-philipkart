import React from "react";
import Panelcontainer from "../widget/panelcontainer";

function Home() {
  return (
    <div className="maincontainer">
      <div className="catagorycontainer">

      </div>
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