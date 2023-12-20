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


//crear la app
const app = express();
app.use(fileUpload())




// Configurar encabezados CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

const generateFilename = (req, file, cb) => {
    const userId = req.body.userId || 'default'; // Puedes obtener el ID del cuerpo de la solicitud o de donde sea necesario
console.log(userId);
    
    const filename = `${userId}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  };
  
// Configuración de multer
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: generateFilename,
});
const upload = multer({ storage: storage });
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
// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('file'), (req, res) => {
   
    res.json({ message: 'Archivo subido con éxito', img: upload });
});

app.use('/api/productos', productoRoutes)
app.use('/api/categorias', categoriasRoutes)
app.use('/api/ventas', ventasRoutes)
app.get('/:img', (req, res) => {
    try {
        let name = req.params.img
        /* console.log(__dirname + '/src/assets/files/'+name) */

        if (fs.existsSync(__dirname + '/uploads/' + name)) {
            //file exists
            res.sendFile(__dirname + `/uploads/${name}`);
        }
        else {
            res.sendFile(__dirname + `/uploads/sin_imagen.png`);
        }
    } catch (err) {
        console.error(err)
    }

});
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//definir puerto y arrancar proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('El Servidor esta funcionando en el puerto ' + port)
});