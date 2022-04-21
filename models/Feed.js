const  mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['IMAGE', 'VIDEO'],
        required: false,
    },
    url: {
        type: String,
        required: false,
    }

})



const feedSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    media: [mediaSchema],
    createby:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }


}, { timestamps: true })

module.exports = mongoose.model('Feed', feedSchema);