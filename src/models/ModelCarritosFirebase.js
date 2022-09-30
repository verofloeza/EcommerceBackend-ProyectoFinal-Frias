import { config } from '../utils/config.js';

const strConn = config.firebase.strConn;

const db = strConn.firestore();
let objs= db.collection('carritos');
let objs2= db.collection('productos');

class ModelCarritosFirebase{
    constructor(){};

    async getAll(){
        try {
            let array = [];
            const snapshot = await objs.get();
            snapshot.forEach(doc => {
              array.push( doc.data());
            });
            return array
          } catch (error) {
            console.log(error)
        } 
    };

    async postCarrito(){
        try {   
            let array = [];
            const snapshot = await objs.get();
            snapshot.forEach(doc => {
              array.push( doc.data());
            });
            let cant = array.length;
            let idprod= cant+1;
            let time = Date.now();
            let datos = {
                id: idprod,
                timestamp : time,
                productos: []
            }
            let doc = objs.doc();
            await doc.create(datos);

            return datos;

          } catch (error) {
            console.log(error)
        }
    }

    async postCarritoId(idProd, id){
        try {   
            let array;
            let carrito = [];
            const snapshot = await objs.where('id', '==', parseInt(id)).get();
            snapshot.forEach(doc => {
                array = doc.id;
                carrito.push(doc.data());
              });
            let arrayProd=carrito[0].productos 
            let array2 = [];
            const snapshot2 = await objs2.where('id', '==', parseInt(idProd.id)).get();
            snapshot2.forEach(doc => {
                array2.push(doc.data());
              });
            arrayProd.push(array2[0]);

            let producto = objs.doc(`${array}`);
            await producto.update({'productos': arrayProd})

            return arrayProd;

          } catch (error) {
            console.log(error)
        }
    }

    async deleteProd(id, idProd){
      try {   
          let array;
          let carrito = [];
          const snapshot = await objs.where('id', '==', parseInt(id)).get();
          snapshot.forEach(doc => {
              array = doc.id;
              carrito.push(doc.data());
            });
          let arrayProd=carrito[0].productos 
          
          let Prod = arrayProd.filter( i => i.id != parseInt(idProd))

          let producto = objs.doc(`${array}`);
          await producto.update({'productos': Prod})

          return true;

        } catch (error) {
          console.log(error)
      }
    }
    
    async deleteCarrito(idCarr){
      try {   
          let array;
          const snapshot = await objs.where('id', '==', parseInt(idCarr)).get();
          snapshot.forEach(doc => {
              array = doc.id;
              
            });

          let producto = objs.doc(`${array}`);
          await producto.delete()

          return true;

        } catch (error) {
          console.log(error)
      }
    }
    
};

export default ModelCarritosFirebase;