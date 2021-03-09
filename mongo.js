const mongoose = require("mongoose");
const arguments = process.argv.length;
// switch(arguments){
//     case arguments < 3 
// }



  
  const password = process.argv[2];
  
  const url =
    `mongodb+srv://firsttime-user:${password}@cluster0.dpj5m.mongodb.net/phoneNUMBER-app?retryWrites=true&w=majority`;
  
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
  
  const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema);
  function postPerson(){
      const person = new Person({
        id: Math.random()*10 ,
        name: process.argv[3],
        number: process.argv[4],
      });

      person.save().then(result => {
        console.log(` added ${person.name} , number: ${person.number} to phonebook`);
        mongoose.connection.close();
      });
  }
//   phonebook:
// Anna 040-1234556
// Arto Vihavainen 045-1232456
// Ada Lovelace 040-1231236
function showPeople(){
    Person.find({}).then(result => {
        console.log(result);
        console.log("phonebook:");
        result.forEach(person => {
          console.log(` ${person.name}  ${person.number} `);
        })
        mongoose.connection.close()
      });
}
if (arguments < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
  }else if(arguments<5){
      showPeople();
   }else if(arguments === 5){
       postPerson();
   }