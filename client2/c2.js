var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://localhost:1883');
//var client = mqtt.connect('mqtt://test.mosquitto.org');

client.subscribe('presence');
client.subscribe('sensor');
client.subscribe('sensor/temperature');

client.on('message', function(topic, message) {
	console.log('hello')
	if (topic === 'sensor/temperature') {
		console.log('if')
		var object = JSON.parse(message.toString());
		console.log(object);
	} else {
		console.log('else')
		console.log(message.toString());
	};
	
});

console.log('Client started...');