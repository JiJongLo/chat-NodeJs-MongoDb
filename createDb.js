var mongoose = require('libs/mongoose');
var async = require('async');
function open(callback) {
    mongoose.connection.on('open', callback)
}
function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback)
}

function requireModels(callback) {
    require('models/users');
    async.each(Object.keys(mongoose.models), (modelName, callback)=> {
        mongoose.models[modelName].ensureIndexes(callback)
    }, callback)
}
function createUsers(callback) {
    var users = [
        {username: 'Vasya', password: 'supervasya'},
        {username: 'Petya', password: 'superpetya'},
        {username: 'admin', password: 'superadmin'}
    ];
    async.each(users, (userData, callback)=> {
        var user = mongoose.models.User(userData);
        user.save(callback);
    }, callback)
}
function close(callback) {
    mongoose.disconnect(callback);
}

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], (err)=> {
    if (err) throw err;
    close();
    process.exit(err ? 255 : 0);
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