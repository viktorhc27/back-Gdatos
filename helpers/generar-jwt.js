const jwt = require('jsonwebtoken');

const generarJWT = ( id = '', expiresIn = '' ) => {

    return new Promise( (resolve, reject) => {
        let expires;

        if (expiresIn === '') {
            expires = '30d'
        }else{
            expires = expiresIn
        }

        const payload = { id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: expires,
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = {
    generarJWT
}