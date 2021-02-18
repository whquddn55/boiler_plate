const mongoose = require('mongoose');

const userSchema = mongoose.Schema( {
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true, // thu thi@naver.com => thuthi@naver.com
        unique : 1
    },
    password : {
        type : String,
        maxLength : 12
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : { // 유효성 판단
        type : String
    },
    tokenExp : { // 토큰 기간 
        type : Number
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;