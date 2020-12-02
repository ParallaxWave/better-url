const express = require("express");
const app = express();
const db = require('quick.db');
app.use(express.static("public"));
//var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
//db.set('test', {test: 'yes'});
//app.get("/", (request, response) => {
 // response.sendFile(__dirname + "/views/index.html");
//});
app.post('/setCode/:url', (request,response) => {
    console.log("Request to set code received!");
    let codeExists = true;
    let code;
    while(codeExists){ 
      code = Math.floor(Math.random() * (100000000 - 10000000)) + 10000000;
      if(db.has('code_' + code)){ 
        continue;
      }
      else{ 
        codeExists = false;
        break;
      }  
    }
    //let code = Math.floor(Math.random() * (100000000 - 10000000)) + 10000000;
    let temp = new Buffer(request.params.url, 'base64')
    let decoded_url = temp.toString();
    console.log(decoded_url);
    db.set("code_" + code, {url: decoded_url , key: code});
    let msg = "Code for " + request.params.url;
    response.json({
      status: msg,
      code: db.get("code_" + code).key
    });
    console.log(db.get("code_" + code));
});
let url = 'https://youtube.com';
app.get('/hi', (request, response) => {
  response.send(`<meta http-equiv='refresh' content='0; url="${url}\"' />`);
});

app.get('/:code', (request, response) => {
  console.log(request.params.code);
  console.log("Querying db...");
  let redirect = "http://" + db.get("code_" + request.params.code).url;
  console.log("Redirecting to " +redirect);
  //let redirect = db.get("code_" + request.params.code).url;
  response.send(`<meta http-equiv='refresh' content='0; url="${redirect}\"' />`);
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
