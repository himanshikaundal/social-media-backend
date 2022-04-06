const  mongoose  = require('mongoose');
const Feed= require('./Feed');
const commentSchema=new mongoose.Schema({
    comment:{
       type:String,
        required:true,
        maxlength:500,

},
feed_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Feed',
    required:true,

},
parentComment_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment',
}
})
module.exports=mongoose.model('Comment',commentSchema);
