class Compra {
    constructor(id, data) {
        this.bandera = 0;
        this._id = id;
        this.producto = data.producto;
        this.tamaño = data.tamaño;
        this.cantidad = data.cantidad;
    }

    set id(id) {
        if (id !== null && id.length > 0) {
            this._id = id;
        }
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
            return {
                id: this.id,
                producto: this.producto,
                tamaño: this.tamaño,
                cantidad: this.cantidad
            };
        } else {
            return {
                producto: this.producto,
                tamaño: this.tamaño,
                cantidad: this.cantidad
            };
        }
    }
}

module.exports = Compra;
