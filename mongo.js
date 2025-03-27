const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length!== 5)
{
  console.log('Incorrect number of arguments. Usage is either <password> to list all available entries in the phonebook, or <password> <name> <number> to add an entry to the phonebook')
  process.exit(1)
}

const password = process.argv[2]

let creation = false
let name = ''
let number = ''

if (process.argv.length === 5)
{
  creation = true
  name = process.argv[3]
  number = process.argv[4]
}

const url = `mongodb+srv://korbaiszabina:${password}@phonebook.uyghqpu.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (creation === true)
{
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to the phonebook`)
    mongoose.connection.close()
  })
}
else
{
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}