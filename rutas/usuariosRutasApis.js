const express = require("express");
const router = express.Router();
const {
    mostrarUsuarios,
    nuevoUsuario,
    buscarPorId,
    modificarUsuario,
    borrarUsuario
} = require("../bd/usuariosBD");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await mostrarUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

// Crear un nuevo usuario
router.post("/nuevousuario", async (req, res) => {
    try {
        // Aquí iría la lógica para crear un nuevo usuario utilizando req.body
        // y luego llamar a la función correspondiente en usuariosBD
        res.status(200).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear usuario" });
    }
});

// Buscar un usuario por ID
router.get("/buscarUsuarioPorId/:id", async (req, res) => {
    try {
        const usuario = await buscarPorId(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al buscar usuario por ID" });
    }
});

// Editar un usuario por ID
router.post("/editarUsuario/:id", async (req, res) => {
    try {
        // Aquí iría la lógica para editar un usuario utilizando req.body
        // y luego llamar a la función correspondiente en usuariosBD
        res.status(200).json({ message: "Usuario editado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al editar usuario" });
    }
});

// Borrar un usuario por ID
router.get("/borrarUsuario/:id", async (req, res) => {
    try {
        const deletedUsuario = await borrarUsuario(req.params.id);
        if (deletedUsuario) {
            res.status(200).json({ message: "Usuario eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado para eliminar" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al borrar usuario" });
    }
});

module.exports = router;
