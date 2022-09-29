import * as dotenv from 'dotenv'

import express, { urlencoded } from "express";

import morgan from "morgan";
import routerCarrito from "./src/routes/carritos.routes.js";
import routerProductos from "./src/routes/productos.routes.js";

const app = express();
dotenv.config()
// /*-------------------Middleware-------------------------*/
app.use(urlencoded({ extended: true}));
app.use(morgan("dev"));

// /*-------------------Rutas-------------------------*/
app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarrito);

app.get('*', (req, res)=>{
    /* Returning a 404 status code. */
    res.status(404).json({ error: ` -2, descripcion: /api/carritos${req.url} ${req.method} - No implementada` })
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
     error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error.'
     }
    });
   });




const server = app.listen(process.env.PORT, ()=> {
    console.log(`Servidor escuchando en el puerto http://localhost:${process.env.PORT}`)
});

server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
