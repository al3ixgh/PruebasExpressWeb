const express = require('express')

require('./db/mongoose')
const treeRouter = require('./routers/coche')

const port = process.env.PORT

// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  const autos = [
    { marca: 'Audi', modelo: 'A3' },
    { marca: 'BMW', modelo: 'X6' },
    { marca: 'Mercedes', modelo: 'A380' }
  ];
  res.render('index', { coches: autos, titulo: 'Índice' });
});

app.get('/contacto', (req, res) => {
  res.render('contacto', { titulo: 'Contacto' });
});


app.use(express.json())
app.use('/api', treeRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});