const router = require('express').Router();
const { User } = require('../db/user')

router.get('/', async(req, res, next) => {
    try {
        const user = await User.findAll()
        res.json(users)
    } catch (error) {
        next(error)
    }
})

module.exports = router