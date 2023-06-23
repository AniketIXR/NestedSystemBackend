const express = require('express');
const { createUser,updateUser } = require('../controller/userController');
const app = express();
const router = express.Router();

app.use(express.json());

router.route('/').post(createUser);

router.route('/:id').patch(updateUser);

module.exports = router;