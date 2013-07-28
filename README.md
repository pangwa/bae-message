bae-message [![Build Status](https://travis-ci.org/pangwa/bae-message.png)](https://travis-ci.org/pangwa/bae-message)
===========

Message module for Bae Cloud Messaging.

中文用户请访问[中文官方网站](http://pangwa.github.io/bae-message/)

Example
------
```js
    // load Bae module
    var BaeMessage = require('bae-message');
    // initialize BaeMessage with key/secret/queue
    // You can find your key/secret at: [BAE Page](http://developer.baidu.com/bae/ref/key/)
    var bae = new BaeMessage({
      key : 'your key',
      secret : 'your secret',
      queue: 'queue ID'
    });
    
    // 
    // also support multiple to addresses
    // bae.mail('fromAddress', ['toaddress1', 'toaddress2'], 'subject', 'mail body');
    bae.mail('fromAddress', 'to', 'subject', 'mail body');
```
    
Known Issue
---
 * Can't set from address

TODO
---
 * Support other BAE Cloud services
