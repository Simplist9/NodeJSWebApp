let express = require('express')
let chalk = require('chalk')
let sql = require('mssql')
let config = {
    user: 'simplist',
    password: '1f644374',
    server: 'localhost\\SIMPLISTSQL',
    database: 'Books',
    //port: '1433',

    options: {
        //instanceName: 'SQLEXPRESS',
        encrypt: true
    }
}

sql.connect(config, (err) => {
    console.log(err)
})

let app = express()

let port = process.env.PORT || 5000
let nav = [{
    Link: '/Books',
    Text: 'Book'
},
{
    Link: '/Authors',
    Text: 'Author'
}]
let bookRouter = require('./src/routes/bookRoutes')(nav)

app.use(express.static('public')) // de fiecare data cand se face un request pentru ceva, primul lucru pe care il va face
// express este sa caute in public dir si sa gaseasca ce se cauta.
app.set('views', './src/views')

app.set('view engine', 'ejs')

app.use('/Books', bookRouter)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    })
})

app.get('/books', (req, res) => {
    res.send('Hello Books!')
})

app.listen(port, (err) => {
    console.log(chalk.green(`Running server on port ${port}`))
})