import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = (props) => {
  const countries = props.countries
  const filter = props.filter
  const filteredCountries = countries.filter( c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  const button = props.button
  if(filteredCountries.length === 1) {
    //props.ch(props.c)
    return (
      <OneCountry country={filteredCountries} weatherHook={props.weatherHook} weather={props.weather} weatherHandler={props.weatherHandler} />
    )
  } else if(filteredCountries.length <= 10) {
    const filteredList = filteredCountries.map( c =>
                                                <div key={c.name.official}>{c.name.common}<Button key={c.name.official} name={c.name.common} country={c} handler={button} /></div>)
    return filteredList
  } else {
    return (
      <div>{"Too many matches, spesify another filter"}</div>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.handler(props.country)}>{"show"}</button>
  )
}

const OneCountry = (props) => {
  const country = props.country[0]
  const lang = Object.values(country.languages).map( lang =>
                                                    <li key={lang}>{lang}</li>)
  //fetch weatherdata with an effect
  useEffect(() => {
  async function fetchData() {
    // You can await here
      await props.weatherHook(country.capital);
    // ...
    }
    fetchData();
  }, [props, country]);
  const weather = props.weather
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>{"capital"} {country.capital}</div>
      <div>{"area"} {country.area} </div>
      <h3>{"Languages:"}</h3>
      <ul>
          {lang}
      </ul>
      <img src={country.flags.png} alt={""} />
      <h1>{"Weather in "}{country.capital}</h1>
      <div>{"Temperature "}{weather.temperature}{" Celsius"}</div>
      <img src={weather.imgsrc} alt={""} />
      <div>{"Windspeed "}{weather.windspeed}{" m/s"}</div>
    </div>

  )
}

const Filter = (props) => {
  const newFilter = props.newFilter
  const filterHandler = props.filterHandler
  return (
    <div>
      find countries: <input value={newFilter} onChange={filterHandler} />
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weather, setWeather] = useState([])

  const countryHook = () => {
  //console.log('effect')
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      //console.log('promise fulfilled')
      setCountries(response.data)
    })
  }

  const weatherHook = (cap) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${cap}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then( response =>
              setWeather({
                temperature: response.data.main.temp,
                imgsrc: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                windspeed: response.data.wind.speed,
              }))
  }

  useEffect(countryHook, [])

  const filterHandler = (event) => {
    setNewFilter(event.target.value)
    //console.log(event.target.value)
  }

  const buttonHandler = (country) => {
    const handler = async() => {
      setNewFilter(country.name.common)
      //console.log(name)
    }
    return handler
  }

  return (
    <div>
      <h3>{"Countries!"}</h3>
      <Filter newFilter={newFilter} filterHandler={filterHandler} />
      <CountryList countries={countries} weatherHook={weatherHook} weather={weather} filter={newFilter} button={buttonHandler} />
    </div>
  )

}


export default App
