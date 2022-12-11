import React,{useState} from "react";
import Panelcontainer from "../widget/panelcontainer";

function Home() {

   const [cat, setcat] = useState()

   fetch("http://localhost:5000/allproducts",{
    method: "get",
    headers:{
      "Content-Type" : "application/json"
    }
   })
   .then(res => res.json())
   .then(result => setcat(result))

  return (
    <div className="maincontainer">
      <div className="catagorycontainer">
            {
              cat ?
              cat.map((item) => {
                return(
                  <a>{item.category}</a>
                )
              }) : <span>loading....</span>
            }
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
