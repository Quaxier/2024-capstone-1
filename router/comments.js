const express = require('express');
const Comment = require('../schema/comment');
const Post = require('../schema/post');
const User = require('../schema/user');
const Recomment = require('../schema/recomment');

const router = express.Router();

router.route('/').get(async (req, res, next)=> {

}).post(async (req, res, next)=> {
    try{
        console.log('댓글 등록 요청 수신됨!');
        console.log(req.body);

        const comment = await Comment.create({
            // user_id: req.body.user_id,
            user_id: req.session.user.user_id,
            post_id: req.body.post_id,
            comment_content: req.body.comment_content, 
            },
            function (err, raw) {
                if (err) return handleError(err);
                console.log('The raw response from Mongo was ', raw);
            }
        );
        console.log('새 댓글 등록됨: \n' + comment);
        res.send(true);
    } catch(err) {
        console.error(err);
        next(err);
    }
})

router.get('/:postid', async(req, res, next)=> {
    try {
        console.log('댓글 조회(갱신) 요청 수신됨!');
        console.log('게시글 ID: '+req.params.postid+'\nRequested by: '+req.session.user.user_id);

        //post_id 기반으로 댓글 또한 검색해서 첫 로딩 시 보여주기: 테스트 필요
        //objectid를 이런 식으로 find할 수 있는가?
        const comments = await Comment.find({post_id: req.params.postid}).populate('user_id').populate('post_id').populate('recomment_id');
        res.status(200).json(comments);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})




module.exports = router;