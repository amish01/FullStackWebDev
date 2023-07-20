import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [isMany, setIsMany] = useState(false)
  const [isCountry, setIsCountry] = useState(false)
  const [perfectMatch, setPerfectMatch] = useState(false)
  const [uniqueResultKeys, setUniqueResultKeys] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  const baseUrlIcon = 'https://openweathermap.org/img/wn'
  const api_key = process.env.REACT_APP_API_KEY

  const handleChange = (event) => {
    setCountry(event.target.value) 
  }

  const handleShowClick = (country) => {
    setShowDetail(true)
    let clickedCountry = searchResult.filter(c => c.name.common === country)[0]
    setSelectedCountry(clickedCountry)
  }
  
  const baseUrlGeo = 'http://api.openweathermap.org/geo/1.0/direct?'
  const baseUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?'  
  useEffect(() => {
    if(selectedCountry){ 
        if(selectedCountry.capital!==undefined){
          axios
            .get(`${baseUrlGeo}q=${selectedCountry.capital[0]}&limit=5&appid=${api_key}`)
            .then(response => {
              const geoResult = response.data
              //console.log(geoResult[0])
              //console.log('Geo data for: ',response.data.filter(result => selectedCountry.cca2===result.country))
            axios
            .get(`${baseUrlWeather}lat=${geoResult[0].lat}&lon=${geoResult[0].lon}&units=metric&appid=${api_key}`)
            .then(response =>  { 
              setWeatherData(response.data)
            })          
            })
            .catch(error => console.log('error fetching weather data: ', error))
        }  
    }     

  }, [showDetail])

  useEffect(() => {
   // console.log('effect run')
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
    setShowDetail(false)
    if(countries.length === 0){
      console.log('Fetching data for countries... ')
      axios
        .get(`${baseUrl}/api/all`)
        .then(response => {
          console.log('Fetched data for ',response.data.length, ' countries')
          setCountries(response.data)})
        .catch(error => console.log("countries not found ", error))
    }
    if (country) {
          const result = countries.filter(c => c.name.common.toLowerCase().includes(country))       
          if (result.length > 1 && result.length <= 10){
            console.log('1 - 10: ',result.length)
            setSearchResult(result)
            setIsCountry(true)
            setIsMany(false)         
          }else if (result.length === 1){
            console.log('1: ',result.length)
            setSearchResult(result)
            if(result[0].languages!==undefined){
              setUniqueResultKeys(Object.keys(result[0].languages))
            }
            setIsCountry(true)
            setIsMany(false)           
          } else if (result.length > 10){
            console.log('many; ',result.length)
            setIsMany(true)
            setIsCountry(true)   
          }
    }else{
      setIsMany(false)
      setIsCountry(false)
      setSearchResult([]) 
    }        
  }, [country, countries])

  if(isMany && isCountry){  
    return (
      <div>
        <h1>countries App</h1>
        Find countries: <input value={country} onChange={handleChange} />
        <p>Too many matches, specify another filter</p>
      </div>
    )   
  }else if (isCountry && showDetail){
    return(
      <div>
        <h1>countries App</h1>
        Find countries: <input value={country} onChange={handleChange} />
        <h2>{selectedCountry.name.common}</h2>
        {selectedCountry.capital && <p>{selectedCountry.capital}</p>}
        {selectedCountry.area && <p>{selectedCountry.area}</p>}
        <h2>languages:</h2>
        {selectedCountry.languages && <ul>{Object.keys(selectedCountry.languages).map(k => <li key={k}>{selectedCountry.languages[k]}</li>)}</ul>}
        {selectedCountry.flags && <img width={200} src={selectedCountry.flags.svg} alt='country flag'/>}
        {selectedCountry.capital && <h2>Weather in {selectedCountry.capital}</h2>}
        {weatherData && <p>{weatherData.main.temp} Celcius</p>}
        {weatherData && <p>{weatherData.weather[0].description}</p>}
        {weatherData && <img src = {`${baseUrlIcon}/${weatherData.weather[0].icon}@2x.png`} alt='weather icon'/>}     
        {weatherData && <p>Wind speed: {weatherData.wind.speed} m/s</p>}
      </div>
    )
  }else if (isCountry && !isMany){
    return ( 
      <div> 
         <h1>countries App</h1>
          Find countries: <input value={country} onChange={handleChange} />
          {searchResult.map(c => <div key={c.name.common}>{c.name.common} <button onClick={() => handleShowClick (c.name.common)}>show</button></div>)}
      </div>
    );
  }else if(!isCountry){
    return (
      <div>
        <h1>countries App</h1>
        Find countries: <input value={country} onChange={handleChange} />
        <p>No results found </p>
      </div>
    )   

  }  
}

export default App;
