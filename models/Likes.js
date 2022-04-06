const mongoose= require('mongoose');
const Feed=require('./Feed');
const comment=require('./Comment');
const likeSchema = new mongoose.Schema({
    reactions:{
        type:[Number],
        required:false
    },
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
    
    
})

module.exports=mongoose.model('Likes',likeSchema);
