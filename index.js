require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/Person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getCurrentTimestamp = () => {
  const date = new Date()
  timestamp = `${date.toUTCString()}`
  return timestamp
}

// const generateID = () => {
//   id = Math.floor(Math.random() * 1000000000)
//   return id.toString()
// }

const doesNameAlreadyExist = (name) => {
  duplicate = contacts.find(contact => contact.name === name)

  if (duplicate)
    return true
  return false
}

app.get('/info', (request, response) => {
  response.send(`<div><p>Phonebook has info for ${contacts.length} people</p><p>${getCurrentTimestamp()}</p></div>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(contacts => {
    response.json(contacts)
  })  
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then(contact => {
    response.json(contact)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const delete_id = request.params.id
  contacts = contacts.filter(contact => contact.id !== delete_id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number)
  {
    return response.status(400).json({
      error: 'Body is missing required fields.'
    })
  }

  // if (doesNameAlreadyExist(body.name))
  // {
  //   return response.status(400).json({
  //     error: 'Name must be unique'
  //   })
  // }

  const contact = new Person ({
    // id: generateID(),
    name: body.name,
    number: body.number
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})