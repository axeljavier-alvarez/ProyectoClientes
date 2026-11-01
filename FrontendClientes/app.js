
const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const clientesRoutes = require('./routes/clientes');

console.log('Rutas importadas:', typeof clientesRoutes);

app.use('/', clientesRoutes);

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
