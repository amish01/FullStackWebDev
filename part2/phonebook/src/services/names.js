import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newName => {
  const request = axios.post(baseUrl, newName)
  return request.then(response => response.data)
}

const update = (nameObject) => {
  const request = axios.put(`${baseUrl}/${nameObject.id}`, nameObject)
  return request.then(response => response.data)
}

const deleteName = (id) => {
    console.log(`delete called with id: ${id}`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(() => id)

    //.catch(error => console.log('Error deleting name: ', error))
    //return request.then(response => response.data)
  }
export default { getAll, create, update, deleteName }

// export default { 