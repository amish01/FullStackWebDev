import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import nameService from './services/names'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchStr, setSearchStr] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [updateErrorMessage, setUpdateErrorMessage] = useState(null)
  //const [id, setId] = useState(persons.length)

  useEffect(() => {
    console.log('effect')
    nameService
    .getAll()
    .then(initialNames => {
      setPersons(initialNames)
    })
  }, [])
  //console.log('render', persons.length, 'notes')
  let searchArr = []
 
  const handleAddName = (e) => {
    setNewName(e.target.value)
  } 

  const handleAddNumber = (e) => {
    setNewNumber(e.target.value)
  } 

  const handleSearch = (e) => {
    setSearchStr(e.target.value)
  }

  searchArr = persons.filter((person) => {
    if(searchStr !== "" && person.name.toLowerCase().includes(searchStr.toLowerCase())){
      return person
    }
      return false
  })
  
 
  const addName = (e) => {
    e.preventDefault()
    let personObject
    if(newName){
        //setId(persons.length + 1)
        personObject = {
          name: newName,
          number: newNumber? newNumber: `No number for ${newName}`,
          //id: id === 0 ? persons.length+1:id + 1
        }
        if(persons.map( n => n.name).indexOf(newName) < 0){
           nameService
          .create(personObject)
          .then(returnedPerson => {
            setSuccessMessage(
              `Added '${returnedPerson.name}' `
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setPersons(persons.concat(returnedPerson))
          })
            
        }else{
          if (window.confirm( `${newName} is already added to the phonebook. Do you want  
             to replace the old number with a new one?`)) {
            // nameService.deleteName(personData.id).
            // then(() => setPersons(persons.filter(person => person.id !== personData.id)))
            // .catch((error => console.log(error)))
            //const note = notes.find(n => n.id === id)
            //const updateNumber = { ...personObject, important: !note.important }
            const personToUpdate = persons.find(person => person.name === newName)
            console.log(personToUpdate)
            const personUpdate = {...personToUpdate, number: newNumber}
            console.log('updated person: ', personUpdate)
            nameService.update(personUpdate)
            .then(returnedPerson => setPersons(persons.map(person => person.id === returnedPerson.id? returnedPerson: person)))
            .catch(error => {
              setUpdateErrorMessage(
                `Information about '${newName}' has already been removed from the database `
              )
              setTimeout(() => {
                setUpdateErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.name !== newName))
            })

          }
        }    
    }   
    setNewName('')
    setNewNumber('')   
  }


const onDelete = personData => {
  if (window.confirm( `Do you really want to delete ${personData.name}?`)) {
    nameService.deleteName(personData.id).
    then(() => setPersons(persons.filter(person => person.id !== personData.id)))
    .catch((error => console.log(error)))
  }
 
}

const Person =  ({personData}) => {
  return(
      <div>
      {personData.name}   {personData.number}
      <button onClick={() => onDelete(personData)}>delete</button>
     </div> 
  )
}
                          
                                
const Persons = ({persons, onDeleteName}) => {
  return(
     persons.map((person) => 
        <div key={person.id}>
          <Person personData={person} onDeleteName={onDeleteName}/>
        </div>)

  )
} 
  
  
  return (
   
    <div>
      <h2>Phonebook</h2>
      <Notification className='success' message={successMessage} />
      <Notification className='updateError' message={updateErrorMessage} />
      <Filter searchStr={searchStr}
              searchArr={searchArr}
              handleSearch={handleSearch} />     
      <PersonForm handleAddName={handleAddName}
                  handleAddNumber={handleAddNumber}
                  newName={newName}
                  newNumber={newNumber}
                  addName={addName} />      
     
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App