const express = require('express')
const calculatorController = require('./controllers/calculatorController.js')
const app = express()
const helmet = require('helmet')
const fetch = require('node-fetch')
const path = require('path')
const mysql = require('mysql2')
const PORT = process.env.PORT || 8000

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'juan',
  password: 'password',
  database : 'user'
})

const auth = (req, res, next) => {
  const { user, password } = req.query
  const query = `SELECT * FROM user WHERE user='${user}' AND pass='${password}'`
  connection.query(query, (err, results, fields) => {
    if (err) {
      next('Database error')
      return
    }

    if (results.length === 0) {
      next('Identity thief is not a Joke, millions of families suffer every year')
      return
    }

    next()
  })
}

app.use(helmet())
// app.use(auth)
app.use(express.urlencoded())
app.use(express.static('static'))

app.get('/posts', (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(apiRes => apiRes.json())
    .then(apiRes => {
      res.send(apiRes)
    })
    .catch((err) => {
      res.status(500)
      res.send(err.message)
    })
})

app.post('/posts', (req, res) => {
  res.send('THIS IS THE POSTS VIEW')
})

app.patch('/posts', (req, res) => {
  res.send('THIS IS THE POSTS VIEW')
})

app.get('/posts2', (req, res) => {
  res.send('THIS IS THE POSTS 2 VIEW')
})

app.get('/profile/:user', auth, (req, res) => {
  res.send(`Stop stalking the ${req.params.user}'s profile please`)
})

app.post('/signup', (req, res) => {
  const { user, password } = req.body
  const insertQuery = `INSERT INTO user (user, pass) VALUES ('${user}', '${password}')`
  connection.query(insertQuery, (err, results) => {
    if (err) {
      res.status(500)
      res.send('Database error')
      return
    }

    if (results.length === 0) {
      res.status(401)
      res.send('Identity thief is not a Joke, millions of families suffer every year')
      return
    }

    res.send('You are a new user')
  })
})

app.use('/calculator', calculatorController)

app.all('*', (req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'static', '404.jpeg'))
})

app.listen(PORT, () => console.log(`Listeninig to ${PORT}`))
