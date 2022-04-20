const mongoose= require('mongoose');
const Feed=require('./Feed');
const Comment=require('./Comment');
const likeSchema = new mongoose.Schema({
    reaction:{
        type:String,
        enum:[HAPPY,SAD,ANGRY,WOW]
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
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
    
    
})

module.exports=mongoose.model('Likes',likeSchema);
