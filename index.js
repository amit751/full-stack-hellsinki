const express = require("express");
const app = express();
app.use(express.json());
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
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
    console.log(id);
    const note = notes.find((item)=>{
        return item.id === Number(id);
    });
    if(!note){
        console.log(note);
        return res.status(204).send("allready deleted/ not found");
    }else{
        notes = notes.filter((item)=>{
            return item !== note;
        });
        console.log(notes);
        return res.send(`the new arrey: ${JSON.stringify(notes)} `);
    }
});

app.listen(3001 , ()=>{
    console.log("listening on 3001");
});