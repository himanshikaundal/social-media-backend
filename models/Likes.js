const mongoose= require('mongoose');
const Feed=require('./Feed');
const Comment=require('./Comment');
const likeSchema = new mongoose.Schema({
    reactions:{
        type:Sting
    },
    feedId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Feed'
    },
    commentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'Comment'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    }
    
    
})

module.exports=mongoose.model('Likes',likeSchema);
