var sensor = require('ds18x20');

var sensor1;

console.log(sensor.isDriverLoaded());

var listOfDeviceIds = sensor.list();
console.log(listOfDeviceIds);

sensor1 = listOfDeviceIds[0];


setTimeout(cb, 2000);

function cb() {
	console.log(sensor.get(sensor1));	
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