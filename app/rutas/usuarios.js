const conn = require('../../config/database');
module.exports = (app) => {

    /* Registrar usuario */
    app.post('/RegistrarUsuario/:usuario/nombre/:nombre', (req, res) => {
        let query = `INSERT INTO usuarios(correo,nombre) VALUES ('${req.params.usuario}', '${req.params.nombre}')`;
        conn.query(query, (err, rows, cols) => {

            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Obtener los datos de perfil de un usuario*/
    app.get('/informacionUsuario/:correo', (req,res) => {
        let query = `SELECT * FROM usuarios WHERE correo = '${req.params.correo}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", usuario:rows});
            }
        });
    });

    /* Actualizar datos personales del usuario */
    app.put('/actualizarDatosPersonales/usuario/:correo/telefono/:telefono/descripcion/:descripcion/nacimiento/:nacimiento', (req,res) => {
        let query = `UPDATE usuarios SET descripcion = '${req.params.descripcion}' , nacimiento = '${req.params.nacimiento}', telefono= '${req.params.telefono}' WHERE correo = '${req.params.correo}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Actualizar datos de locación */
    app.put('/actualizarLocacion/correo/:correo/latitud/:latitud/longitud/:longitud', (req,res) => {
        let query = `UPDATE usuarios SET latitud = '${req.params.latitud}' , longitud = '${req.params.longitud}' WHERE correo = '${req.params.correo}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    app.get('/artistas', (req,res) => {
        let query = `SELECT u.nombre, u.correo, u.foto from usuarios U order by Rand()`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({artistas:rows});
            }
        });
    });

    app.get('/cantidadPublicaciones/:correo/categoria/:categoria', (req,res) => {
        let query = `SELECT COUNT(id) as numero FROM publicaciones WHERE usuario = '${req.params.correo}' and categoria = '${req.params.categoria}' and aprovado = 1`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({listaNumeroPublicacion:rows});
            }
        });
    });

    app.get('/cantidadDeLikes/:correo', (req,res) => {
        let query = `SELECT SUM(likes) as numero from publicaciones WHERE usuario = '${req.params.correo}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({listaLikes:rows});
            }
        });
    });

    app.get('/cantidadDeComentarios/:correo', (req,res) => {
        let query = `SELECT COUNT(C.id) as numero from comentarios C, publicaciones P WHERE p.archivo = c.archivo AND p.usuario = '${req.params.correo}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({listaNumeroComentarios:rows});
            }
        });
    });
    

}