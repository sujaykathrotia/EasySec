//get all password fields
$(function(){
    /* Hide form input values on focus*/ 
    $('input:password').each(function(){
        $(this).attr("easysec-enc", "decrypted");
        var txtval = $(this).val();
        $(this).focus(function(){
            if($(this).val().length > 0 && $(this).attr("easysec-enc") == "encrypted"){
                $(this).val(doDecryption($(this).val()));
                $(this).attr("easysec-enc", "decrypted");
            }
        });
        $(this).blur(function(){
            if($(this).val().length > 0 && $(this).attr("easysec-enc") == "decrypted") {
                $(this).val(doEncryption($(this).val()));
                $(this).attr("easysec-enc", "encrypted");
            }
        });
    });
    
    $('form').each(function(){
        $(this).submit(function(){
            $('input:password').each(function(){
                 if($(this).attr("easysec-enc") == "decrypted"){
                     
                 }else{
					console.log(doDecryption($(this).val()));
					$(this).val(doDecryption($(this).val()));
                 }
            });
            
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
