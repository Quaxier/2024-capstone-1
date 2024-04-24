const express = require('express');
const Comment = require('../schema/comment');
const Recomment = require('../schema/recomment');
const User = require('../schema/user');

const router = express.Router();

router.post('/:commentid', async(req, res, next)=> {
    try {
        console.log('대댓글 등록 요청 수신됨!');
        console.log('댓글 ID: '+req.params.commentid+'\nRequested by: '+req.session.user.user_id);

        const recomment = Recomment.create({
            comment_id: req.body.comment_id,
            user_id: req.session.user.user_id,
            recomment_content: req.body.recomment_content,
        },
        function (err, raw) {
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });
        console.log('새 대댓글 등록됨: \n' + recomment);

        const comment = Comment.findByIdAndUpdate(
            req.body.comment_id,
            { '$push': { recomment_id: recomment._id } },
            { new: true }
        )
        console.log('댓글과 대댓글 연결됨');
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})


module.exports = router;