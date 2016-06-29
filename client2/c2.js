var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://localhost:1883');
//var client = mqtt.connect('mqtt://test.mosquitto.org');

client.subscribe('presence');
client.subscribe('sensor');
client.subscribe('sensor/temperature');

client.on('message', function(topic, message) {
	console.log(message);
	console.log(message.toString());
});

console.log('Client started...');