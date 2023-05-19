const express = require("express");
const { body } = require("express-validator");

const genreController = require("../controllers/genre");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get('/all',  genreController.getAllGenres);
router.post('/create',  genreController.createGenre);

module.exports = router;
