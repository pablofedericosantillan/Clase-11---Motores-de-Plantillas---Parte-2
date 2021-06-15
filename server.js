const express = require('express');
const productos = require('./api/productos');

// creo una app de tipo express
const app = express();

// incorporo el router
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//establecemos la configuración de ejs
app.set('views', './views');
app.set('view engine', 'ejs');

// A
router.get('/', (req, res) => {
    if(productos.item.length === 0){
        res.render('formulario', {productos: productos.item, hayProductos: false});
    }else{
        res.render('formulario', {productos: productos.item, hayProductos: true});
    }
});

//B
router.get('/:id', (req, res) => {
    if(productos.item.length === 0 || req.params.id > productos.item.length  ){
        res.render('formulario', {productos: [productos.BuscarId(req.params.id)], hayProductos: false});
    }else{
        res.render('formulario', {productos: [productos.BuscarId(req.params.id)], hayProductos: true});
    }
});

//C

router.post('/guardar', (req, res) => {
productos.item=productos.guardar(req.body);
res.redirect('/api/productos/');
});

//D
router.put('/actualizar/:id', (req, res) => {
    res.send(productos.actualizar(req.body,req.params.id))
    });
//E 
router.delete('/borrar/:id', (req, res) => {
    res.send(productos.borrar(req.params.id));
});

app.use('/api/productos', router);

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
