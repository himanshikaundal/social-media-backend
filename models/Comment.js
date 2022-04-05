
const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        maxlength:500,
            }
})
module.exports.Comment=mongoose.model('Comment',commentSchema);
