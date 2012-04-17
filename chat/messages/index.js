var pg = require('pg');

// Configuration.
var host = 'db-edlab.cs.umass.edu';
var port = 7391;

// The postgres client.
var client;

exports.db = function (user, db) {
	if (!db) {
		db = user;
	}

   	obj = {};
	obj.conn = 'tcp://' + user + '@' + host + ':' + port + '/' + db;
	obj.retrieveMessages = retrieveMessages;
	obj.addMessage = addMessage;
	return obj;
}

function retrieveMessages (maxMID, cb) {
	var that = this;
	pg.connect(that.conn, function (err, client) {
	client.query('select * from messages where mid >' + maxMID + ';',
                     function (err, result) {
                         cb(err, result);
                     });
    });
};

function addMessage(msg, cb){
	var that = this;
    	pg.connect(that.conn, function (err, client) {
        var sql = 'insert into messages values(default, $1, now());';
        client.query(sql, [msg],
                    function (err, result) {
                        cb(err, result);
                    });
        });
}

