const express = require('express');
const User = require('../schema/user');
const Post = require('../schema/post');

const router = express.Router();

router.route('/').get(async (req, res, next)=> {
    try {
        console.log('게시글 목록 요청 수신됨!');
        const posts = await Post.find({}).populate('user_id');
        posts.reverse();
        console.log(posts);
        res.render('main.ejs', {data: posts, user: req.session.user});
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})

router.get('/:postid', async(req, res, next)=> {
    try {
        console.log('게시글 조회 요청 수신됨!');
        console.log('게시글 ID: '+req.params.postid+'\nRequested by: '+req.session.user.user_id);
        const posts = await Post.find({_id: req.params.postid}).populate('user_id', 'user_id');
        console.log(posts);

        // 세션 유저 정보와 게시글 작성자 정보가 일치할 경우 구분
        if(req.session.user[0].user_id == posts.user_id) {
            res.render('', {data: posts, user: req.session.user});
        }
        else {
            res.render('', {data: posts});
        };

    }
    catch(err) {
        console.error(err);
        next(err);
    }
})


module.exports = router;