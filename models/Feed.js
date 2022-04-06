const  mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['IMAGE', 'VIDEO'],
        required: true,
    },
    url: {
        type: String,
        required: true
    }

})

const feedSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    media: [mediaSchema]


}, { timestamps: true })

module.exports = mongoose.model('Feed', feedSchema);