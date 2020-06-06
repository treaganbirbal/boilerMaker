const db = require('./db');
const app = require('../server')
const port = provess.env.PORT || 3000;

db.sync().then(() => {
    app.listen(port)
})