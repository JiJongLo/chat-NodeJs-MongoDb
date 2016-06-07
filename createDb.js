var mongoose = require('libs/mongoose');
var async = require('async');
function open(callback) {
    mongoose.connection.on('open', callback)
}
function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback)
}

function requireModules(callback) {
    require('models/users');
    async.each(Object.keys(mongoose.models), (modelName, callback)=> {
        mongoose.models[modelName].ensureIndexed(callback)
    }, callback)
}
function createUsers(callback) {
    var users = [
        {username: 'Vasya', password: 'supervasya'},
        {username: 'Petya', password: 'superpetya'},
        {username: 'admin', password: 'superadmin'}
    ];
    async.each(users, (userData, callback)=> {
        var user = new User(userData);
        user.save(callback);
    }, callback)
}
function close(callback) {
    mongoose.disconnect(callback);
}

async.series([
    open,
    dropDatabase,
    requireModules,
    createUsers,
    close
], (err)=> {
    if (err) throw err
});

// var user = new User({
//     username: 'Gosha1',
//     password  : "secret"
// });
//
// user.save((err, user, affected)=>{
//     if(err) throw err;
//     User.findOne({username: 'Gosha'}, (err, tester)=>{
//         console.log(tester)
//     } )
// });