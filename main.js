const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.use(express.static("./build"));
app.use(cors());
morgan.token('type', function (req, res) { return JSON.stringify(req.body); });
app.use (morgan(`:method :url :status :res[content-length] - :response-time ms :type`));


const arguments = process.argv.length;
const password = process.argv[2];
const url =
    `mongodb+srv://firsttime-user:${password}@cluster0.dpj5m.mongodb.net/phoneNUMBER-app?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema);
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});

app.get("/api/persons" , (req ,res)=>{
    Person.find({}).then((result)=>{
        mongoose.connection.close();
       return res.json(result);
    }).catch((e)=>{
        console.log(e);
    });
});










let notes = [
    {
        id: 1,
        name: "HTML is easy",
        number: "23031",
        
    },
    {
        id: 2,
        name: "HTML is easy",
        number: "20098",
    },
    {
        id: 3,
        name: "HTM",
        number: "2019053",
    }
];

app.get("/" , (req ,res)=>{
    res.sendFile("./index.html");
});
// app.get("/api/persons" , (req , res)=>{
//     console.log("get");
//     return  res.json(notes);
// });

app.get("/api/info" , (req ,res)=>{
    const personsCount = notes.length;
    return res.send(`<p>phonebook has info for ${personsCount} persons</p></n><p>${new Date}</p>`);
});
app.get("/api/persons/:id" , (req , res)=>{
    const id = req.params.id;
   const note = notes.find((item)=>{
        return item.id === Number(id);
    });
    if(!note){
        return res.status(404).send("not found");
    }
    return res.json(note);
});
app.delete("/api/persons/:id" , (req,res)=>{
    const id = req.params.id;
    
    const note = notes.find((item)=>{
        return item.id === Number(id);
    });
    if(!note){
        
        return res.status(204).send("allready deleted/ not found");
    }else{
        notes = notes.filter((item)=>{
            return item !== note;
        });
        
        return res.send(`the new arrey: ${JSON.stringify(notes)} `);
    }
});
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
app.post("/api/persons" , (req , res)=>{
    const names = notes.map((note)=>note.name);
    const content = req.body;
    if(!(content.number && content.name)){
        return res.status(406).send("err: name && phone canot be empty");
    }else if(names.includes(content.name)){
        return res.status(406).send("err: name is allredy exist"); 
    }else{
        const newPerson = {
            id: generateId2(notes) ,
            name: content.name ,
            number:content.number
        };
        notes = notes.concat(newPerson);
        return res.json(newPerson); 
    }
    

});
const PORT = process.env.PORT||3001;
app.listen(PORT , ()=>{
    console.log(`listening on ${PORT}`);
});

const dbPath = "mongodb+srv://firsttime-user:<password>@cluster0.dpj5m.mongodb.net/phoneNUMBER-app?retryWrites=true&w=majority";