
/*
 * GET home page.
 */
var msg = 'No new messages';
var messages = require('messages');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.chat = function(req, res){



	res.render('chat', {title: "Chat"});
}

// This handler function sends a JSON message containing
// "the message" back to the client:
exports.get_msg = function (req, res) {
		// Set the content type:
		res.contentType('application/json');
		var data = req.body;
		console.log()
		var msgs = getMessages(data.mid);
		//console.log('get: ' + msg);

		// Send the result:
		res.send({ 'msgs' : msgs });
	};

// This handler function receives a JSON message from
// the client containing a new message to set. It also
// returns the new message back to the client:
exports.set_msg = function (req, res) {
		// Get the new message:
		var data = req.body;
		storeMessage(data.msg)
		console.log('stored message: ' + data.msg);

		// Send the new message:
		//res.contentType('application/json');
		//res.send({ 'msg' : msg });	
	};

function storeMessage(msg){
	db = messages.db('ajoyal');
	db.addMessage(msg, function(err, result){
									if (err) {
                         				console.log(err.toString());
                         				console.log('Could not add msg!');
                     				} else {
                         				console.log('Added message ' + msg);
                     				}
                    			 	process.exit(0);
							});
}

function getMessages(maxMID){
	db = messages.db('ajoyal');
	var data; 
	db.retrieveMessages(maxMID, function(err, result){
						data = result.rows;
					});
	return data;
}
