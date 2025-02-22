const express = require('express')
const cors = require('cors')
const PORT = 3000
const app = express()
app.use(cors())

const words = [ 'собака', 'кот', 'пирог', 'молоко', 'лампа', 'чемодан' ]

app.get('/random-word', (req, res) => {
	const randomWord = words[ Math.floor(Math.random() * words.length) ]
	res.json({ word: randomWord })
})

app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`))