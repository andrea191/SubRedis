var mosca = require('mosca')
 
var pubsubSettings = {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'myCollections',
    mongo: {}
};

var persistenceSettings = {
  factory: mosca.persistence.Mongo,
  url: 'mongodb://localhost:27017/mqtt'
}

var settings = {
  id: 'broker-polimi',
  port: 1883,
  backend: pubsubSettings,
  persistence: persistenceSettings
};
 
var server = new mosca.Server(settings, function() {
  console.log('Mosca server is up and running')
});
 
server.on('published',function(packet, client) {
  //console.log('packet', packet)
  console.log('## -- NEW PACKET -- ##');
  console.log('topic', packet['topic']);
  console.log('payload', JSONparse(packet['payload'].toString()));
  console.log('qos', packet['qos']);
  console.log('retain', packet['retain']);
  console.log('######################');
  console.log('');
  /*
  if (packet.topic.indexOf('echo') === 0) {
    return cb();*/
  });
 
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