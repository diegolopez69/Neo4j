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



app.get('/', function(req, res){
    session
        .run('MATCH(n:competicion) RETURN n LIMIT 25')
        .then(function(result){
            let competicionArr = [];
            result.records.forEach(function(record){
                competicionArr.push({
                    id: record._fields[0].identity.low,
                    nombre: record._fields[0].properties.nombre
                });
            });

            session
                .run('MATCH(n:equipo) RETURN n LIMIT 25')
                .then(function(result2){
                    let equipoArr = [];
                    result2.records.forEach(function(record){
                        equipoArr.push({
                            id: record._fields[0].identity.low,
                            nombre: record._fields[0].properties.nombre
                        });
                    });
                    res.send({
                        competiciones: competicionArr,
                        equipos: equipoArr,                         
                    });
                })
                .catch(function(err){
                    console.log(err);
                });

                session
                .run('MATCH(n:jugador) RETURN n LIMIT 25')
                .then(function(result3){
                    let jugadorArr = [];
                    result3.records.forEach(function(record){
                        jugadorArr.push({
                            id: record._fields[0].identity.low,
                            nombre: record._fields[0].properties.nombre
                        });
                    });
                    res.send({
                        competiciones: competicionArr,
                        equipos: equipoArr,
                        jugadores: jugadorArr
                    });
                })
                .catch(function(err){
                    console.log(err);
                });
        })
        .catch(function(err){
            console.log({err});
        });
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