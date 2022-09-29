import DB_PRODUCTOS from "../db/productos.json" assert { type: "json" };
class Productos{
    constructor(){};
    
    async getAll(){
        return DB_PRODUCTOS;
    };

    async postProd(datos){
        let cant= DB_PRODUCTOS.length;
        let idprod= cant+1;
        let time = Date.now();
        datos = {
          id: idprod,
          timestamp : time,
          ...datos
        }
        DB_PRODUCTOS.push(datos);
        return datos
    }
    async getProd(idProd){
        let producto = DB_PRODUCTOS.filter( i => i.id == idProd)
        return producto[0];
    }
    async putProd(idProd, cuerpo){
      const index = DB_PRODUCTOS.findIndex( i =>i.id == idProd);
      
      if (index >= 0) {
        DB_PRODUCTOS[index].title = cuerpo.title;
        DB_PRODUCTOS[index].description = cuerpo.description;
        DB_PRODUCTOS[index].code = cuerpo.code;
        DB_PRODUCTOS[index].stock = cuerpo.stock;
        DB_PRODUCTOS[index].price = cuerpo.price;
        DB_PRODUCTOS[index].thumbnail = cuerpo.thumbnail;

      } 
       return  DB_PRODUCTOS[index]; 
    }
    async deleteProd(idProd){
        const index = DB_PRODUCTOS.findIndex(i => i.id == idProd);
        if (index >= 0) {
          DB_PRODUCTOS.splice(index, 1)
        }
        return true;
        
    }
};

export default Productos;