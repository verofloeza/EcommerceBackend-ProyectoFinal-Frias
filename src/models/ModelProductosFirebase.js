import admin from "firebase-admin";
import serviceAccount from '../db/ecommercefrias-firebase-adminsdk-nx0e5-130db415e7.json' assert {type: "json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
let objs= db.collection('productos');

class ModelProductosFirebase{
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

    async postProd(datos){
        try {   
            let array = [];
            const snapshot = await objs.get();
            snapshot.forEach(doc => {
              array.push( doc.data());
            });
            let cant = array.length;
            let idprod= cant+1;
            let time = Date.now();
            datos = {
                id: idprod,
                timestamp : time,
                ...datos
            }
            let doc = objs.doc();
            await doc.create(datos);

            return datos;

          } catch (error) {
            console.log(error)
        }
        
    }

    async getProd(idProd){
        try {
            let array = [];
            const snapshot = await objs.where('id', '==', parseInt(idProd)).get();
            snapshot.forEach(doc => {
                array.push(doc.data());
              });
              return array;
          } catch (error) {
            console.log(error)
        }
    }

    // async putProd(idProd, datos){
    //     try {
    //         let array;
    //         const snapshot = await objs.where('id', '==', parseInt(idProd)).get();
    //         snapshot.forEach(doc => {
    //             array = doc.id
    //           });
    //         let producto = objs.doc(`${array}`);
    //         response = await producto.update({'title': datos.title, 'description': datos.description, 'code': datos.code, 'price': datos.price, 'stock': datos.stock, 'thumbnail': datos.thumbnail})

    //           return datos;
    //       } catch (error) {
    //         console.log(error)
    //     }
    // }


    
    // async deleteProd(idProd){
    //     try {
    //        let array;
    //         const snapshot = await objs.where('id', '==',idProd).get();
    //         snapshot.forEach(doc => {
    //             array = doc.id
    //           });
    //           let producto = objs.doc(`${array}`);
    //           await producto.delete()
    //           return true;
    //       } catch (error) {
    //         console.log(error)
    //     } 
    // }
};

export default ModelProductosFirebase;