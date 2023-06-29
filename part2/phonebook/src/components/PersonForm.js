
const PersonForm = ({
    handleAddName, 
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
export default PersonForm