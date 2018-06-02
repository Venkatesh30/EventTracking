'use strict';

self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  var notificationOptions = {
    body: 'Hello everybody!',
    icon: './images/hipstercat.jpg',
    tag: 'simple-push-demo-notification'
  };    

  return self.registration.showNotification('Important message', notificationOptions);
}); 