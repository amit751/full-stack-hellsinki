const express = require("express");
const app = express();
app.use(express.json());
let notes = [
    {
        id: 1,
        name: "HTML is easy",
       phone: "23031",
        
    },
    {
        id: 2,
        name: "HTML is easy",
       phone: "20098",
    },
    {
        id: 3,
        name: "HTM",
        phone: "2019053",
    }
];


app.get("/api/persons" , (req , res)=>{
    console.log("get");
    return  res.json(notes);
});

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
    if(!(content.phone && content.name)){
        return res.status(406).send("err: name && phone canot be empty");
    }else if(names.includes(content.name)){
        return res.status(406).send("err: name is allredy exist"); 
    }else{
        const newPerson = {
            id: generateId2(notes) ,
            name: content.name ,
            phone:content.phone
        };
        notes = notes.concat(newPerson);
        return res.json(newPerson); 
    }
    

});

app.listen(3001 , ()=>{
    console.log("listening on 3001");
});
