const express = require('express');
const app = express();
const message = require('./message.js');
const mustache = require('mustache-express');
let all_letters;

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

// app.get("/", function(request,response){
//     for(let i=0; i<message["letters"].length; i++){
//         all_letters += message["letters"][i] + "<br/>";
//     }
//     response.send(all_letters);
//     //response.send("<h1 style='text-align:center'>Hey Friends, welcome to my app</h1>");
// })

// app.get("/users/:name", function(req, res){
//     //res.send(req.params.name);
//     res.send(req["params"]["name"]);
// })

app.listen(3000,function(error){
    if(error == true){
        console.log("some error occured");
    }else{
        console.log("listening on localhost:3000");
    }
})