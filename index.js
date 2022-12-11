const app = require('./config/server');
require('./app/rutas/usuarios')(app);
require('./app/rutas/bucket')(app);
require('./app/rutas/publicaciones')(app);
require('./app/rutas/rs')(app);
require('./app/rutas/administrador')(app);
app.listen(app.get('port'),
    () => console.log(`server corriendo en puerto ${app.get('port')}`));
