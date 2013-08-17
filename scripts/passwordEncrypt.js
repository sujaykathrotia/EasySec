//get all password fields

var passwordFields = [];

$(function(){
    /* Hide form input values on focus*/ 
    $('input:password').each(function(){
        passwordFields.push($(this));
        var txtval = $(this).val();
        $(this).focus(function(){
            if($(this).val().length > 0){
                $(this).val(doDecryption($(this).val()));
            }
        });
        $(this).blur(function(){
            if($(this).val().length > 0){
                $(this).val(doEncryption($(this).val()));
            }
        });
    });
    
    $('input:submit').each(function(){
        $(this).submit(function(){
            for(var i=0;i<passwordFields.length;i++){
                passwordFields[i].value = doDecryption(passwordFields[i].value);
            }
            
            $(this).submit();
            
        });
    });
});



function toHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
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

  ct = hex2s(passwordEnc);
  key = hex2s(key);
  var passwordPlainText = hex2a(byteArrayToHex(rijndaelDecrypt(ct, key, "ECB")));

  return passwordPlainText;
}
