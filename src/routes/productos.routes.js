const express = require("express");
const routerProductos = express.Router();
const Productos = require("../index.js");

const productos = new Productos();

routerProductos.get( "/", (req, res, next) => {
    res.status(200).json(productos.getAll());
    next();
});

routerProductos.post( "/", (req, res, next) => {
    res.status(201).json(productos.postProd(req.body));
    next();
});

routerProductos.get( "/:id", (req, res, next) => {
    let result = productos.getProd(req.params.id);
    if(!result){
        res.status(404).json({ error: 'Producto no encontrado' });
    }else{
        res.status(200).json(result);
    }
    
    next();
});

routerProductos.put( "/:id", (req, res, next) => {
    let result = productos.putProd(req.params.id, req.body);
    if(!result){
        res.status(404).json({ error: 'Producto no encontrado' });
    }else{
        res.status(200).json(result);
    }
    next();
})

routerProductos.delete( "/:id", (req, res, next) => {
    let result = productos.deleteProd(req.params.id);
    if(!result){
        res.status(404).json({ error: 'Producto no encontrado' });
    }else{
        res.status(200).json(result);
    }
    next();
})

module.exports = routerProductos;