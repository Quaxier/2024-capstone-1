const express = require('express');
const User = require('../schema/user');
const Post = require('../schema/post');

const router = express.Router();

router.post('/', async(req, res, next)=>{ // 게시글 작성 기능
    try{
        console.log('게시글 작성 요청 수신됨!');
        console.log(req.body);
        await Post.create({
            user_id: "661caf8ea5ee20100b82f81f",
            post_title: req.body.title,
            post_view: "0",
            post_content: req.body.content
        });
        console.log('새 게시글 작성됨: \n');
        res.status(201).json('성공!'); // 응답시 HTML 상태코드를 지정하고 json형식의 응답을 보낸다
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;