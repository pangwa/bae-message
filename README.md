bae-message
===========

Message module for Bae Cloud Messaging.

Example
------
###
    // load Bae module
    var BaeMessage = require('bae-message');
    // initialize BaeMessage with key/secret/queue
    // You can find your key/secret at: [BAE Page](http://developer.baidu.com/bae/ref/key/)
    var bae = new BaeMessage({
      key : 'your key',
      secret : 'your secret',
      queue: 'queue ID'
    });
    
    bae.mail('fromAddress', 'to', 'subject', 'mail body');
    
Known Issue
---
 * Can't set from address
 * Can't send mail to multiple addresses
 * 

TODO
---
 * Support other BAE Cloud services
