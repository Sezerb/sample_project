const express = require('express');
const app = express();
const message = require('./message.js');
const mustache = require('mustache-express');
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017';

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