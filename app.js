const express = require('express');
const app = express();
const message = require('./message.js');
const mustache = require('mustache-express');
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017';
const crypto = require('crypto');
const ENC_KEY = "b265da80b661fa703388887a27c229ff"; // set random encryption key
const IV = "aa624696d5303317"; // set random initialisation vector
const phrase = "Seco";

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

encrypted_key = encrypt(phrase);
decrypted_key = decrypt(encrypted_key);
console.log("Encrypted:", encrypted_key);
console.log("Decrypted:", decrypted_key);

newKey = crypto.randomBytes(16).toString('hex');
newIv = crypto.randomBytes(8).toString('hex');
console.log("newKey:", newKey);
console.log("newIv:", newIv);

//Start mongdb server: mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork

mongoClient.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
    var db = client.db('mydb');
    let cars = db.collection('cars');
    
    //cars.insertOne({name:"Honda", model:"CRV"});
    //cars.deleteOne({model:"CRV"});

    cars.find({}).toArray(function(err, docs) {

     // Print the documents returned
     docs.forEach(function(doc) {
         console.log(doc);
     });

     // Close the DB
     client.close();
     });
});

//import some data from message module.
console.log(message["letters"]);

//Serve public static files.
app.use("/", express.static(__dirname + '/public'));

//Set view engine
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get("/", function(req,res){
    res.render("index");
})

app.listen(3000,function(error){
    if(error == true){
        console.log("some error occured");
    }else{
        console.log("listening on localhost:3000");
    }
})