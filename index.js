var express = require('express'),
app = express(),
mongoose = require('mongoose'),
Schema = mongoose.Schema,
port = process.env.PORT || 5000,
v1 = require('./routes/v1');
global.tempreq = 123;
global.tempres = 123;
var getcache = require('./lib/getcache');
var setcache = require('./lib/setcache');
app.use(express.urlencoded())
app.use(express.json())
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/rometheosdb',{ useNewUrlParser: true ,useUnifiedTopology: true});

function checkget(fn) {

    return function(req, res, next) {
        if ( req.method!=="GET") {
            next();
        } else {
            fn(req, res, next);
        }
    }
}

function checknotget(fn) {

    return function(req, res, next) {
        if ( req.method==="GET") {
            next();
        } else {
            fn(req, res, next);
        }
    }
}

app.use(checkget(getcache));
app.use(checknotget(setcache));
app.use('/v1', v1);

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({
        "errors": [
            {
                "code": "2102",
                "description": "Request not found"
            }
        ]
    });
  
});
// process.on('uncaughtException', (err, req, res) => {
//     if(tempres!=123)
//     {
//        tempres.setHeader('Content-Type', 'application/json');
//       tempres.status(404).send({
//           "errors": [
//               {
//                   "code": "503",
//                   "description": "Something went wrong!"
//               }
//           ]
//       });
//     }
  
// })

var server = app.listen(port,()=>{
    console.log(`Server is up on port:  ${port}`);
});


module.exports = server;