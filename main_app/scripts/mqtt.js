function setupMQTTConnection() {
  let clientId = uuidv4();

  var client = new Paho.MQTT.Client('16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org', 9001, clientId);
  client.onMessageArrived = onMessageArrived;
  client.onConnectionLost = onConnectionLost;
  client.connect({onSuccess:onConnect});

  function onConnect() {
    console.log('connected');
    client.subscribe('register/' + clientId, {onSuccess: function () {
        let registrationMessage = new Paho.MQTT.Message(clientId);
        registrationMessage.destinationName = 'register';
        client.send(registrationMessage);
      }
    });
  }

  function onMessageArrived(message) {
    console.log('message arrived: ', message.payloadString);
  }

  function onConnectionLost(responseObject){
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }
}
