const mongoose = require('mongoose');
const protocol = "mongodb://";
const port = 27017;
const ip = 'localhost';
const url = protocol+ip+':'+port;

const connect = () => {
    // mongoose.connect(url, (error) => {
    //   if (error) {
    //     console.log('몽고디비 연결 에러', error);
    //   } else {
    //     console.log('몽고디비 연결 성공');
    //   }
    // });

    mongoose.connect(url)
    .then(() => console.log('Successfully connected to mongodb!'))
    .catch(e => console.error(e));
  };

// 몽구스 커넥션에 이벤트 리스너를 달게 해준다. 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도한다.
mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect(); // 연결 재시도
  });

module.exports = connect;