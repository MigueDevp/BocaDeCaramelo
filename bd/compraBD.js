const Compra = require("../modelos/Compra");
var conexion=require("../bd/conexion").conexionVentas;


/*async function mostrarCompras() {
    var compras = [];
    try {
        var comprasBD = await conexion.conexionVentas.get();
        comprasBD.forEach(compra => {
            var compraObj = new Compra(compra.id, compra.data());
            if (compraObj.bandera === 0) {
                compras.push(compraObj.obtenerCompra);
            }
        });
    } catch (err) {
        console.log("Error al mostrar compras " + err);
    }

    return compras;
}*/

async function mostrarCompras(){
    var compras=[];
    try{
        var comprasBD= await conexion.get();
        comprasBD.forEach(compra =>{
        console.log(comprasBD);
         var compra1=new Compra(compra.id,compra.data())
     if (compra1.bandera==0){
        compras.push(compra1.obtenerCompra);
     }
    })
    }catch(err){
        console.log("Error al mostrar comprasss "+err); 
     }
    
     return compras;
    
}

module.exports = {
    mostrarCompras
};
