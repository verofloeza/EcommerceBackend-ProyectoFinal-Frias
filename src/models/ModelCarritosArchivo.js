import { readFile, writeFile } from "fs/promises";

let objs;
class CarritoArchivo{
    constructor(rutaCarrito, rutaProductos){
        this.rutaCarrito = rutaCarrito,
        this.rutaProductos = rutaProductos
      };
    async getAll(){
        try {
            objs = await readFile(this.rutaCarrito);
            return  JSON.parse(objs);
        } catch (error) {
            return error;
        }
    };

    async postCarrito(){
        objs =await readFile(this.rutaCarrito);
        let myObject = JSON.parse(objs);
        let cant= myObject.length;
        let idcarr= cant+1;
        let time = Date.now();
        let datos = {
            id: idcarr,
            timestamp : time,
            productos:[]
          }
        myObject.push(datos)
        let newData = JSON.stringify (myObject);
        await writeFile( this.rutaCarrito, newData);

        return  idcarr

    }

    async postCarritoId(idProd, id){
        objs =await readFile(this.rutaCarrito);
        let myObject = JSON.parse(objs);
        let carrito = myObject.filter( i => i.id == id);
        let shopProd = carrito[0].productos;

        let objs2 =await readFile(this.rutaProductos);
        let productos = JSON.parse(objs2);
        let producto = productos.filter( i=> i.id == idProd.id)
        shopProd.push(producto[0]);

        carrito.push(shopProd[0])

        let array = myObject.filter( i => i.id != id );
        array.push(carrito[0]);

        let newData = JSON.stringify (array);
        await writeFile( this.rutaCarrito, newData);

        return  carrito[0];                                                                                          
    }
    
    async getCarrito(idProd){
        objs =await readFile(this.rutaCarrito);
        let myObject = JSON.parse(objs);
        let id = parseInt(idProd)
        let carrito = myObject.filter( i => i.id == id);
        return carrito[0].productos;
    }


    async deleteProd(id,idProd){
        objs =await readFile(this.rutaCarrito);
        let myObject = JSON.parse(objs);
        let idCarrito = parseInt(id);
        let carrito = myObject.filter( i => i.id == idCarrito);

        let idProducto = parseInt(idProd);
        let array = carrito[0].productos.filter(i => i.id != idProducto);

        let datos = {
            id: idCarrito,
            timestamp : carrito[0].timestamp,
            productos: array
          }
        

        let delCarrito = myObject.filter( i => i.id != idCarrito);
        delCarrito.push(datos)

        let newData = JSON.stringify(delCarrito);
        await writeFile( this.rutaCarrito, newData);

        return true;

    }

    async deleteCarrito(idCarr){
        objs =await readFile(this.rutaCarrito);
        let myObject = JSON.parse(objs);
        let idCarrito = parseInt(idCarr);
        let carrito = myObject.filter( i => i.id != idCarrito);

        let newData = JSON.stringify(carrito);
        await writeFile( this.rutaCarrito, newData);

        return true;

    }
    
};

export default CarritoArchivo;