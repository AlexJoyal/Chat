// This function

var maxMID = 0;

//requests new messages from the server, returns 
var get_msg = function () {
	console.log(maxMID);
	var req = $.ajax({
		type: 'POST',
		url : '/get-msg',
		data: { 'mid' : maxMID }
	});
	
	req.done(function (data) {
	    //console.log('received data: ' + data);
  	    
  	    //TO DO
  	    //add messages in data to the display
  	    //console.log(data.msgs[1]);

	    var display = $('#chat');
  	    for (var i in data.msgs){
		//console.log(data.msgs);
  	    	if (data.msgs[i].mid > maxMID){
			maxMID = data.msgs[i].mid;
			//console.log(typeof data.msgs[i].message);
		} 
  	    	display.prepend('<p>' + data.msgs[i].message + '</p>');
  	    }
	});
};

//sends clients latest message to the server
var set_msg = function () {
	var msg = $('#msg').text();
	if (msg.length <= 140){
		var req = $.ajax({
			type: 'POST',
			url : '/set-msg',
			data: { 'msg' : msg }
		});
		req.done(function (data) {
			console.log("msg sent");
		});
	} else {
		var notify = $('#notify');
		notify.html('Message longer than 140 characters, cannot send');
		notify.fadeOut(2000, function () {
			notify.empty();
			notify.show();
			});
	}
	
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
