const express = require('express');
const fileUpload = require('express-fileupload')
const db = require('./config/db.js')
const productoRoutes = require('./routes/producto.routes.js')
const ventasRoutes = require('./routes/ventas.routes.js')
const categoriasRoutes = require('./routes/categorias.routes')
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')
const fileHandler = require('./middlewares/fileHandler');
const corsConfig = require('./config/cors.js');


//crear la app
const app = express();
app.use(fileUpload())
// Configurar encabezados CORS
app.use(corsConfig);
// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

const conectarDB = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log('Conexión a la base de datos exitosa')
    } catch (error) {
        console.log(error);
        console.log('Error al conectar a la base de datos')
    }
}
conectarDB()
//habilitar lectura de formulario
app.use(express.urlencoded({ extended: true }))
//app.use(cookieParser())
//app.use(csrf({cookie:true}))


//routing
app.use('/api/productos', productoRoutes)
app.use('/api/categorias', categoriasRoutes)
app.use('/api/ventas', ventasRoutes)
app.get('/:img', fileHandler);

//definir puerto y arrancar proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('El Servidor esta funcionando en el puerto ' + port)
});