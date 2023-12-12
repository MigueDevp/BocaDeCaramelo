class Compra {
    constructor(id, data) {
        this.bandera = 0;
        this._id = id;
        this._idUsuario = data.idUsuario;
        this._nombreUsuario = data.nombreUsuario;
        this.producto = data.producto;
        this.tamaño = data.tamaño;
        this.cantidad = data.cantidad;
    }

    set id(id) {
        if (id !== null && id.length > 0) {
            this._id = id;
        }
    }

    set idUsuario(idUsuario) {
        this._idUsuario = idUsuario;
        idUsuario.length > 0 ? this._idUsuario = idUsuario : this.bandera = 1;
    }

    set nombreUsuario(nombreUsuario) {
        this._nombreUsuario = nombreUsuario;
        nombreUsuario.length > 0 ? this._nombreUsuario = nombreUsuario : this.bandera = 1;
    }

    set producto(producto) {
        this._producto = producto;
        producto.length > 0 ? this._producto = producto : this.bandera = 1;
    }

    set tamaño(tamaño) {
        this._tamaño = tamaño;
        tamaño.length > 0 ? this._tamaño = tamaño : this.bandera = 1;
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad;
        cantidad.length > 0 ? this._cantidad = cantidad : this.bandera = 1;
    }

    get id() {
        return this._id;
    }
    get idUsuario() {
        return this._idUsuario;
    }

    get nombreUsuario() {
        return this._nombreUsuario;
    }

    get producto() {
        return this._producto;
    }

    get tamaño() {
        return this._tamaño;
    }

    get cantidad() {
        return this._cantidad;
    }

    get obtenerCompra() {
        if (this._id !== null) {
            console.log("Con ID");
            console.log({
                id: this.id,
                idUsuario: this._idUsuario,
                nombreUsuario: this._nombreUsuario,
                producto: this.producto,
                tamaño: this.tamaño,
                cantidad: this.cantidad
            });
            return {
                id: this.id,
                idUsuario: this._idUsuario,
                nombreUsuario: this._nombreUsuario,
                producto: this.producto,
                tamaño: this.tamaño,
                cantidad: this.cantidad
            };
        } else {
            console.log("Sin ID");
            console.log({
                idUsuario: this._idUsuario,
                nombreUsuario: this._nombreUsuario,
                producto: this.producto,
                tamaño: this.tamaño,
                cantidad: this.cantidad
            });
            return {
                idUsuario: this._idUsuario,
                nombreUsuario: this._nombreUsuario,
                producto: this.producto,
                tamaño: this.tamaño,
                cantidad: this.cantidad
            };
        }
    }
}    
module.exports = Compra;
