// This function

var maxMID = 0;
var display = $('#chat');

//requests new messages from the server, returns 
var get_msg = function () {
	var req = $.ajax({
		type: 'GET',
		url : '/get-msg',
		mid : maxMID
	});
	
	req.done(function (data) {
		//console.log('received data: ' + data.msg);
  	    
  	    //TO DO
  	    //add messages in data to the display
  	    for (var i in data.rows){
  	    	if (data.rows[i].mid > maxMID){
			maxMID = data.rows[i].mid;
		} 
  	    	display.prepend("<p>" + data.rows[i].message + "</p>")  
  	    }
		//$('#display').text(messages);
	});
};

//sends clients latest message to the server
var set_msg = function () {
	var msg = $('#msg').text();
	var req = $.ajax({
		type: 'POST',
		url : '/set-msg',
		data: { 'msg' : msg }
	});
	
	req.done(function (data) {
		console.log("msg sent");
		/*var notify = $('#notify');
		notify.html('Message "' + data.msg + '" Received');
		
		//$('#display').text(messages);
		notify.fadeOut(function () {
			notify.empty();
			notify.show();*/
		});
} 

var interval_id;

var start_polling = function () {
	interval_id = setInterval(get_msg, 3000);
};

var stop_polling = function () {
	if (interval_id) {
		clearInterval(interval_id);
	}
};

$(function () {
	get_msg();
	start_polling();
	
	$('#send').bind('click', function (event) {
		set_msg();
	});
});
