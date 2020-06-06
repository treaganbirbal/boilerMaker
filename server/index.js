const express = require('express')
const app = express();

const morgan = require('morgan')

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client')))

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', require('./routes'))

app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Your server is listening on port ${port}`)
})