import { Router } from "express";
import bodyParser from "body-parser";
import { productoDao } from "../daos/index.js";

const routerProductos = Router();
const jsonParser = bodyParser.json();

let result;

routerProductos.get( "/",async (req, res, next) => {
    result =await productoDao.getAll();
    if(!result){
        return res.status(404).json({ error });
    }else{
        return res.status(200).json(result);
    }
});

routerProductos.post( "/", jsonParser, async (req, res, next) => {
    result =await productoDao.postProd(req.body);
    if(!result){
        return res.status(404).json({ error: 'Producto no agregado' });
    }else{
        return res.status(201).json(result);
    }
    
});

routerProductos.get( "/:id", async (req, res, next) => {
    result = await productoDao.getProd(req.params.id);
    if(!result){
        return res.status(404).json({ error: 'Producto no encontrado' });
    }else{
        return res.status(200).json(result);
    }
});

routerProductos.put( "/:id", jsonParser, async (req, res, next) => {
    result = await productoDao.putProd(req.params.id, req.body);
    if(!result){
        return res.status(404).json({ error: 'Producto no encontrado' });
    }else{
        return res.status(200).json(result);
    }
})

routerProductos.delete( "/:id", async (req, res, next) => {
    result = await productoDao.deleteProd(req.params.id);
    if(!result){
        return res.status(404).json({ error: 'Producto no encontrado' });
    }else{
        return res.status(200).json(result);
    }
})

export default routerProductos;