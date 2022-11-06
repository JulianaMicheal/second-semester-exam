const mongoose = require("mongoose")
const Schema = mongoose.Schema 


const blogModel = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    
    Description: {
      type: String,
      required: true,
      author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User' ,
        require:true,  
    }},

    state:  { 
        type: String, 
        required: true, 
        enum: ['draft', 'publish'], 
        default: 'draft' 
},
    
    readCount: {
    type: Number, 
      default: 0,
    },
   
    readingTime: Number, 
    tags:[String],
    body:String
  
   }, { timestamps: true });
  
  module.exports   = mongoose.model('Blog' , blogModel);