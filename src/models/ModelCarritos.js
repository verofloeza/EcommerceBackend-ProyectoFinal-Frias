import DB_CARRITO from "../db/carritos.json" assert { type: "json" };
import DB_PRODUCTOS from "../db/productos.json" assert { type: "json" };

class Carrito{
    constructor(){};

    async getAll(){
        return DB_CARRITO;
    };

    async postCarrito(){
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

    async postCarritoId(idProd, id){
        let carrito = DB_CARRITO.filter( i => i.id == id);
        let shopProd = carrito[0].productos;
        let producto = DB_PRODUCTOS.filter( i=> i.id == idProd.id)
        shopProd.push(producto[0]);
        return carrito[0];
    }

    async getCarrito(idProd){
        let carrito = DB_CARRITO.filter( i => i.id == idProd)
        return carrito[0].productos;
    }
    
    async deleteCarrito(idCarr){
        const index = DB_CARRITO.findIndex(i => i.id == idCarr);
        if (index >= 0) {
            DB_CARRITO.splice(index, 1)
        }
        return true;
        
    }
    
    async deleteProd(id,idProd){
        const index = DB_CARRITO.filter(i => i.id == id);
        let producto= index[0].productos;
        let filterProduct = producto.findIndex( i => i.id == idProd)
        
        if (filterProduct >= 0) {
            producto.splice(filterProduct, 1)
        }

        return true;
        
    }
};

export default Carrito;