
        
function getcars(){
    fetch("/cars").then(function(res){
        res.json().then(function(data){
            data.forEach(function(car){
                let carhtml = document.createElement("li");
                let deletebutton= document.createElement('button');
                let updatebutton= document.createElement('button');
                deletebutton.innerHTML = "delete this car";
                updatebutton.innerHTML = "update this car"
            
                updatebutton.addEventListener('click',function(){
                    updatecar(car._id,car.name,car.model);
                    console.log(car._id, car.name, car.model);
                })

                deletebutton.addEventListener('click',function(){
                    deletecar(car._id);
                })
                carhtml.innerText = car.name + " " + car.model;
                console.log("Car:",carhtml.innerText)
                document.getElementById('garage-area').append(carhtml);
                document.getElementById('garage-area').append(deletebutton);
                document.getElementById('garage-area').append(updatebutton);

        })
        })
    })
}


function updatecar(objectid, name, model){
    let inputname = document.createElement('input');
    inputname.placeholder = name;
    inputname.id = "updateinput1";
    let inputmodel = document.createElement('input');
    inputmodel.placeholder = model;
    inputmodel.id = "updateinput2";
    let submitupdate = document.createElement('button');
    submitupdate.innerText = "submit changes";
    submitupdate.addEventListener('click',function(){
        fetch('/cars/update/'+ objectid,{method: 'PUT', body: JSON.stringify({
            name: document.getElementById('updateinput1').value,
            model: document.getElementById('updateinput2').value
        }),headers: {
            "Content-Type": "application/json"
        }}).then(function(res){
            console.log('fetch', res);
            refresh();
            getcars();
        });
        
    })
    document.getElementById('update-area').append(inputname);
    document.getElementById('update-area').append(inputmodel);
    document.getElementById('update-area').append(submitupdate);
}

function deletecar(objectid){
    fetch('/cars/delete/'+ objectid,{method: 'DELETE'}).then(function(res){
        console.log('fetch', res);
        refresh();
        getcars();
    });
}

function refresh(){
    let ga = document.getElementById('garage-area'),
        ua = document.getElementById('update-area');
    ga.innerHTML = "";
    ua.innerHTML = "";
}

window.onload = function(){
    getcars();
}