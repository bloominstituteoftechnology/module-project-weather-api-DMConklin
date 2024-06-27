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
  weatherWidget.style.display = 'none'

  const info = document.querySelector('p.info')

  const citySelect = document.querySelector('#citySelect')
  citySelect.addEventListener('change', evt => {
    evt.target.setAttribute('disabled', null)
    weatherWidget.style.display = 'none'
    info.textContent = 'Fetching weather data...'
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
