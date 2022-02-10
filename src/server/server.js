// import app.js
const app = require('./app')

const PORT = 8081
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
