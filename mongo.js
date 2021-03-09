const mongoose = require("mongoose");
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
  }
  
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
  
//   const person = new Person({
//     id: 5 ,
//     name: "aaaaa",
//     number: "444446",
//   });
  
//   person.save().then(result => {
//     console.log('person saved!' , person);
//     mongoose.connection.close();
//   })

Person.find({id:4}).then(result => {
    result.forEach(Person => {
      console.log(Person)
    })
    mongoose.connection.close()
  });