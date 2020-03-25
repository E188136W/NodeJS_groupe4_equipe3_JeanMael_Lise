const express = require('express');
const router = express.Router();

const BreweryController = require('../../controller/breweryController');
const breweryController = new BreweryController();

//route afficher toutes les brasserie
router.get('/', function (req, res) {
    breweryController.findAll(res);
});

//selon un id
router.get('/:id', function (req, res) {
    breweryController.findById(req, res)
});

//censé crée brasserie ne fonctionne pas
router.post('/', function (req, res) {
    breweryController.create(req,res);
});

//censé modifier 
router.put('/:id', function (req, res) {
    breweryController.update(req, res)
});

router.delete('/:id', function (req, res) {
    breweryController.deleteById(req, res)
});

module.exports = router;