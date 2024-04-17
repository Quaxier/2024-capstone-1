const express = require('express');
const User = require('../schema/user');
const Comment = require('../schema/comment');

const router = express.Router();

router.route('/').get(async (req, res, next)=>{ // 아이디 중복 확인 요청에 대한 응답
    try{
        console.log('중복요청 수신됨!');
        console.log(req.query);
        const users = await User.find({user_id: req.query.user_id});
        console.log(users);
        if(users.length===0 && Array.isArray(users)) { // 배열 길이가 0이면서 해당 변수가 배열인지 체크
          res.status(200).send(true); // status는 생략 가능. 기본값 200.
        }
        else {
          res.status(200).send(false);
        }
        //res.json(users);
    } catch(err) {
        console.error(err);
        next(err);
    }
}).post(async (req, res, next)=>{ // 회원가입 완료 (입력 정보 저장) 기능
    try{
        console.log('회원가입 요청 수신됨!');
        console.log(req.body);
        const user = await User.create({
            user_id: req.body.user_id,
            user_name: req.body.name,
            user_stdid: req.body.stdid,
            user_phone: req.body.phone,
            user_email: req.body.email,
            user_pw: req.body.password,
        });
        console.log('새로운 사용자 등록됨: \n' + user);
        res.status(201).json(user); // 응답시 HTML 상태코드를 지정하고 json형식의 응답을 보낸다
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id/:pw').get(async (req, res, next) => {
    try {
      console.log('로그인 요청 수신됨!');
      console.log('ID: '+req.params.id+'\nPW: '+req.params.pw);
      const users = await User.find({user_id: req.params.id, user_pw: req.params.pw});
      console.log(users);
      if(users.length>1) {
        res.status(404).send('중복 계정이 있습니다');
      }
      else if(users.length===1 && Array.isArray(users)) {
        req.session.user = users; // 세션에 사용자 정보 저장

        console.log('로그인 성공: \n'+users);
        res.status(200).json(users);
      }
      else {
        console.log('로그인 실패');
        res.end();
      }

    }
    catch(err) {
      console.error(err);
      next(err);
    }
});

router.get('/:id/comments', async (req, res, next) => {
    try {
      // req.params.id(유저 _id)로 find.
      // 이떄 가져온 도큐먼트의 commenter 필드값을 objectId에서 ref로 연결된 user 임베디드 도큐먼트로 변환 해준다.
      const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
  
      console.log(comments);
      /*
      [
        {
          // comments 다큐먼트 정보
          _id: 6192f13b4407f5881bbc3b74,
          comment: '제로 댓글입니다',
          created_at: 2020-08-30T14:07:00.000Z,
          createdAt: 2021-11-16T02:07:33.768Z
  
          // users 다큐먼트를 임베디드 한다.
          commenter: { 
            _id: 618dd18614694987b7eccef1,
            name: 'zero',
            age: 24,
            married: false,
            comment: '안녕하세요. 간단히 몽고디비 사용 방법에 대해 알아봅시다.',
            createdAt: 2021-11-12T02:29:26.128Z
          },
        }
      ]
      */
  
      res.json(comments); // 배열로 반환
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;