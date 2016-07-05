//Single Temperature sensor, fixed type
var sensor = require('ds18x20');
var mqtt = require('mqtt')
 
//Discovering sensor on Gateway
console.log(sensor.isDriverLoaded());

var listOfDeviceIds = sensor.list();
console.log(listOfDeviceIds);
var serialTemp = listOfDeviceIds[0];
var logCounter = 0;

var clientName = 'rpi-CLC';//+serialTemp;

var client = mqtt.connect('mqtt://localhost:1883',{
	clean: false,  //restore the session and in theory, it should receive the message for the qos1 subscribed topic
	clientId: clientName,
	will: {
		topic: 'sensor/temperature/'+clientName+'/status',
		payload: 'offline',
		qos: 1,
		retain: true
	}
});


//Introducing
client.publish('sensor/temperature/new', clientName);
client.publish('sensor/temperature/'+clientName+'/status', 'online', {qos:1, retain:true});



//ASYNC FUNCTIONS

//READ MESSAGE ON SUBSCRIBED TOPIC ? 
client.subscribe('sensor/temperature'+clientName);
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
	//console.log(jsonString);
	client.publish('sensor/temperature/'+clientName, jsonString , {qos:1, retain:false});
	logCounter++;
}

setInterval(retainMessage, 20000);
function retainMessage() {
	var jsonString = '{ "serial":"'+serialTemp+'", "log":' + logCounter+ '}';
	//console.log(jsonString);
	client.publish('sensor/temperature/'+clientName, jsonString , {qos:1, retain:true});
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
