var mqtt = require('mqtt')
 
var client = mqtt.connect('mqtt://localhost:1883');
 
console.log(client);
//client.subscribe('presence');

console.log('Client publishing.. ');


client.publish('presence', 'Client 1 is alive.. Test Ping! ' + Date(), [0, false]);
 
client.end();