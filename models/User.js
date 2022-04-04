const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String
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
