const express = require('express');
const isAuth = require('../middleware/isAuth');
const { createQuestion } = require('../controllers/questionController');

const router = express.Router();

router.use(isAuth);

router.route('/').post(createQuestion);

// router.route('/').post(createQuestion);
// router.route('/:id').get().patch().delete();

module.exports = router;
