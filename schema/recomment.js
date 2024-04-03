const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema; // ObjectId 타입은 따로 꺼내주어야 한다.
const recommentSchema = new Schema({
    comment_id: {
        type: ObjectId,
        required: true,
        ref: 'Comment',
    },
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    recomment_date: {
        type: Date,
        default: Date.now,
    },
    recomment_content: {
        type: String,
    }
})

module.exports = mongoose.model('Recomment', recommentSchema);