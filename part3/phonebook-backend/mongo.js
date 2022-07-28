const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.xh1gj37.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5) {
    mongoose.connect(url)
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })
    person.save().then(() => {
      console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      mongoose.connection.close()
      process.exit(0)
  })
  .catch((err) => console.log(err))

} else if(process.argv.length === 4) {
    console.log("Please give a name and a number")
    process.exit(1)
} else if(process.argv.length === 3) {
    mongoose.connect(url)
    Person.find({}).then((result) => {
      console.log("phonebook:")
      result.forEach( (person) => {
        console.log(person)
      })
     mongoose.connection.close()
     process.exit(0)
   }).catch( error => console.log("err", error))
}
