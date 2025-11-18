// backend/clientesController.js
const db = require('./db'); 

// Parámetros: nombre, apellido, email, telefono, direccion
const CLIENT_FIELDS = 'nombre, apellido, email, telefono, direccion';

// READ (Leer todos)
exports.obtenerClientes = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM clientes ORDER BY id DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// CREATE (Crear cliente)
exports.crearCliente = async (req, res) => {
    const { nombre, apellido, email, telefono, direccion } = req.body;
    try {
        if (!nombre || !apellido) {
            return res.status(400).json({ mensaje: 'Nombre y apellido son obligatorios.' });
        }
        
        const sql = `INSERT INTO clientes (${CLIENT_FIELDS}) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(sql, [nombre, apellido, email || null, telefono || null, direccion || null]);
        
        res.status(201).json({ 
            mensaje: 'Cliente creado con éxito.', 
            id: result.insertId 
        });

    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// UPDATE (Actualizar cliente)
exports.actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion } = req.body;
    try {
        if (!nombre || !apellido || !id) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
        }

        const sql = `UPDATE clientes SET nombre=?, apellido=?, email=?, telefono=?, direccion=? WHERE id=?`;
        const [result] = await db.execute(sql, [nombre, apellido, email || null, telefono || null, direccion || null, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Cliente actualizado con éxito.' });

    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// DELETE (Eliminar cliente)
exports.eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM clientes WHERE id = ?';
        const [result] = await db.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Cliente eliminado con éxito.' });

    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};