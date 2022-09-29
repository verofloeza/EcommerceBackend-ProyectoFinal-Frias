import {Schema, model} from "mongoose";

const carritosSchema = Schema({
    id:{ type: Number, require: true, unique: true },
    timestamp: {type: String,  require: true},
    productos: {type: Array }
    
});

export const carritosModel = model('carritos', carritosSchema);