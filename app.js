const express = require('express');
const app = express();
const message = require('./message.js');
const mustache = require('mustache-express');
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const url = 'mongodb://127.0.0.1:27017/foo'

//connect to a mongo db.
// mongoClient.connect(url, function(error,db){
//     if(error){
//         console.log(error)
//     }else{
//         let animals = db.collection('animals');
//         animals.insert([{name:"pal",type:"terrier"}]);
//         animals.find({}).toArray(function(err,result){
//             console.log(JSON.stringify(results));
//         })
//         db.close();
//     }
// })

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