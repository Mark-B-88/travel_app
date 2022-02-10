const handleSubmit = (e) => {
  e.preventDefault()

  let formDest = document.getElementById('dest').value
  let startDate = document.getElementById('d_start').value
  let endDate = document.getElementById('d_end').value
  
  if (formDest == '' || startDate == '' || endDate == '') {
    alert(`All fields are required!`)
    return
  }
  
  // calculate duration
  const tDuration = Client.calcTripDuration(startDate, endDate)

  /**
   *    This ensures that the dates chosen make sense. Obviously, you can't set
   *    a date that already passed.
   * 
   *    This ensures proper logic to avoid weird scenarios with chosen dates.
   */
  
  if (tDuration < 0 || new Date(startDate) < new Date()) {
    alert(`Please chose a proper date!`)
    return
  }

  fetch('http://localhost:8081/data', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({destination: formDest, tripDuration: tDuration})       
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)

    // update user interface
    Client.handleUI(res)
  })
}

document.getElementById('submit_btn').addEventListener('click', handleSubmit)

export { handleSubmit }
window.handleSubmit = handleSubmit
