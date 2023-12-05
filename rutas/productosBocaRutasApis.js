const express = require("express");
const router = express.Router();
const {
    mostrarProductos,
    nuevoProducto,
    buscarPorId,
    modificarProducto,
    borrarProducto
} = require("../bd/productosBD");

// Obtener todos los productos
router.get("/mostrarProductos", async (req, res) => {
    try {
        const productos = await mostrarProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Crear un nuevo producto
router.post("/nuevoProducto", async (req, res) => {
    try {
        // Lógica para crear un nuevo producto usando req.body
        // y luego llamar a la función correspondiente en productosBD
        res.status(200).json({ message: "Producto creado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear producto" });
    }
});

// Buscar un producto por ID
router.get("/buscarProductoPorId/:id", async (req, res) => {
    try {
        const producto = await buscarPorId(req.params.id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al buscar producto por ID" });
    }
});

// Editar un producto por ID
router.post("/editarProducto/:id", async (req, res) => {
    try {
        // Lógica para editar un producto usando req.body
        // y luego llamar a la función correspondiente en productosBD
        res.status(200).json({ message: "Producto editado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al editar producto" });
    }
});

// Borrar un producto por ID
router.get("/borrarProducto/:id", async (req, res) => {
    try {
        const deletedProducto = await borrarProducto(req.params.id);
        if (deletedProducto) {
            res.status(200).json({ message: "Producto eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Producto no encontrado para eliminar" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al borrar producto" });
    }
});

module.exports = router;
