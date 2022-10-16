const express = require('express');
const router  = express.Router();
const teaController = require('../controllers/controller.js');
const JWTAuth = require('../JWT/jwtAuth');

router.get('/', teaController.home);
router.post('/login', teaController.login);
router.post('/register', teaController.register);
router.post('/add-stud', teaController.addStudent);
router.post('/add-favs', teaController.addTeacher);
router.post('/get-all',  teaController.getAllTeachers);
router.post('/get-favs', teaController.getFavTeachers);
router.post('/get-score', teaController.getAggScore);

// router.get('/tea/:name', teaController.getOneTea);
// router.post('/tea/:name', teaController.newComment);
// router.delete('/tea/:name', teaController.deleteOneTea);

module.exports = router;
