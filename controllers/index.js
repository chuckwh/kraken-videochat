'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'videochat' };
        
        res.render('index', model);
        
    });

};
