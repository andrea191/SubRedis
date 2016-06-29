var sensor = require('ds18x20');

sensor.isDriverLoaded(function(err, isLoaded){
	if (err) {
		console.log('somenthing went wrong loading the driver:', err);
	};
	console.log(isLoaded);
});

sensor.list(function(err, listOfDeviceIds){
	console.log(listOfDeviceIds);
});


sensor.getAll(function(err, tempObj){
	console.log(tempObj);
});
