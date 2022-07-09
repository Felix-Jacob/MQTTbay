const mqtt = require('mqtt');
const client = mqtt.connect();
const bidTopic = 'bidReq/+/+';

client.on('connect', function () {
  client.subscribe(bidTopic, {qos:2}, (err, granted) => {
    console.log('successfully subscribed to: ', bidTopic);
  });
});

client.on('message', function (topic, message) {
  let articleId = topic.split('/')[1];
  let userId = topic.split('/')[2];
  let bid = message.toString();
  
  if(checkBid(bid)) {
    client.publish(`bidRes/${articleId}/${userId}`, {qos:2}, (err) => {
      if(err) 
        console.log(err);
    });
  } else {
  }
});

function checkBid(bid) {
  return true;
}
