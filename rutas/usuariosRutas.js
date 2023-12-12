var ruta = require("express").Router();
var { mostrarCompras } = require("../bd/compraBD"); 
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario,realizarCompra,buscarUsuarioID, borrarUsuario,login,obtenerDatosUsuarioPorId} = require("../bd/usuariosBD");
var {mostrarProductos,modificarProducto,borrarProducto,buscarPorIdP} = require("../bd/productosBD");
var {nuevoProducto} = require("../bd/productosBD");
var subirArchivo = require("../middlewares/middlewares").subirArchivo;
var{autorizado}=require("../middlewares/password");
var fs = require('fs').promises;


ruta.get("/login",async (req,res)=>{
    res.render("usuarios/login")
})
ruta.get("/", autorizado,async(req,res)=>{
    res.redirect("/login");
  });

  ruta.get("/inicio/:id", autorizado,async(req,res)=>{
   var user = await buscarUsuarioID(req.params.id);
   if (user) {
       res.render("usuarios/inicio", {user});
   } else {
       console.log("Usuario no existe");
   }
});

ruta.post("/login",async(req,res)=>{
    var user=await login(req.body);
    if(user==undefined){
       res.redirect("/login");
       console.log("USUARIO INDEFINIDO");
    }else{
       if(user.admin){
          console.log("Administrador");
          req.session.admin=req.body.usuario;
          res.redirect("/home/" + user.id);
       }else{
          console.log("Usuario");
          req.session.usuario=req.body.usuario;
          res.redirect("/inicio/" + user.id);
       }
    }
 });

/*ruta.post("/login",async(req,res)=>{
    var user=await login(req.body);
    if(user==undefined){
       res.redirect("/login")
       console.log("Usuario no Valido"); 
    }else{
       if(user.admin){
          console.log("Administrador");
          req.session.admin=req.body.usuario;
          res.redirect("/home");
       }else{
          console.log("Usuario");
          req.session.usuario=req.body.usuario;
          res.redirect("/inicio/" + user.id);
       }
    }
 });*/

ruta.get("/registrarse", async (req, res) => {
    res.render("usuarios/registrate");
})

ruta.get("/menu",async (req,res)=>{
    var user = await buscarUsuarioID(req.params.id);
    res.render("templat/menu.ejs",{user});
})

ruta.post("/registrarse",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoUsuario(req.body);
    res.redirect("/");
});


ruta.get("/nosotros/:id", async (req,res) => { 
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/nosotros",{user});
})

ruta.get("/comprar/:id",autorizado, async (req, res) => {
    var products = await mostrarProductos();
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/productos", {products,user}) ;
   
});


ruta.get("/ubicacion/:id" , async (req,res) => {
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/ubicacion",{user});
})

ruta.get("/editarPerfil/:id", async (req, res) => {
    const usuario = await buscarPorId(req.params.id);
    res.render("usuarios/editarPerfil",{usuario});
});

ruta.post("/editarUsuario",subirArchivo(),async(req,res)=>{
    //console.log("req.body");
    if(req.file!=undefined){
        req.body.foto = req.file.originalname;
    }

    else{
        req.body.foto = req.body.fotoVieja;
    }
    var userId = req.body.id;
    var user=await modificarUsuario(req.body);
    console.log("MODIFICADO");
    res.redirect("/perfil/"+ userId);
 });

 
 ruta.get("/perfil/:id", async (req, res) => {
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/perfil", {user});
 });
 




ruta.get("/cerrarSesion",(req,res)=>{
    req.session=null;
    res.redirect("/login");
 });

ruta.get("/borrarPerfil/:id",async(req,res)=>{
    await borrarUsuario(req.params.id);
    res.render("usuarios/borrarPerfil");
})

//RUTAS DE LAS CAREGORIAS DE COMIDAAAA
ruta.get("/bebidas/:id" , async (req,res) => {
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/bebidas",{user});
})

ruta.get("/dulces/:id" , async (req,res) => {
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/dulces",{user});
})

ruta.get("/galletas/:id" , async (req,res) => {
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/galletas",{user});
})

ruta.get("/comidaR/:id" , async (req,res) => {
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/comidaR",{user});
})

ruta.get("/helados/:id" , async (req,res) => {
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/helados",{user});
})

ruta.get("/chicles/:id" , async (req,res) => {
    var user = await buscarUsuarioID(req.params.id);
    res.render("usuarios/chicles",{user});
})


//RUTA DE ADMINISTRADOR

ruta.get("/home/:id" , autorizado,async (req,res) => {
    var admin = await buscarUsuarioID(req.params.id);
    res.render("administrador/home",{admin});
});


ruta.get("/perfilAdmin" , async (req,res) => {
    res.render("administrador/perfilAdmin");
});


ruta.get("/productos", async (req, res) => {
    var products = await mostrarProductos();
    res.render("administrador/mostrarProd", { products });
    
});

ruta.get("/nuevoProd",(req,res)=>{
    res.render("administrador/nuevoProd");
});

ruta.post("/nuevoProd", subirArchivo(), async (req, res) => {
    req.body.foto = req.file.originalname;
    var produc = await nuevoProducto(req.body);
    res.redirect("/productos");
});



ruta.get("/editarProducto/:id", async(req,res)=>{
    var producto=await buscarPorIdP(req.params.id);
    res.render("administrador/editarProducto",{producto});
});

ruta.post("/editarProducto",subirArchivo(),async(req,res)=>{
    if(req.file!=undefined){
        req.body.foto = req.file.originalname;
    }

    else{
        req.body.foto = req.body.fotoVieja;
    }
    var producto=await modificarProducto(req.body);
    console.log({producto});
    res.redirect("/productos");
 });

ruta.get("/borrarProducto/:id",async(req,res)=>{
    await borrarProducto(req.params.id);
    res.redirect("/productos");
})

ruta.post("/realizarCompra", async (req, res) => {
    try {

        console.log(req.body);

        const datosCompra = {
            idUsuario:req.body.id,
            nombreUsuario:req.body.nombre,
            producto: req.body.producto,
            tamaño: req.body.tamaño,
            cantidad: req.body.cantidad,
        };

        // Realiza la transacción en la base de datos
        const resultadoCompra = await realizarCompra(datosCompra);

        if (resultadoCompra.success) {
            res.send("COMPRA REALIZADA CON EXITO, PUEDES REGRESAR DE PÁGINA;)")
            console.log(datosCompra);
        } else {
            res.status(500).send("Error al realizar la compra");
        }
    } catch (error) {
        console.log("Error en la ruta de realizarcompra", error);
        res.status(500).send("Error interno del servidor");
    }
});

ruta.get("/gestionarVentas" , async (req,res) => {
    var compras = await mostrarCompras();
    res.render("administrador/gestion",{compras});
});






module.exports = ruta;