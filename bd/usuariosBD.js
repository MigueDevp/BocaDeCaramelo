
var conexion = require("./conexion").conexionUsuarios;
var conexionVentas=require("./conexion").conexionVentas;
var Usuario = require("../modelos/Usuario");
var Producto=require("../modelos/Producto");
var {generarPassword} = require("../middlewares/password");
var {validarPassword} = require("../middlewares/password");

//FUNCION PARA MOSTRAR A LOS USUARIOS DE LA PAGINA
async function mostrarUsuarios(){
    
    var users=[];
 try{
    var usuarios= await conexion.get();
    usuarios.forEach(usuario =>{
     var usuario1=new Usuario(usuario.id,usuario.data())
     if (usuario1.bandera == 0){
         users.push(usuario1.obtenerUsuario);
     }
    })
 }
 catch(err){
    console.log("Error en mostrar usuarios"+err); 
 }
 return users;
}


/*async function login(datos){
    var user;
    var usuarioBd = await conexion.where("usuario","==",datos.usuario).get();
    if(usuarioBd.empty){
        console.log("usuario no existe");
        return user;
    }else{
        usuarioBd.forEach((doc) => {
            var validP = validarPassword(datos.password,doc.data().salt,doc.data().password);
            if(validP===false){
                console.log("PASSWORD INCORRECTO");
                user=0; //return user;
            }else{
                console.log("INICIO DE SESION EXITOSO")
                user=1;
            }

             if (datos.usuario === "admin" && datos.password === "admin") {
                user = 2; 
            } else {
                user = 1; 
            }
        });
    }
    return user;
}*/


/*async function login(datos){
    var user = undefined;
    var usuarioObjeto;
    try{
        var usuarios = await conexion.where('usuario','=',datos.usuario).get();
        if(usuarios.empty){
            console.log("indefinido");
            return undefined;
        } 
        usuarios.docs.filter((doc)=>{
            var validar = validarPassword(datos.password,doc.data().password,doc.data().salt);
            if(validar){
                usuarioObjeto = new Usuario(doc.id,doc.data());
                if(usuarioObjeto.bandera==0){ 
                    user=usuarioObjeto.obtenerUsuario;
                }
            }
            else 
                return undefined;
        });
    }
    catch(err){
        console.log("Error al recuperar al usuario: "+ err);
    }
    return user;
}*/
async function login(datos) {
    var user = undefined;
    var usuarioObjeto;

    try {
        var usuarios = await conexion.where('usuario', '=', datos.usuario).get();

        if (usuarios.empty) {
            console.log("indefinido");
            return undefined;
        }

        usuarios.docs.forEach((doc) => {
            var validar = validarPassword(datos.password, doc.data().password, doc.data().salt);
            console.log("se esta comparando");
            if (validar) {
                usuarioObjeto = new Usuario(doc.id, doc.data());
                
                if (usuarioObjeto.bandera === 0) {
                    user = usuarioObjeto.obtenerUsuario;
                }
            } else {
                return undefined;
                
            }
        });
    } catch (err) {
        console.log("Error al recuperar al usuario: " + err);
    }

    return user;
}





//FUNCION PARA CREAR UN NUEVO USUARIO
/*async function nuevoUsuario(datos){
    var {salt,hash}=generarPassword(datos.password);
    datos.salt=salt;
    datos.password=hash;
    var error=0
    try{
        var usuario1=new Usuario(null,datos);
        if(usuario1.bandera==0){
            conexion.doc().set(usuario1.obtenerUsuario);
            console.log("Se ha creado correctamente el usuario");
            console.log(usuario1);
            error=0;

        }
        else{
            console.log("datos incorrectos");
        }
       
    }
    catch(err){
        console.log("error al crear usuario"+err);
        
    }
    return error;
 }*/

 async function nuevoUsuario(datos){
    var{salt,hash}=generarPassword(datos.password);
    datos.password=hash;
    datos.salt=salt;
   datos.admin=false;

   const existeUsuario = await usuarioExiste(datos.usuario);

   if (existeUsuario) {
       console.log("El usaurio ya existe en la base de datos");
       return {
           error: 1
       };
   }

   var usuario=new Usuario(null,datos);
   var error=1;
   if(usuario.bandera==0){
       try{
           await conexion.doc().set(usuario.obtenerUsuario);
           console.log("Usuario registrado Correctamente");
           error=0;
       }catch(err){
           console.log("Error al registrar el usuario"+err);
       }
   }
   return error;
}


 /*async function buscarPorId(id){
    var usuario;
    try{
        var usuarioBD=await conexion.doc(id).get();
        //var usuarioBD=await conexion.where("usuario","==","datos.usuario").get();

        var usuarioObjeto=new Usuario(usuarioBD.id, usuarioBD.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerUsuario;
        }
    }
    catch(err){
        console.log("Error al recuperar el usuario (funcion buscarPorId) "+err);
    }
    return usuario;
 } */



//FUNCION PARA BUSCAR POR ID UN USUARIO EN LA PAGINA
 /*async function buscarPorId(id){
    var usuarioObjeto1;
    try{
        var usuarioBD=await conexion.doc(id).get();
        var usuarioObjeto1=new Usuario(usuarioBD.id, usuarioBD.data());
        if(usuarioObjeto1.bandera==0){
            user=usuarioObjeto1.obtenerUsuario;
        }
    }
    catch(err){
        console.log("Error al recuperar el usuario (funcion buscarPorId) "+err);
    }
    return usuarioObjeto1;
}*/

async function buscarUsuarioID(id){
    var user;
    try{
        var usuario=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario(usuario.id, usuario.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerUsuario;
            console.log("Se busco correctamente el usuario");
        }
    }catch(err){
        console.log("Error al buscar al usuario"+err);
        user = null;
    }
    return user;
}
async function buscarPorId(id){
    try {
        if (!id) {
            console.log("ID no válido:", id);
            throw new Error("ID no válido");
        }

        var usuarioBD = await conexion.doc(id).get();

        if (!usuarioBD.exists) {
            console.log("El usuario no existe:", id);
            return null; // O puedes lanzar un error según tus necesidades
        }

        var usuarioObjeto1 = new Usuario(usuarioBD.id, usuarioBD.data());

        if (usuarioObjeto1.bandera !== 0) {
            console.log("El usuario no es válido:", usuarioObjeto1);
            return null; // O puedes lanzar un error según tus necesidades
        }

        return usuarioObjeto1.obtenerUsuario;
    } catch (err) {
        console.log("Error al recuperar el usuario (función buscarPorId):", err);
        throw err; // Propaga el error para que pueda ser manejado en el contexto superior
    }
}


/*async function buscarPorId(id) {
    try {
        if (!id || typeof id !== 'string') {
            console.log("ID no válido:", id);
            throw new Error("ID no válido");
        }

        var usuarioBD = await conexion.doc(id).get();

        if (!usuarioBD.exists) {
            console.log("El usuario no existe:", id);
            return null; // O puedes lanzar un error según tus necesidades
        }

        var usuarioObjeto = new Usuario(usuarioBD.id, usuarioBD.data());

        if (usuarioObjeto.bandera !== 0) {
            console.log("El usuario no es válido:", usuarioObjeto);
            return null; // O puedes lanzar un error según tus necesidades
        }

        return usuarioObjeto;
    } catch (err) {
        console.log("Error al recuperar el usuario (función buscarPorId):", err);
        throw err; // Propaga el error para que pueda ser manejado en el contexto superior
    }
}*/

//FUNCION PARA MODIFICAR UN USUARIO
 /*async function modificarUsuario(datos){
    var error=1;
    var usuario=await buscarPorId(datos.id);
    if(usuario!=undefined){ 
    var usuario=new Usuario(datos.id, datos);
        if(usuario.bandera==0){
            if(datos.password==""){
                datos.password=datos.passwordAnterior;
            }

            else{
                var {salt,hash}=generarPassword(datos.password);
                datos.salt=salt;
                datos.password=hash;
            }
            
            try{
                await conexion.doc(usuario.id).set(usuario.obtenerUsuario);
                console.log("Los datos se modificaron correctamente");
                error=0;
            }
            catch(err){
                console.log("Error al modificar al usuario"+err);
                    
            }
        }else{
            console.log("Error los datos no son vlaidos");
        }
    }
        return error;
}*/

async function modificarUsuario(datos) {
    try {
        // Obtener el usuario existente
        var user = await buscarUsuarioID(datos.id);

        if (user) {
            // Comprobar si datos.password está presente y procesarlo si es necesario
            if (datos.password) {
                if (Array.isArray(datos.password)) {
                    datos.password = datos.password.join('');
                }

                if (typeof datos.password !== 'string') {
                    console.log("Error: datos.password is not a valid string");
                    console.log("Value of datos.password:", datos.password);
                    return 1; // Otra opción sería lanzar un error en lugar de devolver 1
                }

                var { salt, hash } = generarPassword(datos.password);
                datos.password = hash;
                datos.salt = salt;
            } else {
                // Si no se proporciona nueva contraseña, mantener la actual
                datos.password = user.password;
                datos.salt = user.salt;
            }

            // Mantener el valor actual de "admin" si no se proporciona uno nuevo
            datos.admin = typeof datos.admin !== 'undefined' ? datos.admin : user.admin;

            // Crear el objeto Usuario modificado
            var modifiedUser = new Usuario(datos.id, datos);

            if (modifiedUser.bandera === 0) {
                // Actualizar el documento en Firestore
                await conexion.doc(modifiedUser.id).set(modifiedUser.obtenerUsuario);
                console.log("Usuario actualizado");
                return 0;
            } else {
                console.log("Error en los datos del usuario");
                return 1;
            }
        } else {
            console.log("Error: Usuario no encontrado");
            return 1;
        }
    } catch (err) {
        console.log("Error al modificar usuario: " + err);
        return 1;
    }
}

//FUNCION PARA BORRAR UN USUARIO
 async function borrarUsuario(id){
    var error=1;
    var usuario=await buscarPorId(id);
    if(usuario!=undefined){
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



 async function realizarCompra(datosCompra) {
    try {
        await conexionVentas.add({
            idUsuario:datosCompra.idUsuario,
            nombreUsuario:datosCompra.nombreUsuario,
            producto: datosCompra.producto,
            tamaño: datosCompra.tamaño,
            cantidad: datosCompra.cantidad,
        });

        console.log("Compra realizada con éxito",);
        return { success: true, message: "Compra realizada con éxito." };
    } catch (error) {
        console.log("Error al realizar la compra", error);
        return { success: false, message: "Error al realizar la compra." };
    }
}

async function usuarioExiste(nombreUsuario) {
    try {
        const snapshot = await conexion.where('usuario', '==', nombreUsuario).get();
        return !snapshot.empty; // Retorna verdadero si hay un usuario con ese nombre
    } catch (error) {
        console.log("Error al verificar si el usuario existe:", error);
        return false; // Por defecto, en caso de error, retorna falso
    }
}


 module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    buscarPorId,
    usuarioExiste,
    modificarUsuario,
    borrarUsuario,
    login,
    buscarUsuarioID,
    realizarCompra
 }

