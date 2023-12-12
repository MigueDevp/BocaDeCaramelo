const Compra = require("../modelos/Compra");
var conexion=require("../bd/conexion").conexionVentas;

async function mostrarCompras() {
    var compras = [];
    try {
        var comprasBD = await conexion.get();
        comprasBD.forEach(compra => {
            console.log("Data de compra:", compra.data()); // Agrega esta línea
            var compra1 = new Compra(compra.id, compra.data());
            if (compra1.bandera == 0) {
                compras.push(compra1.obtenerCompra);
            }
        });
        console.log("Compras obtenidas:", compras);
    } catch (err) {
        console.log("Error al mostrar compras: " + err);
    }
    return compras;
}


module.exports = {
    mostrarCompras
};
