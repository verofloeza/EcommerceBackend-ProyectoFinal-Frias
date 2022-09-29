import { config } from '../utils/config.js';
import mongoose from "mongoose";
import { productosModel } from '../model/productos.model.js';

const strConn = config.atlas.strConn;

let objs;

class ProductosMongodb{
    constructor(){};
    
    async getAll(){
        try {
            await mongoose.connect(strConn);
            objs = await productosModel.find();
            return objs;
          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    };

    async postProd(datos){
        try {
            await mongoose.connect(strConn);
            objs = await productosModel.find();
            let cant= objs.length;
            let idprod= cant+1;
            let time = Date.now();
            datos = {
                id: idprod,
                timestamp : time,
                ...datos
            }

            await productosModel.insertMany(datos);

            return idprod;

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
        
    }

    async getProd(idProd){
        try {
            await mongoose.connect(strConn);
            objs = await productosModel.find({'id': idProd});
            
            return objs;

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    }

    async putProd(idProd, datos){
        try {
            await mongoose.connect(strConn);
            objs = await productosModel.updateOne(
                {id: idProd}, 
                {$set:  {title: datos.title,
                        description: datos.description,
                        price: datos.price,
                        code: datos.code,
                        stock: datos.stock,
                        thumbnail: datos.thumbnail
                    }
                }
            );
            
            return await productosModel.find({'id': idProd});

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        } 
    }
    
    async deleteProd(idProd){
        try {
            await mongoose.connect(strConn);
            objs = await productosModel.deleteOne({'id': idProd});
            
            return true;

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    }
};

export default ProductosMongodb;