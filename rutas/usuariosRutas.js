var ruta = require("express").Router();
var { mostrarCompras } = require("../bd/compraBD"); 
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario,realizarCompra, borrarUsuario,login,obtenerDatosUsuarioPorId} = require("../bd/usuariosBD");
var {mostrarProductos,modificarProducto,borrarProducto,buscarPorIdP} = require("../bd/productosBD");
var {nuevoProducto} = require("../bd/productosBD");
var subirArchivo = require("../middlewares/middlewares").subirArchivo;


//RUTA PRINCIPAL DE TODA LA PAGINA, DE AQUI INICIAN SESION LOS USUARIOS Y EL ADMINISTRADOR XD
ruta.get("/", async (req, res) => {
    res.render("usuarios/login");
})


ruta.post("/login", async (req, res) => {
    const user = await login(req.body);

    if (user === 1) {
        res.render("usuarios/inicio");
    } else if (user === 2) {
         
        res.render("administrador/home");
        

    } else if (user === 0) {
        res.status(400).render("error", { error: "Contraseña no válida" });
    } else {
        res.status(400).render("error", { error: "El usuario no existe" });
    }
});

ruta.get("/registrarse", async (req, res) => {
    res.render("usuarios/registrate");
})

ruta.post("/registrarse",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoUsuario(req.body);
    res.redirect("/");
});



ruta.get("/inicio", async (req,res) => { 
    var user = await mostrarUsuarios();
    res.render("usuarios/inicio",{user});
})

ruta.get("/nosotros", async (req,res) => { 
    res.render("usuarios/nosotros");
})

ruta.get("/comprar", async (req, res) => {
    var products = await mostrarProductos();
    res.render("usuarios/productos", {products}) ;
   
});



ruta.get("/ubicacion" , async (req,res) => {
    res.render("usuarios/ubicacion");
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
    var usuario=await modificarUsuario(req.body);
    console.log("usuario",{usuario});
    res.redirect("/perfil");
 });

ruta.get("/perfil", async (req, res) => {
    try {
        const usuarios = await mostrarUsuarios();
        
        if (usuarios.length > 0) {
            const user = usuarios[0];
            res.render("usuarios/perfil", { user });
            console.log(user);
        } else {
            res.status(400).render("error", { error: "No hay usuarios disponibles" });
        }
    } catch (err) {
        res.status(500).render("error", { error: "Error al cargar el perfil" });
    }
});


ruta.get("/cerrarSesion" , async (req,res) => {
    res.render("usuarios/login");
})

ruta.get("/borrarPerfil/:id",async(req,res)=>{
    await borrarUsuario(req.params.id);
    res.render("usuarios/borrarPerfil");
})

//RUTAS DE LAS CAREGORIAS DE COMIDAAAA
ruta.get("/bebidas" , async (req,res) => {
    res.render("usuarios/bebidas");
})

ruta.get("/dulces" , async (req,res) => {
    res.render("usuarios/dulces");
})

ruta.get("/galletas" , async (req,res) => {
    res.render("usuarios/galletas");
})

ruta.get("/comidaR" , async (req,res) => {
    res.render("usuarios/comidaR");
})

ruta.get("/helados" , async (req,res) => {
    res.render("usuarios/helados");
})

ruta.get("/chicles" , async (req,res) => {
    res.render("usuarios/chicles");
})

ruta.get("/home" , async (req,res) => {
    res.render("administrador/home");
});

//RUTA DE ADMINISTRADOR

ruta.get("/home" , async (req,res) => {
    res.render("administrador/home");
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
        const datosCompra = {
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