const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // ObjectId 타입은 따로 꺼내주어야 한다.
const commentSchema = new Schema({
    // comment_id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    post_id: {
        type: ObjectId,
        required: true,
        ref: 'Post',
    },
    comment_date: {
        type: Date,
        default: Date.now,
    },
    comment_content: {
        type: String,
    },
    recomment_id: [{
        type: ObjectId,
        ref: 'Recomment'
    }]
})

module.exports = mongoose.model('Comment', commentSchema);