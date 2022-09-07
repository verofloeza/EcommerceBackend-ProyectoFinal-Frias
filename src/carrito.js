const DB_CARRITO = require("./constantes/carrito.json");
const DB_PRODUCTOS = require("./constantes/productos.json");

class Carrito{
    constructor(){};
    // Sacar
    getAll(){
        return DB_CARRITO;
    };
    // !Sacar
    postCarrito(){
        let cant= DB_CARRITO.length;
        let idcarr= cant+1;
        let time = Date.now();
        let datos = {
          id: idcarr,
          timestamp : time,
          productos:[]
        }
        DB_CARRITO.push(datos);
        return idcarr
    }
    postCarritoId(idProd, id){
        let carrito = DB_CARRITO.filter( i => i.id == id);
        let shopProd = carrito[0].productos;
        let producto = DB_PRODUCTOS.filter( i=> i.id == idProd.id)
        shopProd.push(producto[0]);
        return carrito[0];
    }
    getCarrito(idProd){
        let carrito = DB_CARRITO.filter( i => i.id == idProd)
        return carrito[0].productos;
    }
    
    deleteCarrito(idCarr){
        const index = DB_CARRITO.findIndex(i => i.id == idCarr);
        if (index >= 0) {
            DB_CARRITO.splice(index, 1)
        }
        return true;
        
    }
    deleteProd(id,idProd){
        const index = DB_CARRITO.filter(i => i.id == id);
        let producto= index[0].productos;
        let filterProduct = producto.findIndex( i => i.id == idProd)
        
        if (filterProduct >= 0) {
            producto.splice(filterProduct, 1)
        }

        return true;
        
    }
};

module.exports = Carrito;