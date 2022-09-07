const express = require("express");
const routerCarrito = express.Router();
const Carrito = require("../carrito.js");
const auth= true;

const carrito = new Carrito();

// Sacar
routerCarrito.get( "/", (req, res, next) => {
    if(!auth){
        return res.status(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    res.status(201).json(carrito.getAll());
    next();
});
// !Sacar
routerCarrito.post( "/", (req, res, next) => {
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    res.status(201).json(carrito.postCarrito());
    next();
});

routerCarrito.post( "/:id/productos", (req, res, next) => {
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    res.status(201).json(carrito.postCarritoId(req.body, req.params.id));
    next();
});

routerCarrito.get( "/:id/productos", (req, res, next) => {
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    let result = carrito.getCarrito(req.params.id);
    if(!result){
        res.status(404).json({ error: 'Carrito no encontrado' });
    }else{
        res.status(200).json(result);
    }
    
    next();
});

routerCarrito.delete( "/:id", (req, res, next) => {
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    let result = carrito.deleteCarrito(req.params.id);
    if(!result){
        res.status(404).json({ error: 'Carrito no encontrado' });
    }else{
        res.status(200).json(result);
    }
    next();
})

routerCarrito.delete( "/:id/productos/:id_prod", (req, res, next) => {
    if(!auth){
        return res.sendStatus(401).json({ error: ` -1, descripcion: /api/carrito${req.url} ${req.method} - No autorizada` });
    }
    let result = carrito.deleteProd(req.params.id, req.params.id_prod);
    if(!result){
        res.status(404).json({ error: 'Carrito no encontrado' });
    }else{
        res.status(200).json(result);
    }
    next();
})

module.exports = routerCarrito;