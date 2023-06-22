import { useState } from 'react'


const PersonForm = ({handleAddName, 
                     handleAddNumber,
                     newName,
                     newNumber,
                     addName}) => {  
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleAddName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleAddNumber}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

}
const Persons = ({persons}) =>  persons.map((person) => <div key={person.id}><Person personData={person} /></div>)
const Person =  ({personData}) => <div>{personData.name}   {personData.number}</div> 
const Filter = ({searchStr,searchArr, handleSearch}) => {
  return(
    <div>
        <div>
        Search a name: <input value={searchStr} onChange={handleSearch}/>
    </div>     
        {searchArr.map(person =>  person? (<div key={person.name}>{person.name}</div>): false )}
    </div>    
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchStr, setSearchStr] = useState('')
  const [id, setId] = useState(persons.length + 1)
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
    //setId(persons.length + 1)
    let personObject
    if(newName){
        setId(id + 1)
        personObject = {
        name: newName,
        number: newNumber? newNumber: `No number for ${newName}`,
        id: id
        }
    if(persons.map( n => n.name).indexOf(newName) < 0){
        setPersons(persons.concat(personObject))
    }else{
        alert(`${personObject.name} is already addded to the phonebook`)
    }    
    }   
    setNewName('')
    setNewNumber('')
    
  }
  
  
  return (
   
    <div>
      <h2>Phonebook</h2>
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