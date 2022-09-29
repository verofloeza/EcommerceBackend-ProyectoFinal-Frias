import { readFile, writeFile } from "fs/promises";

let objs;

class ProductosArchivo{
    constructor(ruta){
      this.ruta = ruta
    };
    
    async getAll(){
        try {
            objs = await readFile(this.ruta);
            return  JSON.parse(objs);
        } catch (error) {
            return error;
        }
    };

    async postProd(datos){
        objs =await readFile(this.ruta);
        let myObject = JSON.parse(objs);
        let cant= myObject.length;
        let idprod= cant+1;
        let time = Date.now();
        datos = {
          id: idprod,
          timestamp : time,
          ...datos
        }
        myObject.push(datos)
        let newData = JSON.stringify (myObject);
        await writeFile( this.ruta, newData);

        return  datos;
    }

    async getProd(idProd){
        objs =await readFile(this.ruta);
        let myObject = JSON.parse(objs);
        let producto = myObject.filter( i => i.id == idProd)
        return producto[0];
    }

    async putProd(idProd, datos){ 
        objs =await readFile(this.ruta);
        let myObject = JSON.parse(objs);
        let id = parseInt(idProd);
        const index =myObject.find( i =>i.id == id);
        datos = {
            id: id,
            timestamp : index.timestamp,
            ...datos
          }
        

        let array = myObject.filter( product => product.id !== id );
        array.push(datos);
        
        let newData = JSON.stringify (array);
        await writeFile( this.ruta, newData);

        return  array;
    }
    async deleteProd(idProd){
        objs =await readFile(this.ruta);
        let myObject = JSON.parse(objs);
        let id = parseInt(idProd);
        let array = myObject.filter( product => product.id !== id );

        let newData = JSON.stringify (array);
        await writeFile( this.ruta, newData);

        return  true;

    }
};

export default ProductosArchivo;