// const mongoClient = require('mongodb').MongoClient;
const express=require('express');

const connect = require('./schema')

const app = express();

connect();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./views');
let session = require("express-session");
app.use(session({
   secret: 'dkufe8938493j4e08349u',
   resave: false,
   saveUninitialized: true
}));
let mydb;

// 라우터 모듈
const indexRouter = require('./router/indexes');
const usersRouter = require('./router/users');
const commentsRouter = require('./router/comments');
const postsRouter = require('./router/posts');
const recommentsRouter = require('./router/recomments');

// 라우터 연결
app.use('/', indexRouter); // 기본 요청
app.use('/users', usersRouter); // users다큐먼트에 관한 요청
app.use('/comments', commentsRouter); // comments다큐먼트에 관한 요청
app.use('/posts', postsRouter); // posts다큐먼트에 관한 요청
app.use('/recomments', recommentsRouter); // recomments다큐먼트에 관한 요청

// 만일 위 라우터에서 요청이 end되지않으면 실행 -> 라우터 없음
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 에러처리 미들웨어로 점프
});


// 서버 연결
app.listen(8080, function(){
    console.log('8080 포트 대기 중!');
}) 

// app.get('/', async (req, res, next)=>{
//     try {
//         const mongoose = require('mongoose');
//         const User = require('/schema/user');
//         const user = await User.create({
//             user_id: 'idforjaewoo',
//             user_name: 'name',
//             user_stdid: 2019212998,
//             user_phone: '010',
//             user_email: 'gmail',
//             user_pw: 'pwforjaewoo',
//           });
//           console.log(user);
//           //res.status(201).json(user);
//     } catch(err) {
//         console.log(err);
//         next(err);
//     }
// });