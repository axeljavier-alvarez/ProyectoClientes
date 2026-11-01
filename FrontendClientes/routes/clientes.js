
const express = require('express');
const axios = require('axios');

const router = express.Router();

// Configuración de la API REST .NET 10
const api = axios.create({
    baseURL: 'http://localhost:5238/api/Clientes',
    timeout: 10000
});

// ==========================================
// GET: obtener todos los clientes
// ==========================================
router.get('/', async (req, res) => {
    try {
        const respuesta = await api.get('');

        res.render('index', {
            clientes: respuesta.data,
            error: null,
            mensaje: req.query.mensaje || null
        });

    } catch (error) {
        console.error('===== ERROR DE AXIOS =====');
        console.error('Código:', error.code);
        console.error('Mensaje:', error.message);
        console.error('Estado HTTP:', error.response?.status);
        console.error('Respuesta:', error.response?.data);

        res.status(500).render('index', {
            clientes: [],
            error: 'No se pudieron obtener los clientes.',
            mensaje: null
        });
    }
});

// ==========================================
// POST: registrar un nuevo cliente
// ==========================================
router.post('/clientes/crear', async (req, res) => {
    try {
        const {
            cui,
            nit,
            nombres,
            apellidos,
            direccion,
            telefono,
            fecha_Nacimiento
        } = req.body;

        const nuevoCliente = {
            cui,
            nit,
            nombres,
            apellidos,
            direccion: direccion || null,
            telefono: telefono || null,
            fecha_Nacimiento
        };

        // Enviar datos a la API .NET
        await api.post('', nuevoCliente);

        // Redirigir con mensaje de éxito
        res.redirect('/?mensaje=creado');

    } catch (error) {
        console.error(
            'Error al registrar cliente:',
            error.response?.data || error.message
        );

        res.status(500).send(
            'No se pudo registrar el cliente. Revisa la terminal.'
        );
    }
});

// ==========================================
// PUT: actualizar cliente
// ==========================================
router.post('/clientes/editar/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        const clienteActualizado = {
            id_cliente: id,
            cui: req.body.cui,
            nit: req.body.nit,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion || null,
            telefono: req.body.telefono || null,
            fecha_Nacimiento: req.body.fecha_Nacimiento
        };

        // Actualizar cliente mediante la API .NET
        await api.put(`/${id}`, clienteActualizado);

        // Redirigir con mensaje de éxito
        res.redirect('/?mensaje=editado');

    } catch (error) {
        console.error(
            'Error al editar cliente:',
            error.response?.data || error.message
        );

        res.status(500).send(
            'No se pudo actualizar el cliente.'
        );
    }
});

// ==========================================
// DELETE: eliminar cliente
// ==========================================
router.post('/clientes/eliminar/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        // Eliminar cliente mediante la API .NET
        await api.delete(`/${id}`);

        // Redirigir con mensaje de éxito
        res.redirect('/?mensaje=eliminado');

    } catch (error) {
        console.error(
            'Error al eliminar cliente:',
            error.response?.data || error.message
        );

        res.status(500).send(
            'No se pudo eliminar el cliente.'
        );
    }
});

// Exportar las rutas
module.exports = router;
