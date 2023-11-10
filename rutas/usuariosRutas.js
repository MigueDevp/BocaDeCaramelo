var ruta = require("express").Router();
//var { validarUsuarioYContraseña } = require("../middlewares/validar");
//var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario,login} = require("../bd/usuariosBD");
var {mostrarProductos} = require("../bd/productosBD");

//RUTA PRINCIPAL DE TODA LA PAGINA, DE AQUI INICIAN SESION LOS USUARIOS Y EL ADMINISTRADOR XD
/*ruta.get("/", async (req, res) => {
    res.render("usuarios/login");
})*/

ruta.get("/", async (req, res) => {
    var products = await mostrarProductos();
    console.log(products);
    res.render("usuarios/inicio",{products});
})

ruta.get("/inicio", async (req,res) => { 
    res.render("usuarios/inicio");
})

ruta.get("/nosotros", async (req,res) => { 
    res.render("usuarios/nosotros");
})

ruta.get("/comprar", async (req, res) => {
    var products = await mostrarProductos();
    res.render("usuarios/productos", { products });
    console.log(products);
});

ruta.get("/ubicacion" , async (req,res) => {
    res.render("usuarios/ubicacion");
})

ruta.get("/cerrarSesion" , async (req,res) => {
    res.render("usuarios/login");
})





module.exports = ruta;