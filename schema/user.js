const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    user_id: {
        type: String, //자료형 종류: String, Number, Boolean, Date
        required: true, //null 여부. 표시할 옵션이 type 뿐이면 {}와 그 안의 내용 생략하고 속성명: 자료형종류 식으로 표현 가능
        unique: true //unique 여부
    },
    user_name: {
        type: String,
        required: true,
    },
    user_stdid: {
        type: Number,
        required: true,
    },
    user_phone: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    user_pw: {
        type: String,
        required: true,
        trim: true, //공백 제거
    }
})

module.exports = mongoose.model('User', userSchema);