import {Schema, model} from "mongoose";

const productosSchema = Schema({
    id:{ type: Number, require: true, unique: true },
    title: {type: String,  require: true},
    description: {type: String,  require: true},
    price:{type: Number , require: true},
    code:{type: String , require: true},
    stock:{type: Number , require: true},
    thumbnail: {type: String, require: true}
});

export const productosModel = model('productos', productosSchema);
