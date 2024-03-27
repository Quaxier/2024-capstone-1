const mongoClient = require('mongodb').MongoClient;
const protocol = "mongodb://";
const port = 27017;
const ip = 'localhost';
const url = protocol+ip+':'+port;

const express=require('express');
const app = express();
//const bodyParser = require('body-parser'); //npm install body-parser 필요!
const { ObjectId } = require('mongodb');
const ObjId = require('mongodb').ObjectId;
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
//app.set('view engine', 'ejs');
//app.set('views','./views');
//let session = require("express-session");
//app.use(session({
//    secret: 'dkufe8938493j4e08349u',
//    resave: false,
//    saveUninitialized: true
//}));
let mydb;

mongoClient.connect(url)
    .then(client => {
        mydb = client.db('Capstone1');
        mydb.collection('users').find().toArray().then(result=>{
            console.log(result);
        })

        app.listen(8080, function(){
            console.log('MongoDB Access success!');
        })       
    })

app.get('/', function(req, res){
    
});