const { instagramLoginFuction } = require('../instagram');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
module.exports = (app) => {
    app.post('/rs/instagram/usuario/:usuario/pass/:password/des/:des', upload.single('image'), async (req, res) => {
        let z = instagramLoginFuction(`${req.params.usuario}`, `${req.params.password}`, `${req.params.des}` , req.file.path);
        res.json(z)
    });
}