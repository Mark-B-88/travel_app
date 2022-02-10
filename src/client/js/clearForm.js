// clears the user inputs

const clearForm = () => {
  document.getElementById('dest').value = ''
  document.getElementById('d_start').value = ''
  document.getElementById('d_end').value = ''
  document.getElementById('form_results').classList.add('remove-display')
}

document.getElementById('clear_form').addEventListener('click', clearForm)

export { clearForm }
window.clearForm = clearForm
