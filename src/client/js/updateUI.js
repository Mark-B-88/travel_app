const handleUI = (Data) => {
  const resultsDiv = document.getElementById('form_results')

  resultsDiv.classList.remove('remove-display')
  
  const now = new Date()
  const weekdays = [
    'Mon', 
    'Tue', 
    'Wed', 
    'Thu', 
    'Fri', 
    'Sat', 
    'Sun'
  ]
  const months = [
    'Jan', 
    'Feb', 
    'Mar', 
    'Apr', 
    'May', 
    'Jun', 
    'Jul', 
    'Aug', 
    'Sep', 
    'Oct', 
    'Nov', 
    'Dec'
  ]

  Data.tripDuration === 1 ?
    document.getElementById('user_results').innerHTML = `
      Your trip to <strong>${Data.cityInputName}</strong> (${Data.countryName}) is for <strong>one day</strong>.
  ` :
    document.getElementById('user_results').innerHTML = `
      Your trip to <strong>${Data.cityInputName}</strong> (${Data.countryName}) is for <strong>${Data.tripDuration} days</strong>.
  `
  // search results
  document.getElementById('c_image').src = Data.cityImage
  document.getElementById('c_image').alt = `
    Your destination to ${Data.cityName} (${Data.countryName}) courtesy of pixabay.com.
  `
  
  document.getElementById('w_c').innerHTML = `${Data.cityInputName}`
  document.getElementById('w_d').innerHTML = `
    ${weekdays[now.getDay()-1]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}
  `
  document.getElementById('w_t').innerHTML = `${Data.temperature}&degC`
  document.getElementById('w_i').src = `
    https://www.weatherbit.io/static/img/icons/${Data.iconImg}.png
  `
  document.getElementById('w_d').innerHTML = `${Data.description.toLowerCase()}`
}

export { handleUI }
