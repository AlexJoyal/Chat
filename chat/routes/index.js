
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
		var maxMID = parseInt(data.mid, 10);
		//var msgs = getMessages(maxMID);
		db = messages.db('ajoyal');
		db.retrieveMessages(maxMID, function(err, result){
					if (err) {
                        			console.log(err.toString());
                        			console.log('No messages to send');
                     			} else {
						//console.log("retrieved data..sending to client" + JSON.stringify(result.rows));
						res.send({ 'msgs' : result.rows});
                     			}

		});

		/*if (msgs){
			console.log(JSON.stringify(msgs));
			// Send the result:
			res.send({ 'msgs' : JSON.stringify(msgs) });
		}*/
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
			});
}

/*function getMessages(maxMID){
	db = messages.db('ajoyal');
	db.retrieveMessages(maxMID, function(err, result){
					if (err) {
                        			console.log(err.toString());
                        			console.log('No messages to send');
                     			} else {
						console.log("retrieved data..sending to client" + JSON.stringify(result.rows));
						that.dat = result.rows;
                     			}

					});

	console.log("dat: " + JSON.stringify(dat));
	return dat;
}*/
