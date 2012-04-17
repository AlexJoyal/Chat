
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
	var maxMID = parseInt(data.mid, 10);
	//var msgs = getMessages(maxMID);
	db = messages.db('ajoyal');
	db.retrieveMessages(maxMID, function(err, result){
				if (err) {
                       			console.log(err.toString());
                       			console.log('No messages to send');
                 		} else {
					res.send({ 'msgs' : result.rows});
                     		}

		});

	};

// This handler function receives a JSON message from
// the client containing a new message to set. It also
// returns the new message back to the client:
exports.set_msg = function (req, res) {
	// Get the new message:
	var data = req.body;
	storeMessage(data.msg)
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
			});
}

