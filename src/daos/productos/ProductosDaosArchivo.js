import ModelProductosArchivo from "../../models/ModelProductosArchivo.js";

class ProductosDaosArchivo extends ModelProductosArchivo{
    constructor(){
        super('./src/db/productos.json')
    }

}

export default ProductosDaosArchivo;