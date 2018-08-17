const express = require('express')
const bparser = require('body-parser')
const path = require('path')
const jwt = require('jsonwebtoken');
const url = require('url')
const apiResult = require('../utils/apiResult.js')

const app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,auth");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});
app.use(bparser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, '../../')));

const filterList = ['/login']


const users = require('./users.js')

module.exports = {
    start: (_port) => {
        users.register(app);
        
        app.listen(_port || 8080);
    }
}