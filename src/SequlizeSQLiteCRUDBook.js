require('dotenv').config()

const express = require('express')
const Sequelize = require('sequelize')
const app = express()

app.use(express.json())

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/Books.sqlite'
})

app.get('/', (req, res) => {
    res.send('MAX natchanon')
})

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync()

app.get('/books', (req, res) => {
    Book.findAll().then(book => {
        res.json(book);
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found')
        } else {
            res.json(book)
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.post('/books', (req, res) => {
    Book.create(req.body).then(book => {
        res.json(book);
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.put('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found')
        } else {
            book.update(req.body).then(() => {
                res.send(book)
            }).catch(err => {
                res.status(500).send(err)
            })
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.delete('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found')
        } else {
            book.destroy().then(() => {
                res.send({})
            }).catch(err => {
                res.status(500).send(err)
            })
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

const port = 3000
app.listen(port, () => console.log(`Backend API listening on port ${port}`));