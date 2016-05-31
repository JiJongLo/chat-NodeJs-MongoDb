/**
 * Created by User on 31.05.2016.
 */
var winston = require('winston');
var ENV  = process.env.NODE_ENV;
function getLogger(module){
    var path = module.filename.split('/').slice(-2).join('/');
    return new winston.Logger({
        transport : [
            new winston.transports.Console({
                colorize : true,
                level : ENV == 'development' ? 'debug' : 'error',
                label : path
            })
        ]
    })

}
module.exports = getLogger;