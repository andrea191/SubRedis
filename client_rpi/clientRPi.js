var sensor = require('ds18x20');
var mqtt = require('mqtt')
 
var client = mqtt.connect('mqtt://localhost:1883');

//Discovering sensor on Gateway
console.log(sensor.isDriverLoaded());

var listOfDeviceIds = sensor.list();
console.log(listOfDeviceIds);
var serialTemp = listOfDeviceIds[0];

//Introducing
client.subscribe('sensor');
client.publish('sensor', 'Hello, I am a new temperature sensor! My serial is: ' + serialTemp + ' and I publish on "sensor/temperature" topic!', [0, false]);

//ASYNC FUNCTIONS

//READ MESSAGE ON SUBSCRIBED TOPIC ? 
client.on('message', function(topic, message) {
	console.log(message);
	console.log(message.toString());
});

//ANY x MILLISECONDS FETCH DATA TEMPERATURE FROM SENSOR AND PUBLISH DATA
setInterval(cb, 2000);
function cb() {
	var temp = sensor.get(serialTemp)+" - " + Date();
	client.publish('sensor/temperature', temp , [0, false]);
	console.log(temp);
}







//ASYNC
/*
sensor.isDriverLoaded(function(err, isLoaded){
	if (err) {
		console.log('somenthing went wrong loading the driver:', err);
	};
	console.log(isLoaded);
});

sensor.list(function(err, listOfDeviceIds){
	sensor1 = listOfDeviceIds[0];
	console.log(listOfDeviceIds);
	console.log(sensor1);
});


sensor.getAll(function(err, tempObj){
	console.log(tempObj);
});

sensor.get('28-000006afa537', function(err, temp){
	if (err) {
		console.log('something happened:', err);
	} else {
		console.log('sensor temperature:', temp);	
	}
	
});

*/
