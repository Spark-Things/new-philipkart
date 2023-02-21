const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  name:{
    type: String,
    required : true
  },
  email:{
    type: String,
    required : true
  },
  password:{
    type: String,
    required : true
  },
  cart:[{
    type:Object
    
  }],
  wishlist:[{
    type:Object
  }]
})

mongoose.model("User",userschema)