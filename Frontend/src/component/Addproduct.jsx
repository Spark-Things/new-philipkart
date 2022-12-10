import React,{useState,useEffect} from 'react'

function Addproduct() {
   
   const [title, settitle] = useState();
   const [discription, setdiscription] = useState();
   const [price, setprice] = useState();
   const [category, setcategory] = useState();

  const addItems = () =>{
    fetch("http://localhost:5000/addproduct",{
      method:"POST",
      headers:{
        "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkzMDFhZThiODA5NDkwOGQ1NjQzNGUiLCJpYXQiOjE2NzA2NzUxMjZ9.9DfDLL-DYL4FXOemogFCSAZs8rt72z2xcyefhSwQc8Q",
        "Content-Type" : "application/json"
      }, 
      body : JSON.stringify({
        title,
        discription,
        price,
        category,
      })
    })
    .then(res => res.json())
    .then(result => console.log(result))
  }
  

  return (
    <div>
      <div>
        <label>title : </label>
          <input type="text" onChange={(e) => settitle(e.target.value) }></input>
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
      <button onClick={() => addItems()}>Add</button>
    </div>
  )
}

export default Addproduct