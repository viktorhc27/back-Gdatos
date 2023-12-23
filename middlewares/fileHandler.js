// middleware/fileHandler.js
const path = require('path');
const fs = require('fs');

const fileHandler = (req, res) => {
  try {
    const name = req.params.img;

    const filePath = path.join(__dirname, '../uploads', name);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendFile(path.join(__dirname, '../uploads', 'sin_imagen.png'));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor al manejar el archivo' });
  }
};

module.exports = fileHandler;
