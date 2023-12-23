// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = errorHandler;
  