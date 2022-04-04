const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:255
      },
      username:{
        type:String,
        required:true,
        min:5,
        max:255,
        unique:true
      },
      email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        min:10,
        max:255
      },
      password:{
        type:String,
        required:true,
        min:5,
        max:255,
      },      
      isAdmin:{
        type:Boolean,
        default:false
      },
      profilePicture:{
        type:String,
        default:""
      },
    coverPicture:{
        type:String,
        default:""
      },
    headline:{
        type:String,
        max:20
    },
    state:{
        type:String,
        max:20
    },
    county:{
        type:String,
        max:20
    },
    city:{
        type:String,
        max:20
    },
    website:{
        type:String,
        max:20
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    dob:{
        type:Date
    }  
});

module.exports = mongoose.model('User', userSchema);



const feedSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
        maxlength:1024,

          },
    feed_id:{
        type:String,
        required:true,
    }

})

exports.Feed=mongoose.model('Feed',feedSchema);


const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        maxlength:500,
            }
})
exports.Comment=mongoose.model('Comment',commentSchema);
