import { carritosModel } from '../model/carritos.model.js';
import { config } from '../utils/config.js';
import mongoose from "mongoose";
import { productosModel } from '../model/productos.model.js';

const strConn = config.atlas.strConn;

let objs;
class CarritoMongodb{
    constructor(){};

    async getAll(){
        try {
            await mongoose.connect(strConn);
            objs = await carritosModel.find();
            return objs;
          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    };

    async postCarrito(){
        try {
            await mongoose.connect(strConn);
            objs = await carritosModel.find();
            let cant= objs.length;
            let idcarr= cant+1;
            let time = Date.now();
            let datos = {
                id: idcarr,
                timestamp : time,
                productos:[]
            }

            await carritosModel.insertMany(datos);

            return idcarr;

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    }

    async postCarritoId(idProd, id){
        try {
            await mongoose.connect(strConn);
            objs = await carritosModel.find({'id': id});

            let producto = await productosModel.find({id: idProd.id});

            await carritosModel.updateOne(
                {id: id},
                {$set:  {productos: [producto[0]]}}
            );

            return producto;

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    }

    async getCarrito(id){
        try {
            await mongoose.connect(strConn);
            objs = await carritosModel.find({'id': parseInt(id)});

            return objs[0].productos;

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    }

    async deleteProd(id,idProd){
        try {
            await mongoose.connect(strConn);
            await carritosModel.updateOne({id: id},{ $unset : { 'productos' : {'id': idProd}} },{ multi: true });

            return true;

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    }
    
    async deleteCarrito(idCarr){
        try {
            await mongoose.connect(strConn);
            await carritosModel.deleteOne({id: idCarr});

            return true;

          } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    }
    
};

export default CarritoMongodb;