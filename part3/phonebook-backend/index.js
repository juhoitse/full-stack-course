require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/people')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' }).end()
    }
    if( error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message }).end()
    }
    next(error)
}

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('person', (request) => {
    if(request.method === 'POST') {
        return JSON.stringify(request.body)
    } else {
        return ' '
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.get('/info', (request, response, next) => {
    Person.find({}).then( (result) => {
    //response.json(result)
        const length = result.length
        //console.log("length", length)
        response.send(`<div>Phonebook has info for ${length} people<div>
                   <div>${new Date()}</div>`).end()
    }).catch(err => next(err))
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then( (result) => {
        response.json(result)
        console.log('result', result)
    }).catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
    const person = new Person({
        name: request.body.name,
        number: request.body.number,
    })
    console.log('???')
    person.save().then(newPerson => {
        //console.log(phoneValidator(newPerson.number))
        response.json(newPerson)
        response.status(200).end()
    }).catch(err => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then( result => {
        if(result) {
            response.json(result)
            response.status(200).end()
        } else {
            response.status(404).end()
        }
    }).catch(err => next(err) )
})

app.put('/api/persons/:id', (request, response, next) => {
    //console.log(request.params.id)
    const person = new Person({
        _id: request.params.id,
        name: request.body.name,
        number:request.body.number
    })
    Person.findOneAndUpdate({ _id: request.params.id }, person, {runValidators: true}).then( result => {
        console.log(result)
        response.status(200).end()
    //response.redirect('api/persons/'+request.params.id).end()
    }).catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    //console.log(id)
    Person.deleteOne({ _id: id }).then( () => {
    //console.log(result)
        response.status(200).end()
    }).catch(err => next(err))
})



// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
