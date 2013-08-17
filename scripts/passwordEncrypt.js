var password = 'pass';
var key = '';

password =formatPlaintext(password);
key = getRandomBytes(12);

var res = rijndaelEncrypt(password,key,"CBC");

console.log(res);