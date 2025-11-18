// backend/serviciosController.js
const db = require('./db'); // Asume que './db' maneja tu pool de conexión MariaDB

// 1. READ (Leer todos los servicios)
exports.obtenerServicios = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM servicios ORDER BY id DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// 2. CREATE (Crear un nuevo servicio)
exports.crearServicio = async (req, res) => {
    const { nombre, imagen, precio, descripcion } = req.body;
    try {
        if (!nombre || !precio) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios (nombre, precio).' });
        }
        
        const sql = 'INSERT INTO servicios (nombre, imagen, precio, descripcion) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(sql, [nombre, imagen, precio, descripcion]);
        
        res.status(201).json({ 
            mensaje: 'Servicio creado con éxito.', 
            id: result.insertId 
        });

    } catch (error) {
        console.error('Error al crear servicio:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// 3. UPDATE (Actualizar un servicio existente)
exports.actualizarServicio = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen, precio, descripcion } = req.body;
    try {
        if (!nombre || !precio || !id) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
        }

        const sql = 'UPDATE servicios SET nombre = ?, imagen = ?, precio = ?, descripcion = ? WHERE id = ?';
        const [result] = await db.execute(sql, [nombre, imagen, precio, descripcion, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Servicio no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Servicio actualizado con éxito.' });

    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// 4. DELETE (Eliminar un servicio)
exports.eliminarServicio = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM servicios WHERE id = ?';
        const [result] = await db.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Servicio no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Servicio eliminado con éxito.' });

    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};