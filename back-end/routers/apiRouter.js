const router = require('express').Router();

router.use('/hello', (req, res) => {
    res.json('Hello World');
})

module.exports = router;