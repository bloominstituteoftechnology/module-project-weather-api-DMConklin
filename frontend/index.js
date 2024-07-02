async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  const weatherWidget = document.querySelector('#weatherWidget')
  //hide weather widget on page load / until in use
  weatherWidget.style.display = 'none'

  const info = document.querySelector('p.info')

  const citySelect = document.querySelector('#citySelect')
  //event handler for city selection
  citySelect.addEventListener('change', evt => {
    //disable selection until new data is loaded
    evt.target.setAttribute('disabled', null)
    //hide widget when loading new data
    weatherWidget.style.display = 'none'
    //loading text
    info.textContent = 'Fetching weather data...'
    //axios api call
    axios.get(`http://localhost:3003/api/weather?city=${evt.target.value}`)
      .then(res => {
        //remove loading text
        info.textContent = ''
        //re-enable city selection
        citySelect.removeAttribute('disabled')
        //show widget
        weatherWidget.style.display = 'block'
        //divide response data into more usable chunks
        const {current, forecast, location} = res.data
        //inject current temperature data
        const apparentTemp = document.querySelector('#apparentTemp')
        apparentTemp.children[1]
          .textContent = `${current.apparent_temperature}\u00B0`

        //re-usable weather description function to find the emoji from descriptions array
        function weatherDesc(current, list = descriptions){
          return (list.find(desc => desc[0] == current.weather_description))[1]
        }
        document.querySelector('#todayDescription').textContent = weatherDesc(current)

        //generator function to inject content into elements as we iterate over them
        function* stats(current) {
          yield `${current.temperature_min}\u00B0/${current.temperature_max}\u00B0`
          yield `Precipitation: ${current.precipitation_probability*100}%`
          yield `Humidity: ${current.humidity}%`
          yield `Wind: ${current.wind_speed}m/s`
        }
        const genStats = stats(current)
        //grab the elements we will be injecting data into then iterate over them
        const todayStats = document.querySelector('#todayStats').children
        for (let i = 0; i < todayStats.length; i++) {
          todayStats[i]
            .textContent = genStats.next().value
        }

        //days of the weel helper array
        const dow = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ]

        //generator function to inject content into elements as we iterate over them
        function* genForecast(current) {
          yield `${dow[new Date(current.date).getDay()+1]}`
          yield weatherDesc(current)
          yield `${current.temperature_min}\u00B0/${current.temperature_max}\u00B0`
          yield `Precipitation: ${current.precipitation_probability*100}%`
        }
        //grab the elements we will be injecting data into then iterate over them
        const foreCast = document.querySelector('#forecast').children
        //nested for loops to iterate of the children of each child element
        for (let f = 0; f < foreCast.length; f++) {
          const currentForecast = foreCast[f].children
          const currentGen = genForecast(forecast.daily[f])
          for(let s = 0; s < currentForecast.length; s++) {
            currentForecast[s].textContent = currentGen.next().value
          }
        }

        //populated location data
        const currentLocal = document.querySelector('#location').children
        currentLocal[0].textContent = location.city
        currentLocal[1].textContent = location.country
      })
      .catch(err => {
        console.log(err)
      })
      .finally()
  })

  // Array.from(citySelect).forEach(option => {
  //   option.addEventListener('change', evt => {
  //     console.log(evt)
  //   })
  // })
  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
