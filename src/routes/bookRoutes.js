let express = require('express')
let chalk = require('chalk')
let sql = require('mssql')

let bookRouter = express.Router()

var router = (nav) => {
    let books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: "Lev Nikolayevich Tolstoy",
            read: false
        },
        {
            title: "Les Miserables",
            genre: "Historical Fiction",
            author: "Victor Hugo",
            read: false
        },
        {
            title: "A Journey into the Center of the Earth",
            genre: "Science Fiction",
            author: "Jules Verne",
            read: false
        },
        {
            title: "The Lord of The Rings",
            genre: "Fantasy",
            author: "J.R.R. Tolkien",
            read: false
        }
    ]
    bookRouter.route('/')
        .get((req, res) => {
            let request = new sql.Request()

            request.query('select * from books', (err, recordset) => {
                console.log(recordset)
            })
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: books
            })
        })

    bookRouter.route('/:id')
        .get((req, res) => {
            let id = req.params.id
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: books[id]
            })
        })
    return bookRouter
}

module.exports = router