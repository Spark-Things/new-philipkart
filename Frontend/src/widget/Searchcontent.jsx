import React from "react";
import { Link } from 'react-router-dom';

function Searchcontent({ searchData }) {
  return (
    <div className="searchContainer">
      <div className="serachBody">
        {searchData
          ? searchData.map((item) => {
              return (
                <> 
                  <a href={`/products/${item._id}`}>
                    <div className="searchCard">
                     <img src={item.photo}></img>
                     <div className="">
                       <h4>{item?.title}</h4>
                       <span>in {item?.category}</span>
                    </div>
                    <span className="icon"></span>
                  <br />
                  </div>
                  </a>
                </>
              );
            })
          : <span>Search Result</span>}
      </div>
      <div className="Footer"></div>
    </div>
  );
}

export default Searchcontent;
