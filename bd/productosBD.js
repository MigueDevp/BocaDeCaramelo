var conexion =require("./conexion").conexionProductos;
var Producto=require("../modelos/Producto");

async function mostrarProductos(){
    var products=[];
    try{
        var productosBD= await conexion.get();
        productosBD.forEach(producto =>{
        
         var producto1=new Producto(producto.id,producto.data())
     if (producto1.bandera==0){
        products.push(producto1.obtenerProducto);
     }
    })
    }catch(err){
        console.log("Error al mostrar productos "+err); 
     }
    
     return products;
    
}
async function nuevoProducto(newProducts){
    var error=0
    try{
        var producto1=new Producto(null,newProducts);
        console.log("Datos recibidos:", producto1); 
        if(producto1.bandera==0){
            conexion.doc().set(producto1.obtenerProducto);
            error=0;
        }
        else{
            console.log("datos incorrectos");
        }
       
    }
    catch(err){
        console.log("error al crear producto"+err);
    }
    return error;
 }
 
 /*async function buscarPorIdP(id){
    var produc;
    try{
        var productoBD=await conexion.doc(id).get();
        var productoObjeto=new Producto(productoBD.id, productoBD.data());
        if(productoObjeto.bandera==0){
            produc=productoObjeto.obtenerProducto;
        }
    }
    catch(err){
        console.log("Error al recuperar el usuario "+err);
    }
    return  produc;
 } */


async function buscarPorIdP(id) {
    var product;
    try {
        var producto = await conexion.doc(id).get();
        var productoObjeto = new Producto(producto.id, producto.data());
        if (productoObjeto.bandera == 0) {
            product = productoObjeto.obtenerProducto;
            console.log("Se buscó correctamente el producto (FUNCION BUSCAR POR ID)");
        }
    } catch (err) {
        console.log("Error al buscar al producto (FUNCION BUSCAR POR ID)" + err);
        product = null;
    }
    return product;
}





 /*async function buscarPorIdP(id){
    try {
        if (!id) {
            console.log("ID no válido:", id);
            throw new Error("ID no válido");
        }

        var productoBD = await conexion.doc(id).get();

        if (!productoBD.exists) {
            console.log("El usuario no existe:", id);
            return null; // O puedes lanzar un error según tus necesidades
        }

        var productoObjeto = new Producto(productoBD.id, productoBD.data());

        if (productoObjeto.bandera !== 0) {
            console.log("El usuario no es válido:", productoObjeto);
            return null; // O puedes lanzar un error según tus necesidades
        }

        return productoObjeto.obtenerProducto;
    } catch (err) {
        console.log("Error al recuperar el producto (función buscarPorId):", err);
        throw err; // Propaga el error para que pueda ser manejado en el contexto superior
    }
}*/
 async function modificarProducto(datos){
    var error=1;
    var produc=await buscarPorIdP(datos.id);
    if(produc!=undefined){ 
    var produc=new Producto(datos.id, datos);
        if(produc.bandera==0){
            try{
                await conexion.doc(produc.id).set(produc.obtenerProducto);
                console.log("los datos se modificaron correctamente");
                error=0;
            }
            catch(err){
                console.log("Error al modificar al producto"+err);
                    
            }
        }else{
            console.log("Error los datos no son vlaidos");
        }       
    }
    return error;
}

async function login(datos) {
    var user;
    var usuarioBd = await conexion.where("usuario", "==", datos.usuario).get();

    if (usuarioBd.empty) {
        console.log("Usuario no existe");
        return user;
    } else {
        usuarioBd.forEach((doc) => {
            var validP = validarPassword(datos.password, doc.data().salt, doc.data().password);

            if (validP === false) {
                console.log("Contraseña incorrecta");
                user = 0; // Usuario no autenticado
            } else {
                console.log("Inicio de sesión exitoso");

                // Verificar si es un administrador
                if (datos.usuario === "admin" && datos.password === "admin") {
                    user = 2; // Administrador
                } else {
                    user = 1; // Usuario normal
                }
            }
        });
    }

    return user;
}


 async function borrarProducto(id){
    var error=1;
    var produc=await buscarPorIdP(id);
    if(produc!=undefined){ 
    try{
        await conexion.doc(id).delete();
        console.log("Registro borrado");
            error=0;

    }
    catch(err){
        console.log("Error al borrar el usuario"+err);
    }
}
return error;
 }

 module.exports={
    mostrarProductos,
    nuevoProducto,
    buscarPorIdP,
    modificarProducto,
    borrarProducto,
    login
 };