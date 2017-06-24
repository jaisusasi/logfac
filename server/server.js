require('rootpath')();
var express = require('express');
var formidable = require('express-formidable');
var app = express();
app.use(formidable());

var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
//app.use(expressformidable)
// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
/*app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));*/



// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/macaddr', require('./controllers/macaddr.controller'));
app.use('/snumbers', require('./controllers/snum.controller'));
app.use('/firmware', require('./controllers/firmware.controller'));
app.use('/board', require('./controllers/board.controller'));
app.use('/macaddr_serialnumber', require('./controllers/macAddr_sNum.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
