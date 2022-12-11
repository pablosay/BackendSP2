const conn = require('../../config/database');
const request = require( 'request') ;
module.exports = (app) => {
    /* Obtener los datos de perfil de un usuario*/
    app.get('/adminInfo', (req,res) => {
        let query = `SELECT  * FROM admin`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", admin:rows});
            }
        });
    });
}