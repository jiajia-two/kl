const mongodb = require('mongodb');
const mc = mongodb.MongoClient;
var db;
mc.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (_error, _db) => {
    db = _db.db('kl');
});

module.exports = {
    select(_collection, _condition = {}){
        return new Promise((resolve, reject) => {
            db.collection(_collection).find(_condition).toArray().then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error);
            })
        })
    },
    insert(_collection, _data){
        return new Promise((resolve, reject) => {
            db.collection(_collection).insert(_data).then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error);
            })
        })
    },
    update(_collection, _condition, _data){
        return new Promise((resolve, reject) => {
            db.collection(_collection).update(_condition, _data).then((res) => {
                resolve(res)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    delete(_collection,_data){
        console.log(_collection);
        return new Promise((resolve,reject)=>{
            db.collection(_collection).remove(_data).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            })
        })
    }

}