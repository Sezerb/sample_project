const express = require('express');
const app = express();
const message = require('./message.js');
let all_letters;

console.log(message["letters"]);


app.get("/", function(request,response){
    for(let i=0; i<message["letters"].length; i++){
        all_letters += message["letters"][i] + "<br/>";
    }
    response.send(all_letters);
    //response.send("<h1 style='text-align:center'>Hey Friends, welcome to my app</h1>");
})

app.listen(3000,function(error){
    if(error == true){
        console.log("some error occured");
    }else{
        console.log("listening on localhost:3000");
    }
})