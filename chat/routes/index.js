
/*
 * GET home page.
 */
var msg = 'No new messages';

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.chat = function(req, res){



	res.render('chat', {title: "Chat"});
}
var prevmsg;
// This handler function sends a JSON message containing
// "the message" back to the client:
exports.get_msg = function (req, res) {
		// Set the content type:
		res.contentType('application/json');
		var data = req.body;
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

