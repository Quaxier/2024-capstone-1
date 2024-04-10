const express = require('express');
const User = require('../schema/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log('indexes 호출됨!');
    console.log(users);

    res.render('login.ejs');
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
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;