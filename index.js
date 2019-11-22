require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Person = require('./models/persons')

const morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())


//Exercises 3.1-3.7 & 3.9-3.11 & 3.13-3.14

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
  //res.send('<h1>Hello Worldie!</h1>')
  //res.send(info)
  res.send(phonebook_length + "<br/>" + Date())
})

//Get all info from /api/persons URL in json format

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  });
});
  

//Get info for a specific person
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person =>{
    response.json(person.toJSON())
  })
  
})

//Delete person responding to number after persons/ in URL
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)//change persons list to the new value without deleted person
  response.status(204).end()
})

//Function for id creation
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Add person to persons URL
app.post('/api/persons', (request, response) => {
  const body = request.body//json innehåll vi ger via webbsidan
  console.log("name of person to add " + body.name)
  console.log(request.body)


  const person = new Person({
    name: body.name,
    number: body.number || false,//false om ej har värde
    //id: getRandomInt(700),
  })
  person.save().then(savedPerson =>{
    console.log('saved person is ')
    console.log(savedPerson)
    response.json(savedPerson.toJSON())
  })
  
})


const PORT = process.env.PORT //|| 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})