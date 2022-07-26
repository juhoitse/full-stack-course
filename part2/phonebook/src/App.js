import { useState, useEffect } from 'react'
import nameService from "./services/names.js"


const PersonList = (props) => {
  const persons = props.persons
  const newFilter = props.newFilter
  const delHandler = props.delHandler
  const filtered = persons.filter( (p) => p.name.toLowerCase().includes(newFilter.toLowerCase()))
  const res = filtered.map( p =>
                            <div key={p.name}> {p.name} {p.number} <DeleteButton key={p.name} name={p.name} handler={delHandler} /></div>)
  return res
}

const Form = (props) => {
  const addPerson = props.addPerson
  const newName = props.newName
  const newNumber = props.newNumber
  const numberHandler = props.numberHandler
  const nameHandler = props.nameHandler

  return (
    <form onSubmit={addPerson}>confirm
      <div>
        name: <input value={newName} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const DeleteButton = (props) => {
  const handler = props.handler
  const name = props.name
  return (
    <button onClick={handler(name)}>{"Delete"}</button>
  )
}

const Filter = (props) => {
  const newFilter = props.newFilter
  const filterHandler = props.filterHandler
  return (
    <div>
      filter shown with: <input value={newFilter} onChange={filterHandler} />
    </div>
  )
}

const Message = (props) => {
  if(props.message === null) {
    return null
  }
  if(props.error) {
    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 1,
    }
    return (
      <div style={errorStyle}>{props.message}</div>
    )
  } else {
    const confirmStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 1,
    }
    return (
      <div style={confirmStyle}>{props.message}</div>
    )
  }

}

const App = () => {

  const [persons, setPersons] = useState([])
  const [length, setLength] = useState(0)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    nameService.getAll().then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      setLength(response.data[response.data.length-1].id)
    })
  }

  useEffect(hook, [])

  const nameHandler = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const filterHandler = (event) => {
    setNewFilter(event.target.value)
    //console.log(event.target.value)
  }

  const numberHandler = (event) => {
    setNewNumber(event.target.value)
    //console.log(event.target.value)
  }

  const delHandler = (name) => {
    const handler = () => {
      if(window.confirm(`Delete ${name}?`)) {
        const deadManWalking = persons.find( person => person.name === name )
        console.log("removing", deadManWalking)
        nameService.remove(deadManWalking.id)
        setPersons(persons.filter( person => person.name !== name) )
      }
    }
    return handler
  }

  const updatePerson = (oldPerson, newPerson) => {
    const copy = [...persons]
    copy[copy.indexOf(oldPerson)].number = newPerson.number
    setPersons(copy)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName,
                        id: length+1,
                        number: newNumber}
    if (persons.some(e => e.name === newPerson.name)) {
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.filter(person => person.name === newPerson.name)[0]
        nameService.update(oldPerson.id, newPerson).then( response => {
          setMessage(`Updated ${oldPerson.name}`)
          setTimeout(() => {setMessage(null)}, 5000)
          updatePerson(oldPerson, newPerson)
        })
        .catch( error => {//log errors
              console.log("Error", error.message)
              setErrorMessage(`Information of ${oldPerson.name} has already been removed from the server`)
              setTimeout(() => {setMessage(null)}, 5000)
            })
      }
    } else {
      //add the person to the db
      nameService.create(newPerson)
      .then( response => {
              console.log("promise fulfilled")
              setMessage(`Added ${newPerson.name}`)
              setTimeout(() => {setMessage(null)}, 5000)
              setNewName("")  //reset input fields
              setNewNumber("")
              //add person to the local state
              setPersons(persons.concat(newPerson))
              //add update the latest given ID
              setLength(length+1) })
      .catch( error => {//log errors
            console.log("Error", error.message)
            setErrorMessage(`Error ${error.message}`)
            setTimeout(() => {setMessage(null)}, 5000)
          })
    }
  }

  return (
    <div>
      <Message message={message} error={false}/>
      <Message message={errorMessage} error={true}/>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} filterHandler={filterHandler} />
      <h2>Add a new</h2>
      <Form addPerson={addPerson} numberHandler={numberHandler}
            nameHandler={nameHandler} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <div>
        <PersonList persons={persons} delHandler={delHandler} newFilter={newFilter} />
      </div>
    </div>
  )
}

export default App
