import React, { useState } from "react";
import Panelcontainer from "../widget/Panelcontainer";
import one from "../Images/1.jpg";
import two from "../Images/2.jpg";
import three from "../Images/3.jpg";

function Home() {
  const [Disp, setDisp] = useState(1);


  return (
    <div className="maincontainer">
      <div className="Adcontainer">
        {Disp == 1 ? <img className="ads" src={one}></img> : null}
        {Disp == 2 ? <img className="ads" src={two}></img> : null}
        {Disp == 3 ? <img className="ads" src={three}></img> : null}
      </div>
      <Panelcontainer category="Shoes" />
      <Panelcontainer category="Mobile" />
      <Panelcontainer category="Electronic" />
      <Panelcontainer category="TV" />
    </div>
  );
}

export default Home;
