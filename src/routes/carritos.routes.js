import { Router } from "express";
import bodyParser from "body-parser";
import { carritosDao } from "../daos/index.js";

const routerCarrito = Router();
const jsonParser = bodyParser.json();

const auth= true;


let result;
// Sacar
routerCarrito.get( "/", async (req, res, next) => {
    result = await carritosDao.getAll();
    if(!auth){
        return res.status(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    if(result){
        return res.status(201).json(result); 
    }
    
    next();
});
// !Sacar
routerCarrito.post( "/", jsonParser, async (req, res, next) => {
    result = await carritosDao.postCarrito();
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    if(result){
        return res.status(201).json(result); 
    }
    next();
});

routerCarrito.post( "/:id/productos", jsonParser, async (req, res, next) => {
    result = await carritosDao.postCarritoId(req.body, req.params.id);
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    if(result){
        return res.status(201).json(result); 
    }
    next();
});

routerCarrito.get( "/:id/productos", async (req, res) => {
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    result = await carritosDao.getCarrito(req.params.id);
    if(!result){
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }else{
        return res.status(200).json(result);
    }
    
});

routerCarrito.delete( "/:id", async (req, res) => {
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    result = await carritosDao.deleteCarrito(req.params.id);
    if(!result){
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }else{
        return res.status(200).json(result);
    }
})

routerCarrito.delete( "/:id/productos/:id_prod", async (req, res) => {
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    result = await carritosDao.deleteProd(req.params.id, req.params.id_prod);
    if(!result){
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }else{
        return res.status(200).json(result);
    }
})

export default routerCarrito;