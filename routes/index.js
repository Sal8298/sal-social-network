const router = require('express').Router();
const apiRoutes = require('./api');

router.use((req, res) => res.send('This is the wrong route!'));

module.exports = router;
  