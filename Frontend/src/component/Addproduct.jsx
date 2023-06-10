import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {cloud_name,api_key,api_secret} from '../../../Backend/Keys'

function Addproduct() {
  const [title, settitle] = useState();
  const [discription, setdiscription] = useState();
  const [price, setprice] = useState();
  const [category, setcategory] = useState();
  const [Brand, setBrand] = useState();
  const [image, setimage] = useState();
  const [ImgUrl, setImgUrl] = useState();

  // console.log(import.meta.env.VITE_CLOUD_NAME);
  const navigate = useNavigate();
  const addProductToDb = () => {
    console.log(ImgUrl);
    console.log(category);
    ImgUrl ? fetch("process.env.backendURLaddproduct", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        discription,
        price,
        image:ImgUrl,
        category,
        Brand,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
  : console.log("Image Url Not Found");
  navigate("/")
  }  
  const addImage = async () => {
    if (image) {
      // uploading image to cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
      formData.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER);
      // console.log(formData);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          return(
          console.log(result), 
          setImgUrl(result.secure_url))
        });
    }
  };
   useEffect(() =>{
     addImage()
   },[image])
  return (
    <div className="addProductScreen">
      <div>
        <label>title : </label>
        <input
          type="text"
          onChange={(e) => settitle(e.target.value)}
          placeholder="Product name"
        ></input>
      </div>
      <div>
        <label>discription : </label>
        <input
          type="text"
          onChange={(e) => setdiscription(e.target.value)}
        ></input>
      </div>
      <div>
        <label>upload image : </label>
        <input
          type="file"
          onChange={(e) =>
            setimage(e.target.files[0])}
        ></input>
      </div>
      <div>
        <label>price :</label>
        <input type="number" onChange={(e) => setprice(e.target.value)}></input>
      </div>
      <div>
        <label>category</label>
        <select onChange={(e) => setcategory(e.target.value)}>
          <option>Not selected</option>
          <option>Electronic</option>
          <option>Mobile</option>
          <option>Shoes</option>
          <option>TV</option>
        </select>
      </div>
      <div>
        <label>Brand Name : </label>
        <input type="text" onChange={(e) => setBrand(e.target.value)}></input>
      </div>
      <button onClick={() => addProductToDb()}>Add</button>
    </div>
  );
}

export default Addproduct;
