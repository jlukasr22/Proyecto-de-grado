// backend/serviciosRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('./serviciosController');

// GET all and POST (CREATE)
router.route('/')
    .get(controller.obtenerServicios)
    .post(controller.crearServicio);

// GET one, PUT (UPDATE) and DELETE
router.route('/:id')
    .put(controller.actualizarServicio)
    .delete(controller.eliminarServicio);

module.exports = router;