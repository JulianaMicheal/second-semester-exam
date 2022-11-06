const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId


const userModel = new Schema({
    id:ObjectId,
    create_at:Date,
  
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
        type: String,
        required: true,
       },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    

user_type: {
type: String, 
  enum: ["user", "admin"], 
  default: "user"}
 }
);
  


userModel.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

userModel.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }

  const User = mongoose.model('Users', userModel);

  module.exports = User;
