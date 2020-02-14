const express = require('express');
const app = express();
const message = require('./message.js');
const mustache = require('mustache-express');
const mongo = require('mongodb').MongoClient;
const mongoClient = require('mongodb').MongoClient; //Start mongdb server: mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
let ObjectId = require('mongodb').ObjectID;
const cryptoUtils = require('./cryptoUtils.js');
const bodyParser = require('body-parser');

const url = 'mongodb://heroku_2cx9hhj1:qma4v4i0o9b8bs21cgm2i14bpd@ds045795.mlab.com:45795/heroku_2cx9hhj1' || 'mongodb://127.0.0.1:27017';
const port = process.env.PORT || 3000;

//Simple module example
cryptoUtils.test_aes_cbc('Seco');

//Another simple module example
console.log(message["letters"]);

//Serve public static files.
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Set view engine
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get("/", function(req,res){
    res.render("index");
})

//Restful Routes
app.get("/cars", function(req,res){
    mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
        var db = client.db('mydb');
        let cars = db.collection('cars');
        
        //cars.insertOne({name:"Honda", model:"CRV"});
        //cars.deleteOne({model:"CRV"});
    
        cars.find({}).toArray(function(err, results) {
         res.send(JSON.stringify(results));

        // Print the results returned
         results.forEach(function(result) {
             console.log(result);
         });
    
         // Close connection to DB
         //client.close();
         });
    });
})

app.post("/cars/new", function(req,res){
    mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
        if(!error){
            var db = client.db('mydb');
            let cars = db.collection('cars');

            cars.insertOne({
                name: req.body.name, 
                model: req.body.model
            });
    
            res.redirect('/');
        }
        else{
            res.status(400).json({ success: 0});
        }
    });
});

app.put("/cars/update/:id",function(req,res){
    mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
        if(!error){
            var db = client.db('mydb');
            let cars = db.collection('cars');

            cars.update({
                _id: new ObjectId(req.params.id)
            }, {$set: {
                name: req.body.name,
                model: req.body.model
            }});
            
            res.status(200).json({ success: 1});
        }
        else{
            res.status(400).json({ success: 0});    
        }
        
    })
})

app.delete("/cars/delete/:id",function(req,res){
    mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
        if(!error){
            var db = client.db('mydb');
            let cars = db.collection('cars');

            cars.deleteOne({
                _id: new ObjectId(req.params.id)
            })
            
            res.status(200).json({ success: 1});
        }
        else{
            res.status(400).json({ success: 0});
        }
    })
})

app.listen(port,function(error){
    if(error == true){
        console.log("some error occured");
    }else{
        console.log("listening on localhost:3000");
    }
})