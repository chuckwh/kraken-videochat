'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {

		 var model = { name: 'test'};

	res.render('index', model);
});

};


