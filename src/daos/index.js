import CarritosDaosArchivo from "./carritos/CarritosDaosArchivo.js";
import CarritosDaosFirebase from "./carritos/CarritosDaosFirebase.js";
import CarritosDaosMemoria from "./carritos/CarritosDaosMemoria.js";
import CarritosDaosMongodb from "./carritos/CarritosDaosMongodb.js";
import ProductosDaosArchivo from "./productos/ProductosDaosArchivo.js";
import ProductosDaosFirebase from "./productos/ProductosDaosFirebase.js";
import ProductosDaosMemoria from "./productos/ProductosDaosMemoria.js";
import ProductosDaosMongodb from "./productos/ProductosDaosMongodb.js";

let productoDao;
let carritosDao;
//let tipo = 'memoria';
//let tipo = 'json';
// let tipo = 'mongodb';
let tipo = 'firebase';

switch(tipo){
    case 'json':
        productoDao= new ProductosDaosArchivo()
        carritosDao= new CarritosDaosArchivo()
        break
    case 'mongodb':
        productoDao= new ProductosDaosMongodb()
        carritosDao= new CarritosDaosMongodb()
        break
    case 'firebase':
        productoDao= new ProductosDaosFirebase()
        carritosDao= new CarritosDaosFirebase()
        break
    default :
        productoDao= new ProductosDaosMemoria()
        carritosDao= new CarritosDaosMemoria()
        break
}

export { productoDao, carritosDao }