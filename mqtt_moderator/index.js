const mqtt = require('mqtt');
const client = mqtt.connect();
const bidTopic = 'bidReq/+/+';
const registerTopic = 'register';
const unregisterTopic = 'unregister';
var registeredUsers = [];

client.on('connect', function () {
  client.subscribe(bidTopic, {qos:2}, (err, granted) => {
    console.log('successfully subscribed to: ', bidTopic);
  });
  client.subscribe(registerTopic, {qos:2}, (err, granted) => {
    console.log('successfully subscribed to: ', registerTopic);
  });
  client.subscribe(unregisterTopic, {qos:2}, (err, granted) => {
    console.log('successfully subscribed to: ', unregisterTopic);
  });
});

client.on('message', function (topic, message) {
  let rootTopic = topic.split('/')[0];

  if (rootTopic == 'register') {
    processRegistrationMessage(message);
  }
  else {
    if(rootTopic == 'unregister') {
      processUnregistrationMessage(message);
    }
    else {
      if(rootTopic == 'bidReq') {
        let articleId = topic.split('/')[1]; 
        let userId = topic.split('/')[2];
        processBidMessage(message, articleId, userId);
      }
    }
  }
});

function checkBid(bid) {
  return true;
}

function processBidMessage(message, articleId, userId) {
  let bid = message.toString();
  if(checkBid(bid)) {
    client.publish(`bidRes/${articleId}/${userId}`, 'success',  {qos:2}, (err) => {
      if(err) 
        console.log(err);
    });
  } else {
    client.publish(`bidRes/${articleId}/${userId}`, 'error',  {qos:2}, (err) => {});
  }
}

function processRegistrationMessage(message) {
  registeredUsers.push(message.toString());
  console.log(registeredUsers);
  client.publish(`register/${message}`, 'success',  {qos:2}, (err) => {});
}

function processUnregistrationMessage(message) {
  registeredUsers.find((userId, index) => {
    if(userId == message) {
      registeredUsers.splice(index, 1);
      return true; 
    }
  });
  console.log(registeredUsers);
}
