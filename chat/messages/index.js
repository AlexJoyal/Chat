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

    var obj = {};
    obj.conn = 'tcp://' + user + '@' + host + ':' + port + '/' + db;
    obj.getMessages = getMessages;
    obj.storeMessage = storeMessage;
    return obj;
}

function getMessages (maxMID) {
    var that = this;
    pg.connect(that.conn, function (err, client) {
        client.query('select * from messages where mid>' + maxMID + ';',
                     function (err, result) {
                         return result;
                     });
    });

};

function storeMessage(msg){
	var that = this;
    pg.connect(that.conn, function (err, client) {
        var sql = 'insert into messages values(default, $1, $2);';
        client.query(sql, [msg, Date.now()],
                    function (err, result) {
                        console.log(result);
                    });
        });
	}
}

