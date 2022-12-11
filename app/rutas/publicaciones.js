const conn = require('../../config/database');
const { URL, URLSearchParams } = require('url');
const { deleteFile } = require('../s3');
const fetch = require('node-fetch');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
var FormData = require('form-data');
module.exports = (app) => {

    /* Obtener los datos de perfil de un usuario*/
    app.get('/infoPublicacionUsuario/:correo/categorias/:categoria', (req,res) => {
        let query = `SELECT titulo, descripcion, fecha, archivo, likes FROM publicaciones WHERE usuario = '${req.params.correo}' and categoria = '${req.params.categoria}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicacionUsuario:rows});
            }
        });
    });

    /* Obtener todas las publicaciones de fotografias */
    app.get('/fotografias', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE P.categoria = 'F' and P.aprovado = 1 and U.correo = P.usuario ORDER BY RAND()`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Obtener todas las publicaciones de pinturas */
    app.get('/pinturas', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE P.categoria = 'P' and P.aprovado = 1 and U.correo = P.usuario ORDER BY RAND()`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                console.log(err);
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Obtener todas las publicaciones de grafiti */
    app.get('/grafitis', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE P.categoria = 'G' and P.aprovado = 1 and U.correo = P.usuario ORDER BY RAND()`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Obtener todas las publicaciones de tatuajes */
    app.get('/tatuajes', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE P.categoria = 'T' and P.aprovado = 1 and U.correo = P.usuario ORDER BY RAND()`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Obtener todas las publicaciones de musica */
    app.get('/musica', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE P.categoria = 'M' and P.aprovado = 1 and U.correo = P.usuario ORDER BY RAND()`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Obtener todas las publicaciones de videos */
    app.get('/videos', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE P.categoria = 'V' and P.aprovado = 1 and U.correo = P.usuario ORDER BY RAND()`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Actualizar titulo */
    app.put('/cambiarTitulo/titulo/:titulo/archivo/:archivo', (req,res) => {
        let query = `UPDATE publicaciones SET titulo = '${req.params.titulo}' WHERE archivo = '${req.params.archivo}'`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    })

    /* Actualizar titulo */
    app.put('/cambiarTitulo/titulo/:titulo/archivo/:archivo', (req,res) => {
        let query = `UPDATE publicaciones SET titulo = '${req.params.titulo}' WHERE archivo = '${req.params.archivo}'`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    })

    /* Imagenes no aprovadas */
    app.get('/imagenesNoAprovadas', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE (P.categoria = 'T' OR P.categoria = 'P' OR P.categoria = 'F' OR P.categoria = 'G') and P.aprovado = 0 and U.correo = P.usuario`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Musica no aprovada  */
    app.get('/musicaNoAprovada', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE P.categoria = 'M' and P.aprovado = 0`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Videos no aprovados */
    app.get('/videosNoAprovados', (req,res) => {
        let query = `SELECT P.usuario, U.nombre, P.titulo, P.descripcion, P.archivo , P.fecha, P.likes FROM publicaciones P, usuarios U WHERE P.categoria = 'V' and P.aprovado = 0`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicaciones:rows});
            }
        });
    });

    /* Aprovar archivo */
    app.put('/aprobar/:key', (req,res) => {
        let query = `UPDATE publicaciones SET aprovado = 1 WHERE archivo = '${req.params.key}'`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* eliminar archivo */
    app.delete('/eliminar/:key', async (req,res) => {
        await deleteFile(req.params.key)
        let query = `DELETE FROM publicaciones WHERE archivo = '${req.params.key}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Publicación eliminada"});
            }
        });
    });
    
    /* Actualizar numero de likes */
    app.put('/actualizarLikes/likes/:numero/archivo/:key', (req,res) => {
        let query = `UPDATE publicaciones SET likes = ${req.params.numero} WHERE archivo = '${req.params.key}'`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    app.post('/comentar/:comentario/usuario/:user/archivo/:key/fecha/:fecha', async (req,res) => {
        var url = new URL('http://127.0.0.1:5000/predecirEmociones')
        var parametros = {comment: req.params.comentario}
        url.search = new URLSearchParams(parametros).toString();
        var result = await fetch(url);
        var respuesta = await result.json()
        let query = `INSERT INTO comentarios(usuario,archivo,comentario,fecha,enojo,disgusto,miedo,alegria,neutral,tristeza,sorpresa) VALUES('${req.params.user}','${req.params.key}','${req.params.comentario}','${req.params.fecha}',${respuesta[0].score},${respuesta[1].score},${respuesta[2].score},${respuesta[3].score},${respuesta[4].score},${respuesta[5].score},${respuesta[6].score})`
        conn.query(query, (err, rows, cols) => {
            if(err){
                console.log(err)
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Musica no aprovada  */
    app.get('/comentarios/:key', (req,res) => {
        let query = `SELECT usuario, comentario, fecha, enojo, disgusto, miedo, alegria, neutral, tristeza, sorpresa FROM comentarios WHERE archivo = '${req.params.key}'`;
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", comentarios:rows});
            }
        });
    });

    app.post('/descripcionImagen', upload.single('file'), async (req, res) => {
        const file = req.file.path
        const filename = req.file.originalname
        fs.rename(req.file.path, 'uploads/' +filename, () => {
            console.log("\nFile Renamed!\n")
        });
        const newfile = fs.createReadStream('uploads/' + filename);
        const formData = new FormData();
        formData.append('file', newfile, filename)
        url = new URL('http://127.0.0.1:5000/predecirFoto')
        var result = await fetch(url, {
            method: 'POST',
            body: formData
        })
        var respuesta = await result.json()
        console.log(respuesta)
        fs.unlinkSync('uploads/' + filename)
        res.send(respuesta)
    });

    /* Obtener las publicaciones de un usuario */
    app.get('/publicaciones/usuario/:usuario', (req,res) => {
        let query = `SELECT titulo, descripcion, fecha, archivo, likes, categoria FROM publicaciones WHERE usuario = '${req.params.usuario}' AND aprovado = 1 ORDER BY categoria`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada", publicacionesDeUnUsuario:rows});
            }
        });
    });
}