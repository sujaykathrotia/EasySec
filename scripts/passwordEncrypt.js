var password = 'pass';
password = doEncryption("encrypted: "+password);
console.log(password);
password = doDecryption(password);
console.log("Decrypted: "+password);

function toHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

function doEncryption(passwordPlainText)
{
  var pt, key;
  blockSizeInBits=128;
  keySizeInBits =128;
 
  key = 'E8E9EAEBEDEEEFF0F2F3F4F5F7F8F9FA';
     
  pt = hex2s(toHex(passwordPlainText));
  key = hex2s(key);
  var passwordEnc = byteArrayToHex(rijndaelEncrypt(pt, key, "ECB"));

  return passwordEnc;
}

function doDecryption(passwordEnc) {
  var ct, key;
  var theForm = document.forms[0];
  blockSizeInBits=128;
  keySizeInBits = 128;
  
  
  key = 'E8E9EAEBEDEEEFF0F2F3F4F5F7F8F9FA';

  ct = hex2s(toHex(passwordEnc));
  key = hex2s(key);
  var passwordPlainText = byteArrayToHex(rijndaelDecrypt(ct, key, "ECB"));

  return passwordPlainText;
}
