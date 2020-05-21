var mqtt = require('mqtt');
//var client  = mqtt.connect('mqtt://zerow.local.:1883');
var client  = mqtt.connect('mqtt://mqtt.eclipse.org:1883');

var ThunderboardReact = require('node-thunderboard-react');
var thunder = new ThunderboardReact();

client.on('connect', () => {
    client.subscribe('dsei2400/zhiqiang/living-room');
})

//for subscribing; topic and reading are from publish()
client.on('message', (topic, reading) => {
    var read = JSON.parse(reading)
    console.log('received reading %s %s', topic, 'humidity: '+read.humidity)
    console.log('received reading %s %s', topic, 'temperature: '+read.temperature)
    console.log('received reading %s %s', topic, 'uvIndex: '+read.uvIndex)
    console.log('received reading %s %s', topic, 'pressure: '+read.pressure)
    console.log('received reading %s %s', topic, 'light: '+read.light)
    console.log('received reading %s %s', topic, 'sound: '+read.sound)
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              thunder.init((error) => {
  thunder.startDiscovery((device,client) => {
    console.log('- Found ' + device.localName);
    thunder.stopDiscovery();
    device.connect((error) => {
      console.log(' -Connected ' + device.localName);
      setInterval(() => {getEnvironmentalSensing(device)}, 5000)
    });
  });
});

// Get the sensored data
function getEnvironmentalSensing(device) {
  device.getEnvironmentalSensing((error, res) => {
    console.log('---------- Sensored data------------------:');
    client.publish('dsei2400/zhiqiang/living-room', JSON.stringify({
          ...res,
          latitude: '40.6519808',
          longitude: '-74.0163584'
          }))
  });
}