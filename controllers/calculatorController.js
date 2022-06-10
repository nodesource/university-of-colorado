const router = require('express').Router()

router.get('/sum/:a/:b', (req, res) => {
  const { a, b } = req.params
  res.status(200)
  res.send((Number(a) + Number(b)).toString())
})

router.get('/substract/:a/:b', (req, res) => {
  const { a, b } = req.params
  res.status(200)
  res.send((Number(a) - Number(b)).toString())
})

router.get('/divide/:a/:b', (req, res) => {
  const { a, b } = req.params
  res.status(200)
  res.send((Number(a) / Number(b)).toString())
})

router.get('/multiply/:a/:b', (req, res) => {
  const { a, b } = req.params
  res.status(200)
  res.send((Number(a) * Number(b)).toString())
})

module.exports = router
