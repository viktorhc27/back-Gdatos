const req = require('express/lib/request');
const { 
        Usuario, 
        Rol,
        MovimientoStock, 
        Producto,
        TipoMovimiento
     } = require('../modules/associations')

///////////////////////
//Validadores Usuario//
///////////////////////
const emailExisteUsuario = async( email = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({
        where: {
            email: email 
        }
    });

    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}

const emailComprobar = async( email = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({
        where: {
            email: email 
        }
    });
    if ( !existeEmail ) {
        throw new Error(`El correo: ${ email }, no existe`);
    }else{
        req.usuarioEmail = existeEmail;
    }
}

const existeUsuarioPorId = async( id = '') => {

    // Verificar si usuario existe
    const existeUsuario = await Usuario.findByPk( id );

    if ( !existeUsuario ) {
        throw new Error(`El id ${ id } no existe`);
    }
}

//////////////////////
//Validadores de Rol//
//////////////////////
const esRoleValido = async(rol_id = '') => {

    const existeRol = await Rol.findOne({
        where: {
            id: rol_id
            }
        });
    if ( !existeRol ) {
        throw new Error(`El rol no está registrado en la BD`);
    }
}

/**
 * Busca un movimiento de stock específico en la base de datos utilizando el ID proporcionado
 * @async
 * @param {string} id - ID del movimiento de stock a buscar
 * @throws {Error} Si el ID de movimiento de stock proporcionado no existe
 */
const existeMovimientoStockPorId = async( id = '') => {
    const existeMovimientoStock = await MovimientoStock.findByPk( id );

    if ( !existeMovimientoStock ) {
        throw new Error(`El id ${ id } de cliente no existe`);
    }
}

/**
 * Esta función se utiliza para verificar si existe un producto con un id específico en la base de datos.
 * Si no existe, lanza un error.
 * @async
 * @param {string} [id=''] - El id del producto a buscar.
 * @throws {Error} Si el id del producto no existe.
 */
const existeProductoPorId = async( id = '') => {
    const existeProducto = await Producto.findByPk( id );

    if ( !existeProducto ) {
        throw new Error(`El id ${ id } de producto no existe`);
    }
}

/**
 * Esta función se utiliza para verificar si existe un tipo movimiento con un id específico en la base de datos.
 * Si no existe, lanza un error.
 * @async
 * @param {string} [id=''] - El id del tipo movimiento a buscar.
 * @throws {Error} Si el id del tipo movimiento no existe.
 */
const existeTipoMovimientoPorId = async( id = '') => {
    const existeTipoMovimiento = await TipoMovimiento.findByPk( id );

    if ( !existeTipoMovimiento ) {
        throw new Error(`El id ${ id } de tipo movimiento no existe`);
    }
}

/**
 * Valida el stock de un producto después de un movimiento.
 *
 * @async
 * @function validarStock
 * @param {Object} values - Objeto que contiene la cantidad y el ID del producto.
 * @param {number} values.cantidad - Cantidad del producto en el movimiento.
 * @param {number} values.producto_id - ID del producto en el movimiento.
 * @throws {Error} Si el producto no existe o no hay suficiente stock.
 * @returns {Promise<void>}
 */
const validarStock = async (values) => {

    const cantidad = values.cantidad
    const id_producto = values.producto_id

    const producto = await Producto.findByPk(id_producto);
    if (!producto) {
      throw new Error(`El producto con id ${id_producto} no existe`);
    }
    const nuevoStock = producto.stock + cantidad;
    if (nuevoStock < 0) {
      throw new Error(`No hay suficiente stock para el producto con id ${id_producto}`);
    }

    values.stock_resultante = nuevoStock;
};

module.exports = {
    emailExisteUsuario,
    existeUsuarioPorId,
    esRoleValido,
    emailComprobar,
    existeMovimientoStockPorId,
    existeProductoPorId,
    existeTipoMovimientoPorId,
    validarStock
}