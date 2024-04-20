const express = require('express');
const User = require('../schema/user');
const Post = require('../schema/post');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    console.log('로그인 페이지 호출됨!');
    console.log(req.session);
    if(req.session.user) {
      console.log('세션 유지됨 : ' + req.session.user[0]._id);
      res.send(`<script>alert('세션 유지됨');location.href='/posts';</script>`);
    }
    else {
      res.render('login.ejs');
    }
    //const users = await User.find({});
    //console.log(users);
    // res.status(200).json(users);
    // res.render('mongoose', { users });

    // 데이터 삽입 테스트(성공)
    // 컨테이너의 test 데이터베이스에 저장되는 것을 확인
    // const user = await User.create({
    //     user_id: 'idforjaewoo',
    //     user_name: 'name',
    //     user_stdid: 2019212998,
    //     user_phone: '010',
    //     user_email: 'gmail',
    //     user_pw: 'pwforjaewoo',
    // });
    // console.log(user);

    // 데이터 삽입 테스트
    // const post = await Post.create({
    //     user_id: '66168e989eb154f9710f8d46',
    //     post_title: 'Test title 3',
    //     post_content: 'I want to die really!!#!!#@@',
    // });
    // console.log(post);
    // console.log('post data inserted!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/register', async(req, res, next)=>{
  try {
    console.log('회원가입 페이지 호출됨');
    res.render('register.ejs');
  }
  catch(err) {
    console.error(err);
    next(err);
  }
});

// router.get('/main', async(req, res, next)=>{
//   try {
//     // console.log('메인 페이지 호출됨');
//     // res.render('main.ejs');
//     console.log('게시글 목록 요청 수신됨!');
//     const posts = await Post.find({}).populate('user_id', 'user_name');
//     console.log(posts);
//     res.render('main.ejs', {data: posts});
//   }
//   catch(err) {
//     console.error(err);
//     next(err);
//   }
// });

router.get('/post', async(req, res, next)=>{
  try {
    console.log('게시글 작성 페이지 호출됨');
    console.log(req.session.user[0]._id);
    res.render('post.ejs', {user: req.session.user[0]._id});
  }
  catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;