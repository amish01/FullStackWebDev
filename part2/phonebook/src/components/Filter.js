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

  export default Filter