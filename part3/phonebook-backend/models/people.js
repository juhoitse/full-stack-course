const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
    .then( () => {
        console.log('connected to MongoDB')
    }).catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

const phoneValidator = (number) => {
    const parts = number.split('-')
    console.log('validator', parts[0].length > 1)
    return ( number.length >= 8 && parts.length === 2 && 1 < parts[0].length && parts[0].length < 4 && isNumeric(parts[0]) && isNumeric(parts[1]) )
}

const custom = [phoneValidator, 'Number must have length of 8, two parts and only numbers']

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        validate: custom,
    },
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
