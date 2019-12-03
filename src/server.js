const app = require('./app')

const { PORT } = require('./config')

app.listen(PORT, () => {
  console.log(`Server is very closely listening to your every move  at http://localhost:${PORT}`)
})
// app will be listening on the port  