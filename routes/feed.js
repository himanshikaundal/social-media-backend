const express = require('express');
const { getAll } = require('../controllers/feedController');

const feedController = require('../controllers/feedController');

const router = express.Router();

// router.post('/feeds', feedController.create);
// router.get('/feeds', feedController.getAll);
// router.get('/feeds/:id', feedController.get);
// router.put('/feeds/:id', feedController.update);
// router.delete('/feeds/:id', feedController.delete);

router.route('/feeds').post(feedController.create)
    .get(feedController.getAll)
  

router.route('/feeds/:id')
    .put(feedController.update)
    .delete(feedController.delete)

module.exports = router;