
require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./modules/person.js");

const mongoose = require("mongoose");
const { response } = require('express');

const app = express();
app.use(express.json());
app.use(express.static("./build"));
app.use(cors());
morgan.token('type', function (req, res) { return JSON.stringify(req.body); });
app.use (morgan(`:method :url :status :res[content-length] - :response-time ms :type`));

app.get("/" , (req ,res)=>{
    return res.sendFile("./index.html");
});


app.get("/api/persons" , (req ,res)=>{
    Person.find({}).then((result)=>{
    return res.json(result);
    }).catch((e)=>{
        console.log(e);
    });
});


app.get("/api/persons/:id" , (req , res)=>{
    const id = req.params.id;
    Person.findById(id).then(person => {
        if(!person){
            return res.status(404).send("couldnt get the person" , e); 
        }else{
            return res.json(person);

        }
    }).catch((e)=>{
        console.log("find by id fails" , e);
        return res.status(400).json({messeage:'malformatted id', error: e , reason: e.reason});
    })  

});
app.delete("/api/persons/:id" , (req,res)=>{
    const id = req.params.id;
    Person.findByIdAndRemove(id)
    .then(result => {
      return res.status(204).send("deleted");
    })
    .catch((error) => {
     console.log(error);
     return res.status(500).send("eror wile deliting");
    });

});

app.post("/api/persons" , (req , res)=>{
   const data = req.body;
   
   if(!(data.number && data.name)){
    
    return res.status(406).send("err: name && phone canot be empty");
   }else{
        const person = new Person({
            name: data.name,
            number: data.number,
        });
        person.save().then(result => {
            console.log(` added ${person.name} , number: ${person.number} to phonebook`);
            return res.json(result);
        }).catch((e)=>{
            console.log("wile saving to data" , e);
            return res.json(e);
        });
    } 
    

});
app.put( "/api/persons/:id" , (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const person = {number: body.number };
    Person.findByIdAndUpdate(id , person ,{ new: true })
    .then((updatedPerson)=>{
        return res.json(updatedPerson);
    }).catch((e)=>{
        console.log(e, "failed to update to db");
        return res.status(500).json({error: e , messeage:"failed to update to db"  });
    });
});





const PORT = process.env.PORT||3001;
app.listen(PORT , ()=>{
    console.log(`listening on ${PORT}`);
});

const dbPath = "mongodb+srv://firsttime-user:<password>@cluster0.dpj5m.mongodb.net/phoneNUMBER-app?retryWrites=true&w=majority";












// app.get("/api/info" , (req ,res)=>{
//     const personsCount = notes.length;
//     return res.send(`<p>phonebook has info for ${personsCount} persons</p></n><p>${new Date}</p>`);
// });
function generateId1(notes){
    const IDS = notes.map((note)=>{
        return note.id
    });
    maxID = Math.max(IDS);
    return maxID+1;
 }

function generateId2(notes){
    const IDS = notes.map((note)=>{
        return note.id;
    });
    let newID;
    do{
        newID = Math.round(Math.random()*1000);
    }while(IDS.includes(newID));
    return newID;
}