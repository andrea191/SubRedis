var sensor = require('ds18x20');
var mqtt = require('mqtt')
 
//Discovering sensor on Gateway
console.log(sensor.isDriverLoaded());

var listOfDeviceIds = sensor.list();
console.log(listOfDeviceIds);
var serialTemp = listOfDeviceIds[0];
var logCounter = 0;

var client = mqtt.connect('mqtt://localhost:1883',{
	clean: false,
	clientId: 'rpi-'+serialTemp
});



//Introducing
//client.subscribe('sensor');
client.publish('sensor', 'Hello, I am a new temperature sensor! My serial is: ' + serialTemp + ' and I publish on "sensor/temperature" topic!', {qos:1, retain:true});

//ASYNC FUNCTIONS

//READ MESSAGE ON SUBSCRIBED TOPIC ? 
client.on('message', function(topic, message) {
	console.log(message);
	console.log(message.toString());
});

//ANY x MILLISECONDS FETCH DATA TEMPERATURE FROM SENSOR AND PUBLISH DATA
setInterval(dataMessage, 1000);
function dataMessage() {
	var temperature = sensor.get(serialTemp);
	var timestamp = Date();
	var jsonString = '{ "serial":"'+serialTemp+'", "temperature":'+ temperature +', "unit":"Celsius", "timestamp":"'+timestamp+'", "log":' + logCounter+ '}';
	console.log(jsonString);
	client.publish('sensor/temperature', jsonString , {qos:1, retain:false});
	logCounter++;
}

setInterval(retainMessage, 20000);
function retainMessage() {
	var jsonString = '{ "serial":"'+serialTemp+'", "log":' + logCounter+ '}';
	console.log(jsonString);
	client.publish('sensor/temperature', jsonString , {qos:1, retain:true});
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
