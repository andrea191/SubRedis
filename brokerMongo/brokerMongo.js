var mosca = require('mosca')
 
var pubsubsettings = {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'myCollections',
    mongo: {}
};

var settings = {
  port: 1883,
  backend: pubsubsettings,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }
};
 
var server = new mosca.Server(settings, function() {
  console.log('Mosca server is up and running')
});
 
server.published = function(packet, client) {
  console.log('packet', packet);/*
  if (packet.topic.indexOf('echo') === 0) {
    return cb();*/
  }
 
server.on('clientConnected', function(client){
  console.log('Client Connected:', client.id)
});

server.on('clientDisconnected', function(client){
  console.log('Client Disconnected:', client.id)
});

/*
  var newPacket = {
    topic: 'echo/' + packet.topic,
    payload: packet.payload,
    retain: packet.retain,
    qos: packet.qos
  };
 
  console.log('newPacket', newPacket);
  
  server.publish(newPacket, cb);
}
*/