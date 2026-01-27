require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000


app.use(express.json());

let books = [
    {id: 1, title: 'book 1', author: 'Author 1'},
    {id: 2, title: 'book 2', author: 'Author 2'},
    {id: 3, title: 'book 3', author: 'Author 3'},
]

app.get('/', (req, res) => {
    res.send(`
        <h1>Book API</h1>
        <p>คลิกปุ่มเพื่อทดสอบ HTTP Methods ต่างๆ:</p>
        
        <div style="margin-bottom: 20px;">
            <a href="/books" target="_blank"><button>GET: ดูหนังสือทั้งหมด</button></a>
            <a href="/books/1" target="_blank"><button>GET: ดูไอดีที่ 1</button></a>
        </div>

    `);
})

app.get('/books', (req, res) => {
    res.json(books)
})

// app.post('/books/:id', (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id))
//     if (!book) res.status(404).send('Book not found')
//     res.send(book)
// });

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) res.status(404).send('Book not found')
    res.json(book);
})

app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    }
    books.push(book)
    res.send(book)
})

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) res.status(404).send('Book not found')
    book.title = req.body.title
    book.author = req.body.author
    res.send(book);
})

app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) res.status(404).send('Book not found')
    const index = books.indexOf(book);
    books.splice(index, 1)
    res.send(book)

})

app.listen(port, () => console.log(`http://localhost:${port}`));