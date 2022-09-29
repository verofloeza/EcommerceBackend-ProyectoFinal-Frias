import ModelCarritosArchivo from "../../models/ModelCarritosArchivo.js";

class CarritosDaosArchivo extends ModelCarritosArchivo{
    constructor(){
        super('./src/db/carritos.json', './src/db/productos.json')
    }

}

export default CarritosDaosArchivo;