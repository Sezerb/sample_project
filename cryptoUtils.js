const crypto = require('crypto');
const ENC_KEY = "b265da80b661fa703388887a27c229ff"; // set random encryption key
const IV = "aa624696d5303317"; // set random initialisation vector

var encrypt = ((val) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  });

var decrypt = ((encrypted) => {
    let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
});

module.exports = {
    test_aes_cbc : function test_aes_cbc(phrase){
        encrypted_key = encrypt(phrase);
        decrypted_key = decrypt(encrypted_key);
        console.log("Encrypted:", encrypted_key);
        console.log("Decrypted:", decrypted_key);
        
        newKey = crypto.randomBytes(16).toString('hex');
        newIv = crypto.randomBytes(8).toString('hex');
        console.log("newKey:", newKey);
        console.log("newIv:", newIv);
    }
}

