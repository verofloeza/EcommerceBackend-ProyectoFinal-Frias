const express = require("express");
const morgan = require("morgan");

const app = express();
const routerProductos = require("./src/routes/productos.routes.js");
const routerCarrito = require("./src/routes/carrito.routes.js");

// /*-------------------Middleware-------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan("dev"));
app.use(express.static(__dirname + '/public'));


// /*-------------------Rutas-------------------------*/
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.get('*', (req, res)=>{
    /* Returning a 404 status code. */
    res.status(404).json({ error: ` -2, descripcion: /api/carrito${req.url} ${req.method} - No implementada` })
})


const server = app.listen(8080, ()=> {
    console.log("servidor escuchando http://localhost:8080/")
});

server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
