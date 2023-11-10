var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var micuenta=admin.firestore();

var conexionUsuarios=micuenta.collection("usuario");
var conexionProductos=micuenta.collection("productosBoca");
module.exports={
    conexionUsuarios,
    conexionProductos
};

