const { string } = require('joi');
const mongoose=require('mongoose');
const requestSchema=new mongoose.Schema({
senderUserId:{
    type:mongoose.Schema.Types.ObjectId,ref:'User'
},

receiverUserId: {
 type: mongoose.Schema.Types.ObjectId, ref: 'User',
},
status:{
    type:string,
    enum:['REQUESTED','ACCEPTED']
}
});
module.exports=mongoose.model('Request',requestSchema);
