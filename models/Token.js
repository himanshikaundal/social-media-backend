const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
      email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        min:10,
        max:255
      },
      token: String,
      expirt:{ type: Date, expires: '20m', default: Date.now }
      
},{timestamps:true});

module.exports = mongoose.model('Token', tokenSchema);
