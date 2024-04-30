const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // ObjectId 타입은 따로 꺼내주어야 한다.
const postSchema = new Schema({
    post_category: {
        type: String,
        required: true,
        default: 'message',
    },
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    post_title: {
        type: String,
        required: true,
    },
    post_date: {
        type: Date,
        default: Date.now,
    },
    post_view: {
        type: Number,
        default: 0,
    },
    post_content: {
        type: String,

    }
})

module.exports = mongoose.model('Post', postSchema);