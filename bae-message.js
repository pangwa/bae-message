

var http = require('http');
var crypto = require('crypto');
var queryString = require('querystring');

var md5 = crypto.createHash('md5');
//
// check the sign algorithm at:
// http://developer.baidu.com/wiki/index.php?title=docs/cplat/mq/sign
// method : POST or GET
function signRequest(method, url, params, secret){
    //
    // normalize request method
    method = method.toUpperCase();
    if(!(method === 'POST' || method === 'GET')){
        throw new Error('Request method should either Post or Get and you passed "' + method + '"');
    }
    params = params || {};
    //
    // form the parameters string
    var paramStr = '';
    for(v in params){
        paramStr += v + '=' + params[v];
    }
    var basicString = method + url + paramStr + secret;
    var encoded = queryString.escape(basicString);
    md5.update(encoded);
    var sign = md5.digest('hex');
    var body = '';
    for(v in params){
        body += queryString.escape(v) + '=' + queryString.escape(params[v]) + '&';
    }
    body += 'sign=' + sign; //append the signature
    return body;
}

//
// {
//    apiKey : "", //also the client id
//    secret : "",
// }
module.exports = function(opt){
    opt = opt || {};
}

module.exports.signRequest = signRequest;

