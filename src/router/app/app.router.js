const router = require('express').Router();

router.use('*', (req, res) => {
  res.send('<h1>Here you will see the front app. Please come back in few days!</h1>');
});

module.exports = router;