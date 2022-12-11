const conn = require('../../config/database')
const { instagramLoginFuction } = require('../instagram');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const fetch = require('node-fetch');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('../s3')
var FormData = require('form-data');
module.exports = (app) => {

    /* Obtener foto de perfil de usuario */
    app.get('/bucket/images/fotosPerfil/:key', (req, res) => {
        console.log(req.params.key)
        const key = req.params.key
        const readStream = getFileStream(key)
        readStream.pipe(res)
    });

    /* Subir foto de perfíl */
    app.post('/bucket/images/fotosPerfil/correo/:correo', upload.single('image'), async (req, res) => {
        console.log(req.params.correo);
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        let key = result.Key
        let query = `UPDATE usuarios SET foto = '${key}' WHERE correo = '${req.params.correo}'`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir foto de pintura */
    app.post('/bucket/images/pintura/correo/:correo/fecha/:fecha', upload.single('image'), async (req, res) => {
        const file = req.file
        const result = await uploadFile(file)
        const filename = req.file.originalname
        fs.rename(req.file.path, 'uploads/' +filename, () => {
            console.log("\nFile Renamed!\n")
        });
        const newfile = fs.createReadStream('uploads/' + filename);
        const formData = new FormData();
        formData.append('file', newfile, filename)
        url = new URL('http://127.0.0.1:5000/predecirFoto')
        var resultado = await fetch(url, {
            method: 'POST',
            body: formData
        })
        var respuesta = await resultado.json()
        console.log(respuesta)
        fs.unlinkSync('uploads/' + filename)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado, descripcion) VALUES ('${req.params.correo}','P','${req.params.fecha}','${key}', 0, 0, '${respuesta}')`
        conn.query(query, (err, rows, cols) => {
            if(err){
                console.log(err);
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir foto de fotografia */
    app.post('/bucket/images/fotografia/correo/:correo/fecha/:fecha', upload.single('image'), async (req, res) => {
        const file = req.file
        const result = await uploadFile(file)
        const filename = req.file.originalname
        fs.rename(req.file.path, 'uploads/' +filename, () => {
            console.log("\nFile Renamed!\n")
        });
        const newfile = fs.createReadStream('uploads/' + filename);
        const formData = new FormData();
        formData.append('file', newfile, filename)
        url = new URL('http://127.0.0.1:5000/predecirFoto')
        var resultado = await fetch(url, {
            method: 'POST',
            body: formData
        })
        var respuesta = await resultado.json()
        console.log(respuesta)
        fs.unlinkSync('uploads/' + filename)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado, descripcion) VALUES ('${req.params.correo}','F','${req.params.fecha}','${key}', 0, 0, '${respuesta}')`
        conn.query(query, (err, rows, cols) => {
            if(err){
                console.log(err);
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir foto de grafiti */
    app.post('/bucket/images/grafiti/correo/:correo/fecha/:fecha', upload.single('image'), async (req, res) => {
        const file = req.file
        const result = await uploadFile(file)
        const filename = req.file.originalname
        fs.rename(req.file.path, 'uploads/' +filename, () => {
            console.log("\nFile Renamed!\n")
        });
        const newfile = fs.createReadStream('uploads/' + filename);
        const formData = new FormData();
        formData.append('file', newfile, filename)
        url = new URL('http://127.0.0.1:5000/predecirFoto')
        var resultado = await fetch(url, {
            method: 'POST',
            body: formData
        })
        var respuesta = await resultado.json()
        console.log(respuesta)
        fs.unlinkSync('uploads/' + filename)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado, descripcion) VALUES ('${req.params.correo}','G','${req.params.fecha}','${key}', 0, 0, '${respuesta}')`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir foto de tattoo */
    app.post('/bucket/images/tattoo/correo/:correo/fecha/:fecha', upload.single('image'), async (req, res) => {
        const file = req.file
        const result = await uploadFile(file)
        const filename = req.file.originalname
        fs.rename(req.file.path, 'uploads/' +filename, () => {
            console.log("\nFile Renamed!\n")
        });
        const newfile = fs.createReadStream('uploads/' + filename);
        const formData = new FormData();
        formData.append('file', newfile, filename)
        url = new URL('http://127.0.0.1:5000/predecirFoto')
        var resultado = await fetch(url, {
            method: 'POST',
            body: formData
        })
        var respuesta = await resultado.json()
        console.log(respuesta)
        fs.unlinkSync('uploads/' + filename)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado, descripcion) VALUES ('${req.params.correo}','T','${req.params.fecha}','${key}', 0, 0, '${respuesta}')`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir video */
    app.post('/bucket/videos/correo/:correo/fecha/:fecha', upload.single('video'), async (req, res) => {
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado) VALUES ('${req.params.correo}','V','${req.params.fecha}','${key}', 0, 0)`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir canción */
    app.post('/bucket/audios/correo/:correo/fecha/:fecha', upload.single('audio'), async (req, res) => {
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado) VALUES ('${req.params.correo}','M','${req.params.fecha}','${key}', 0, 0)`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Obtener archivos solo por key */
    app.get('/file/:key', (req, res) => {
        const key = req.params.key
        const readStream = getFileStream(key)
        readStream.pipe(res)
    });

    /* Subir foto de pintura con instagram*/
    app.post('/bucket/images/pintura/correo/:correo/fecha/:fecha/user/:user/password/:pass', upload.single('image'), async (req, res) => {
        const file = req.file
        await instagramLoginFuction(`${req.params.user}`, `${req.params.pass}`, `Desde ShowUrArt`, req.file.path)
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado) VALUES ('${req.params.correo}','P','${req.params.fecha}','${key}', 0, 0)`
        conn.query(query, (err, rows, cols) => {
            if(err){
                console.log(err);
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir foto de fotografia con instagram */
    app.post('/bucket/images/fotografia/correo/:correo/fecha/:fecha/user/:user/password/:pass', upload.single('image'), async (req, res) => {
        instagramLoginFuction(`${req.params.user}`, `${req.params.pass}`, "" ,req.file.path)
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado) VALUES ('${req.params.correo}','F','${req.params.fecha}','${key}', 0, 0)`
        conn.query(query, (err, rows, cols) => {
            if(err){
                console.log(err);
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir foto de grafiti con instagram */
    app.post('/bucket/images/grafiti/correo/:correo/fecha/:fecha/user/:user/password/:pass', upload.single('image'), async (req, res) => {
        instagramLoginFuction(`${req.params.user}`, `${req.params.pass}`, "" ,req.file.path)
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado) VALUES ('${req.params.correo}','G','${req.params.fecha}','${key}', 0, 0)`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });

    /* Subir foto de tattoo con instagram*/
    app.post('/bucket/images/tattoo/correo/:correo/fecha/:fecha/user/:user/password/:pass', upload.single('image'), async (req, res) => {
        instagramLoginFuction(`${req.params.user}`, `${req.params.pass}`, "" ,req.file.path)
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        let key = result.Key
        let query = `INSERT into publicaciones(usuario, categoria, fecha ,archivo, likes, aprovado) VALUES ('${req.params.correo}','T','${req.params.fecha}','${key}', 0, 0)`
        conn.query(query, (err, rows, cols) => {
            if(err){
                res.json({status: 0, mensaje: "Error en la consulta"});
            } else {
                res.json({status: 1, mensaje: "Consulta ejecutada"});
            }
        });
    });
}