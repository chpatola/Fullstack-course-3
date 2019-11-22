const mongoose = require('mongoose')

//Exercises 3.12

if (process.argv.length < 3 || process.argv.length == 4) {
    console.log('Give only password to see phonebook content or name AND number to add person into phonebok')
    process.exit(1)
}
const password = process.argv[2]

const url =
    `mongodb+srv://chpatolafullstack:${password}@cluster0-hddjk.mongodb.net/phonebooknew?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    console.log('Persons in phonebook:')

    Person.find().then(result => {
        result.forEach(persons => {
            console.log(persons.name + " " + persons.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length > 4) {
    console.log("We got in more than four arguments, third is "+process.argv[3])
    console.log('fourth argument is '+ process.argv[4])
    newName = process.argv[3]
    newNumber = process.argv[4]
    console.log('Our new number is '+ newNumber)
    
    const person = new Person({
        name: newName,
        number: newNumber,
    })

    person.save().then(response => {
        console.log(`Added ${newName}, number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })

}


