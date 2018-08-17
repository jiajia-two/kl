const db = require('../db/dbhelper.js')
const apiResult = require('../utils/apiResult.js')
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    register: (app) => {
        app.post('/login', async (req, res) => {
            let data = {
                name: req.body.username,
                password: req.body.pwd
            }
            try{
                let result = await db.mongodb.select('users', data);
                let secret = 'dktoken';
                let token;
                if(result.length > 0) {
                    let token = jwt.sign({name: req.body.username}, secret, {
                        'expiresIn': 60*60*24 // 设置过期时间, 24 小时
                    }) 
                    res.send(apiResult(result.length > 0, token, req.body.username));
                } else {
                    res.send(apiResult(false));
                }         
            } catch(error){
                console.log(error)
                res.send(apiResult(false, error));
            }
        })
        app.post('/register', async (req, res) => {
            let data = {
                name: req.body.username,
                password: req.body.pwd
            }
            let dataset = await db.mongodb.select('users', {name: req.body.username});
            if(dataset.length > 0){
                res.send(apiResult(false, req, 'user exists'));
            } else {
                let result = await db.mongodb.insert('users', data);
                res.send(apiResult(true));
            }
        })
        app.post('/detail',async (req, res) =>{
            let dataset = await db.mongodb.select('dd', {"_id":ObjectID(req.body.id)})
            res.send(dataset);
        })
       
        app.post('/index',async (req, res) =>{
            let dataset = await db.mongodb.select('index','kl')
            res.send(dataset);
        })
        app.post('/wri_car',async (req,res) =>{
            var data={
                title:req.body.title,
                imgurl:req.body.imgurl,
                _id:req.body._id,
                nowPrice:req.body.nowPrice,
                qty:req.body.qty,
                taxation2:req.body.taxation2,
                username:req.body.username,
                oldPrice:req.body.oldPrice
            }
            let dataset = await db.mongodb.select('car', {_id:req.body._id,});
            if(dataset.length>0){
                let qq = dataset[0].qty*1+data.qty*1
                dataset[0].qty=qq
                data = await db.mongodb.update('car', {_id:req.body._id,},dataset[0]);
            }else{
                data = await db.mongodb.insert('car',data)
            }
            res.send(data);
        })
        app.post('/goods', async(req, res) => {
            let params = {
                pageNum: req.body.pageNum*1 || 1,
                qty: req.body.qty*1 || 28,
                sorting: req.body.sorting,
                keyWord: req.body.keyWord
            }
            let dataset = await db.mongodb.select('dd');
            if(params.sorting == 'up'){
                function sortiing(a,b){
                    return a.nowPrice - b.nowPrice;
                }
                dataset = dataset.sort(sortiing);
            }
            if(params.sorting == 'down'){
                function sortiing(b,a){
                    return a.nowPrice - b.nowPrice;
                }
                dataset = dataset.sort(sortiing);
            }
            if(params.keyWord){
                let resArr = [];
                dataset.map(function(item){
                    let title = item.title;
                    if(title.indexOf(`${params.keyWord}`) > -1){
                        resArr.push(item);
                    }
                    
               })
                dataset = resArr;
            }

            let data = dataset.slice((params.pageNum-1)*params.qty,params.pageNum*params.qty);
            let pageInfo = {
                total: dataset.length,
                pageNum: params.pageNum,
                qty: params.qty
            };
            res.send(apiResult(true, data, pageInfo));
        })


        app.post('/car', async(req, res) => {
            let dataset = await db.mongodb.select('car', {username: req.body.username});
            res.send(dataset);
        })
        app.post('/deleteCarData', async(req, res) => {
            let dataset = await db.mongodb.select('car', {username: req.body.username, title: req.body.title});
            if(dataset.length>0){
                let data = await db.mongodb.delete('car',{username: req.body.username, title: req.body.title});
            }
            result = await db.mongodb.select('car', {username:  req.body.username});
            res.send(result);
        })
        app.post('/clearCarData', async(req, res) => {
            let dataset = await db.mongodb.select('car', {username:  req.body.username});
            if(dataset.length>0){
                for(let i = 0; i < dataset.length; i++){
                    let result = await db.mongodb.delete('car', dataset[i]);
                }   
            }
            let data = await db.mongodb.select('car', {username:  req.body.username});
            res.send(data);
        })
        app.post('/update',async(req,res)=>{
            let dataset = await db.mongodb.select('car', {username: req.body.username, title: req.body.title});
            if(dataset.length>0){
                dataset[0].qty=req.body.qty
                let data = await db.mongodb.update('car', {title:req.body.title},dataset[0]);
            }
            result = await db.mongodb.select('car', {username: req.body.username});
            res.send(result);
        })
      
    }

}

