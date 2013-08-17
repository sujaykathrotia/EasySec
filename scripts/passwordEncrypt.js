AES_Init();

var block = "hello world";

var key = new Array(32);
for(var i = 0; i < 32; i++)
  key[i] = i;

AES_ExpandKey(key);
AES_Encrypt(block, key);

console.log(block);

AES_Done();