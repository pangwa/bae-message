
var bae = require('../');
var assert = require('assert');

describe('test Bae-message', function(){
  it('#signRequest', function(){
    var body = bae.signRequest(
      'POST', 'http://bcms.api.duapp.com/rest/2.0/bcms/9569d9de1004fde88458838c19e8a687',
      {
        client_id : '6E820afd87518a475f83e8a279c0d367',
        message : 'HelloWorld',
        method : 'publish',
        timestamp : 1329472104,
      },
      '259eea423dee18c7b865b0777cd657cc'
    );
    assert.equal(body, 'client_id=6E820afd87518a475f83e8a279c0d367&message=HelloWorld&method=publish&timestamp=1329472104&sign=5ff65389cd8f3a2fd822ec0bd434c3d9');
  })
})

