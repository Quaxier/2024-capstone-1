const express = require('express');
const User = require('../schema/user');
const Post = require('../schema/post');

const router = express.Router();

router.route('/main').post(async (req, res, next)=>{ // 게시글 작성 기능
    try{
        console.log('게시글 작성 요청 수신됨!');
        console.log(req.body);
        const post = await Post.create({
            user_id: req.body.user_id,
            post_title: req.body.title,
            post_date: req.body.date,
            post_view: req.body.view,
            post_content: req.body.content,
        });
        console.log('새 게시글 작성됨: \n' + title);
        res.status(201).json(user); // 응답시 HTML 상태코드를 지정하고 json형식의 응답을 보낸다
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;