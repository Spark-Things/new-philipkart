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
    type:Object,
    ref : "Post"
  }
  ],
  wishlist:[{
    type:Object,
    ref:"Post"
  }],
  orders:[{
    type:Object,
    ref:"Post"
  }]
})

mongoose.model("User",userschema)