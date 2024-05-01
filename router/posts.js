const express = require('express');
const User = require('../schema/user');
const Post = require('../schema/post');
const Comment = require('../schema/comment');

const router = express.Router();

router.route('/').get(async (req, res, next)=> {
    try {
        console.log('게시글 목록 요청 수신됨 :' + req.query.category);
        const posts = await Post.find({post_category: req.query.category}).populate('user_id');
        // posts.reverse();
        console.log(posts);
        // res.render('main.ejs', {data: posts, user: req.session.user});
        res.json(posts);
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

        //post_id 기반으로 댓글 또한 검색해서 첫 로딩 시 보여주기: 테스트 필요
        //objectid를 이런 식으로 find할 수 있는가?
        const comments = await Comment.find({post_id: req.params.postid}).populate('user_id').populate('post_id');

        // 세션 유저 정보와 게시글 작성자 정보가 일치할 경우 구분
        // 세션 유저정보는 반드시 필요 => 내가 쓴 글일 수 있음 or 내가 쓴 댓글, 대댓글이 있을 수 있음
        res.render('content.ejs', {data: posts, data2:comments, user: req.session.user});
        // if(req.session.user[0].user_id == posts.user_id) {
        //     res.render('', {data: posts, data2:comments, user: req.session.user});
        // }
        // else {
        //     res.render('', {data: posts});
        // };

    }
    catch(err) {
        console.error(err);
        next(err);
    }
})

router.post('/', async(req, res, next)=>{ // 게시글 작성 기능
    try{
        usersession = req.session.user[0];
        console.log('게시글 작성 요청 수신됨!');
        console.log(req.body);

        console.log(usersession);
        console.log(typeof(usersession));
        console.log(usersession._id);
        console.log(typeof(usersession._id));

        await Post.create({
            user_id: usersession._id,
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