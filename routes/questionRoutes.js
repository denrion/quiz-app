const express = require('express');
const isAuth = require('../middleware/isAuth');
const { createQuestion } = require('../controllers/questionController');
const setUserIdFromRequest = require('../middleware/setUserIdFromRequest');

const router = express.Router();

router.use(isAuth);

router.route('/').post(setUserIdFromRequest, createQuestion);

// router.route('/').post(createQuestion);
// router.route('/:id').get().patch().delete();

module.exports = router;
