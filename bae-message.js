
var http = require('http');
var crypto = require('crypto');
var url = require('url');

var BaeBaseUrl = 'bcms.api.duapp.com';
var BasePath = '/rest/2.0/bcms/';

//
// php like URL encode
function URLEncode(str) {
  // http://kevin.vanzonneveld.net
  str = (str + '').toString();

  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}


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
    var encoded = URLEncode(basicString);

    var md5 = crypto.createHash('md5');
    md5.update(encoded);
    var sign = md5.digest('hex');
    var body = '';
    for(v in params){
        body += URLEncode(v) + '=' + URLEncode(params[v]) + '&';
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

    function prepareRequest(opts){
        var req = http.request(opts, function(res){
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));

            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        return req;
    };

    this.mail = function (from, to, subject, message){
        var method = 'mail';
        var client_id = opt.key;
        var srvUrl = BasePath + opt.queue;
        var timeStamp = Math.round(+new Date()/ 1000);
        var params = {
            address : to,
            mail_subject : subject,
            method : 'mail',
            client_id : client_id,
            timestamp : timeStamp,
            from: from,
            message : message,
        }
        var reqURL = 'http://' + BaeBaseUrl + srvUrl;
        var body = signRequest('POST', reqURL, params, opt.secret);
        var options = {
            hostname: BaeBaseUrl,
            path: srvUrl,
            method: 'POST',
            headers : {
                "User-Agent" : "bae-message",
                "Content-Length" : body.length,
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        };
        console.log('sending request to ' + reqURL);
        console.log('with body' + body);
        var req = prepareRequest(options);
        req.write(body);
        req.end();
    }
}

module.exports.signRequest = signRequest;
