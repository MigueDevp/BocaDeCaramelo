var conexion = require("./conexion").conexionUsuarios;
var Usuario = require("../modelos/Usuario");
var Producto=require("../modelos/ProductosBoca");
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
    console.log("Error al recuperar usuarios mostrar usuarios"+err); 
 }
 return users;
}

//FUNCION PARA PODER LOGEARSE
async function login(datos){
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
                user=0; 
            }else{
                console.log("SE VALIDO EL USUARIO")
                user=1;
            }
        });
    }
    return user;
}
//FUNCION PARA CREAR UN NUEVO USUARIO
async function nuevoUsuario(datos){
    var {salt,hash}=generarPassword(datos.password);
    datos.salt=salt;
    datos.password=hash;
    var error=0
    try{
        var usuario1=new Usuario(null,datos);
        if(usuario1.bandera==0){
            conexion.doc().set(usuario1.obtenerUsuario);
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
 async function buscarPorId(id){
    var usuarioObjeto;
    try{
        var usuarioBD=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario(usuarioBD.id, usuarioBD.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerUsuario;
        }
    }
    catch(err){
        console.log("Error al recuperar el usuario (funcion buscarPorId) "+err);
    }
    return usuarioObjeto;
}
//FUNCION PARA MODIFICAR UN USUARIO
 async function modificarUsuario(datos){
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

 module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    buscarPorId,
    modificarUsuario,
    borrarUsuario,
    login
 }

