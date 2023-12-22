const Producto = require('./Productos')
const Categoria = require('./Categoria')
const Ventas = require('./Ventas')
//const DetalleVenta = require('./detalle_venta')
const MetodoPagos = require('./metodo_pagos')
const TipoDocumento = require('./tipo_documento')

Categoria.hasMany(Producto, { foreignKey: 'categoria_id' })
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' })

/* 
Ventas.hasMany(DetalleVenta, { foreignKey: 'venta_id' });
DetalleVenta.belongsTo(Ventas, { foreignKey: 'venta_id' });

Producto.hasMany(DetalleVenta, { foreignKey: 'producto_id' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'producto_id' });
 */
MetodoPagos.hasOne(Ventas, { foreignKey: 'metodo_pagos_id' })
Ventas.belongsTo(MetodoPagos, { foreignKey: 'metodo_pagos_id' })

TipoDocumento.hasOne(Ventas, { foreignKey: 'tipo_documento_id' })
Ventas.belongsTo(TipoDocumento, { foreignKey: 'tipo_documento_id',   })

module.exports = {
    Producto,
    Categoria,
    Ventas,
   // DetalleVenta,
    MetodoPagos,
    TipoDocumento
}