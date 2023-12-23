// config/cors.js
const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:4200'];

const corsConfig = cors({
  origin: function (origin, callback) {
    // Si no se especifica un origen (ej. navegadores), permitir
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El origen no está permitido por la configuración CORS';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
});

module.exports = corsConfig;
