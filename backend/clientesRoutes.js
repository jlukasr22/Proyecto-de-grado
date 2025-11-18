// backend/clientesRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('./clientesController');

// Montar rutas CRUD
router.route('/')
    .get(controller.obtenerClientes)
    .post(controller.crearCliente);

router.route('/:id')
    .put(controller.actualizarCliente)
    .delete(controller.eliminarCliente);

module.exports = router;