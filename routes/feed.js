const express = require('express');
const { getAll } = require('../controllers/feedController');
const auth=require('../middlewares/auth');
const upload=require('../utils/multerHandler');
const feedController = require('../controllers/feedController');

const router = express.Router();

// router.post('/feeds', feedController.create);
// router.get('/feeds', feedController.getAll);
// router.get('/feeds/:id', feedController.get);
// router.put('/feeds/:id', feedController.update);
// router.delete('/feeds/:id', feedController.delete);

router.route('/feeds').post(auth,upload.array('media'),feedController.create)
    .get(feedController.getAll)

router.route('/feeds/:id')
    .put(auth,feedController.update)
    .delete(auth,feedController.delete)

module.exports = router;