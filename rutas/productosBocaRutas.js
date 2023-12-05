var subirArchivo = require("../middlewares/middlewares").subirArchivo;
const { mostrarProductos, nuevoProducto, buscarPorId, modificarProducto, borrarProducto,login } = require("../bd/productosBD");

var ruta1=require("express").Router();

ruta1.get("/productos", async (req, res) => {
     var products = await mostrarProductos();
     res.render("administrador/productos", { products });
     console.log(products);
 });

/*ruta1.get("/inicio",async(req,res)=>{
     var produc=await mostrarProductos();
     //console.log(users);
     //res.end();
     res.render("adminsitrador/inicio",{produc});
});*/



ruta1.get("/nuevoProd",(req,res)=>{
     res.render("administrador/nuevoProd");
});

ruta1.get("/nuevoProd",(req,res)=>{
     res.render("administrador/nuevoProd");
});

ruta1.post("/nuevoProd", subirArchivo(), async (req, res) => {
     req.body.foto = req.file.originalname;
     var produc = await nuevoProducto(req.body);
     res.redirect("/");
 });
ruta1.get("/editarProducto/:id", async(req,res)=>{
     var produc=await buscarPorId(req.params.id);
     res.render("productos/modificarPro",{produc});
});

ruta1.post("/editarproducto",async(req,res)=>{
     var produc=await modificarProducto(req.body);
     res.redirect("/listaProductos");
})
ruta1.get("/borrarProducto/:id",async(req,res)=>{
     await borrarProducto(req.params.id);
     res.redirect("/listaProductos");
})

module.exports=ruta1;