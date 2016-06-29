var sensor = require('ds18x20');

sensor.isDriverLoaded(function(err, isLoaded){
	console.log(isLoaded);
});