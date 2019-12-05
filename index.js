const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Person = require('./models/persons')

const morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())


//Exercises 3.1-3.7 & 3.9-3.11 & 3.13-3.16 & 3.18,3.19,3.21,3.22

//OBS! Push to Heroku master is git push origin master (ch-phonebook-db), git master is gitorigin
let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada love",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]
app.use(express.static('build'))

let phonebook_length =
  "Phonebook has info for " + persons.length + " people"

//First page
app.get('/', (req, res) => {
  res.send('<h1>Hello Worldie!</h1>')
})

//Get all info from /info URL
app.get('/info', (req, res) => {

  Person.count().then(amount => {
    console.log('Number of entries in phonebook is: ')
    console.log(amount)
    res.send(`<h4>Amount of entries in phonebook: ${amount} </h4>` +`<p>${Date()}</p>`)
    
   
  })
  
})

//GET ALL info from /api/persons URL in json format

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
  
})
  
//GET SPECIFIC person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person =>{
    if(person){
      response.json(person.toJSON())
    } else {
      response.status(404).end
    }
    
  })
  .catch(error => next(error))
  
})

//DELETE person responding to number after persons/ in URL
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//ADD person to persons URL
app.post('/api/persons', (request, response, next) => {
  const body = request.body//json innehåll vi ger via webbsidan
  console.log("name of person to add " + body.name)
  console.log(request.body)

  const person = new Person({
    name: body.name,
    number: body.number || false,//false om ej har värde
  })
  person.save().then(savedPerson =>{
    console.log('saved person is ')
    console.log(savedPerson)
    response.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
  
})

// handler of requests with unknown endpoint (comes after url functions (uses 404) and error handling)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT //|| 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})