var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://localhost:1883',{
	clean: false,
	clientId: 'client-mac'
});
//var client = mqtt.connect('mqtt://test.mosquitto.org');

//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mqttc2');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Ok, the database is connected!');
})  

var c2Schema = mongoose.Schema({
	serial: String,
	temperature: Number,
	unit: String,
	timestamp: String,
	log: Number

});
var c2Mongo = mongoose.model('c2Mongo', c2Schema);

//client.subscribe('sensor', {qos:0});
//client.subscribe('$SYS/broker-polimi/new/clients');
//client.subscribe('$SYS/broker-polimi/disconnect/clients');
client.subscribe('sensor/temperature/*', {qos: 1}, function(err, granted){
	if (err) {
		console.log('something bad is happened',err);
	} else{
		console.log('nice',granted);
	};
});
var clientName
client.on('message', function(topic, message) {
	
	
	switch (topic):
		case 'sensor/temperature/new':
			//do something

		case 'sensor/temperature/'
	if (topic === 'sensor/temperature') {
		var object = JSON.parse(message.toString());
		console.log(object);
		c2Mongo.create(
			{
				serial: object['serial'],
				temperature: object['temperature'],
				unit: object['unit'],
				timestamp: object['timestamp'],
				log: object['log']
			},
			function(err, data){
				if (err) {
					throw err;
				}
				//console.log(data);
			});
	} else {
		console.log(message.toString());
	};
	
});

console.log('Client started...');