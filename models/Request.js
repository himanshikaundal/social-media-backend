const mongoose=require('mongoose');
const requestSchema=new mongoose.Schema({
sentRequest:[{
    username: {type: String, default: ''}
}],
request: [{
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    username: {type: String, default: ''}
}],
friendsList: [{
    friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    friendName: {type: String, default: ''}
}]
});
module.exports=mongoose.model('Request',requestSchema);