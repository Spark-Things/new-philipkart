const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const Postschema = new mongoose.Schema({
    title:{
      type: String,
      required : true
    },
    discription:{
      type:String,
      required:true
    },
    photo:{
     type:String,
    //  required: true,
     default:"No photo"
    },
    price:{
      type:Number,
      require:true
    },
    author:{
      type: ObjectId,
      ref:"User"
    },
    image:{
      url : {
      type:String,
      },
    },
    category:{
       type:String,
       required:true
    },
    Brand:{
      type:String,
      required: true,
    }

})

mongoose.model("Post",Postschema);