const mongoose = require("mongoose");
const User = require('../models/User');
const tokenSchema = new mongoose.Schema({
      // email:{
      //   type:String,
      //   required: true,
      //   trim:true,
      //   lowercase:true,
      //   min:10,
      //   max:255
      // },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
      token:{
        type: String,
        required: true,
    },
      expiry:{ type: Date, expires:'3m', default: Date.now }
      
});

module.exports = mongoose.model('Token', tokenSchema);
