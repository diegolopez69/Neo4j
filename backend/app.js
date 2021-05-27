const cors = require('cors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
let neo4j = require('neo4j-driver');
const routes = require('./routes')
const rabbitPublisher = require('./services/rabbit.publisher.service');
const app = express ();

//view Engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));
let session = driver.session();

const getCompeticions = async () => {
    let temp = [];
    try {
    const tempSession = driver.session();
    const {records: data} = await tempSession.run('MATCH(n:competicion) RETURN n');
    temp = data.map((record) => {
        return {
            id: record._fields[0].identity.low,
            nombre: record._fields[0].properties.nombre
        };
    });
    return temp;
    } catch (exception) {
        console.log("fallo por esto: ", exception)
    }
    return temp;
};

const getEquipos = async () => {
    let temp = [];
    try {
    const tempSession = driver.session();
    const {records: data} = await tempSession.run('MATCH(n:equipo) RETURN n');
    temp = data.map((record) => {
        return {
            id: record._fields[0].identity.low,
            nombre: record._fields[0].properties.nombre
        };
    });
    return temp;
    } catch (exception) {
        console.log("fallo por esto: ", exception)
    }
    return temp;
};

const getJugadores = async (req, res) => {
    let temp = [];
    try {
    const tempSession = driver.session();
    const {records: data} = await tempSession.run('MATCH(n:jugador) RETURN n');
    temp = data.map((record) => {
        return {
            id: record._fields[0].identity.low,
            nombre: record._fields[0].properties.nombre
        };
    });
    res.send({jugadores: temp});
    } catch (exception) {
        console.log("fallo por esto: ", exception)
    }
    return temp;
};

app.get('/', async function(req, res){
    console.log(getCompeticions());
    await getJugadores(req, res);
    //res.send({
        //competiciones: await getCompeticions(),
        // equipos: await getEquipos(),
      //  jugadores: await getJugadores(),
    //});
    
});


app.use(routes);



//Para eliminar todos los nodos
let session7 = driver.session();
app.post('/borrar',function(req, res){
    let nombreCompeticion = req.body.nombre;

    session7
        .run('MATCH (n) DETACH DELETE n')
        .then(function(result){
            session7.close();
            res.redirect('/');
        })
        .catch(function(err){
            console.log(err);
        });    
})

app.listen(3000);
console.log('Server on port 3000');