import React,{useState,useEffect} from 'react'
// import {cloud_name,api_key,api_secret} from '../../../Backend/Keys'

function Addproduct() {
   
   const [title, settitle] = useState();
   const [discription, setdiscription] = useState();
   const [price, setprice] = useState();
   const [category, setcategory] = useState();
   const [Brand, setBrand] = useState();
   const [image, setimage] = useState();

  const addItems = () =>{
    // const formData = new FormData();
    //   formData.append("file", image);
    //   formData.append(
    //     "upload_preset",
    //     process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
    //   );
    //   formData.append("folder", process.env.NEXT_PUBLIC_CLOUDINARY_POST);
    //   console.log(formData);

    fetch("http://localhost:5000/addproduct",{
      method:"POST",
      headers:{
        "authorization" : "Bearer " + localStorage.getItem("jwt"),
        "Content-Type" : "application/json"
      }, 
      body : JSON.stringify({
        title,
        discription,
        price,
        image,
        category,
        Brand
      })
    })
    .then(res => res.json())
    .then(result => console.log(result))
  }
  

  return (
    <div className='addProductScreen'>
      <div>
        <label>title : </label>
          <input type="text" onChange={(e) => settitle(e.target.value)} placeholder="Product name"></input>
      </div>
      <div>
        <label>discription : </label>
          <input type="text"  onChange={(e) => setdiscription(e.target.value) }></input>
      </div>
      <div>
         <label>price :</label>
          <input type="number"  onChange={(e) => setprice(e.target.value) }></input>
      </div>
      <div>
        <label>category</label>
             <select  onChange={(e) => setcategory(e.target.value) }>
                 <option>Electronic</option>
                 <option>Mobile</option>
                 <option>Shoes</option>
                 <option>TV</option>
             </select>
      </div>
      <div>
        <label>Brand Name : </label>
          <input type="text"  onChange={(e) => setBrand(e.target.value) }></input>
      </div>
      <div>
        <label>upload image : </label>
          <input type="file"  onChange={(e) => setimage(e.target.files[0]) }></input>
      </div>
      <button onClick={() => addItems()}>Add</button>
    </div>
  )
}

export default Addproduct