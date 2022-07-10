window.onload = async function() {

    if(checkAccessToken()) {
        buttonAddArticle = document.getElementById('buttonAddArticle');
        buttonAddArticle.addEventListener('click', () => {
            document.location.href = origin + "/addArticle";
        });        

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let clientId = uuidv4();

        var client = new Paho.MQTT.Client('16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org', 9001, clientId);
        client.onMessageArrived = onMessageArrived;
        client.onConnectionLost = onConnectionLost;
        client.connect({onSuccess:onConnect});

        function onConnect() {
          console.log('connected');
          let registrationMessage = new Paho.MQTT.Message(clientId);
          registrationMessage.destinationName = 'register';
          client.send(registrationMessage);
        }

        function onMessageArrived(message) {
          console.log('message arrived: ', message.payloadString);
        }

        function onConnectionLost(responseObject){
          if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:"+responseObject.errorMessage);
          }
        }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    else {
        document.location.href = origin + "/login";
    }
};
