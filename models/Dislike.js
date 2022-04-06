const mongoose=require('mongoose');
const Feed=require('./Feed');
const comment=require('./Comment');
const dislikeSchema= new mongoose.Schema({
feedId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:Feed
},
commentId:{
    type:mongoose.Schema.Types.ObjectId,
    required:false,
    ref:comment
}
});
module.exports=mongoose.model('Dislike',dislikeSchema);
