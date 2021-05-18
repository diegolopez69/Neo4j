const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
let neo4j = require('neo4j-driver');

const rabbitPublisher = require('./services/rabbit.publisher.service');
const app = express ();

//view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));
let session = driver.session();


app.get('/paniTest', function(req, res){
    console.log(rabbitPublisher);
    res.send("ok")
});
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
                    res.render('index', {
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
                    res.render('index', {
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



//Para agregar jugadores
let session8 = driver.session();
app.post('/jugador/add',function(req, res){
    let nombreJugador = req.body.nombre;

    session8
        .run('CREATE(n:jugador {nombre:{nombreJugadorParam}}) RETURN n.nombre', {nombreJugadorParam:nombreJugador})
        .then(function(result){
            rabbitPublisher.publishMessage('Evento enviado');
            res.redirect('/');
            session8.close();
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
})



//Para agregar un equipo
let session2 = driver.session();
app.post('/equipo/add',function(req, res){
    let nombreEquipo = req.body.nombre;

    session2
        .run('CREATE(n:equipo {nombre:{nombreEquipoParam}}) RETURN n.nombre', {nombreEquipoParam:nombreEquipo})
        .then(function(result){
            rabbitPublisher.publishMessage('Equipo añadido');
            res.redirect('/');
            session2.close();
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
})


//Para agregar una competición
let session3 = driver.session();
app.post('/competicion/add',function(req, res){
    let nombreCompeticion = req.body.nombre;

    session3
        .run('CREATE(n:competicion {nombre:{nombreCompeticionParam}}) RETURN n.nombre', {nombreCompeticionParam:nombreCompeticion})
        .then(function(result){
            res.redirect('/');
            session3.close();
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
})

//Para relacionar competicion-equipo
let session4 = driver.session();
app.post('/competicion/equipo/add',function(req, res){
    let nombreCompeticion = req.body.nombreCompeticion;    
    let nombreEquipo = req.body.nombreEquipo;

    console.log({nombreCompeticion});
    console.log({nombreEquipo});
    session4
        .run('MATCH(a:equipo {nombre:{nombreEquipoParam}}), (b:competicion{nombre:{nombreCompeticionParam}}) MERGE (a)-[r:COMPITE]-(b) RETURN a,b', {nombreEquipoParam: nombreEquipo, nombreCompeticionParam :nombreCompeticion})
        .then(function(result){
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
})

//Para relacionar equipo-jugador
let session9 = driver.session();
app.post('/jugador/equipo/add',function(req, res){ 
    let nombreEquipo = req.body.nombreEquipo;
    let nombreJugador = req.body.nombreJugador;
    

    session9
        .run('MATCH(a:jugador {nombre:{nombreJugadorParam}}), (b:equipo {nombre:{nombreEquipoParam}}) MERGE (a)-[r:JUEGA_EN]-(b) RETURN a,b', {nombreJugadorParam: nombreJugador, nombreEquipoParam: nombreEquipo})
        .then(function(result){
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
})

//Para eliminar un equipo
let session5 = driver.session();
app.post('/competicion/borrar',function(req, res){
    let nombreEquipo = req.body.nombre;

    session5
        .run('MATCH(n:equipo {nombre:{nombreEquipoParam}}) DETACH DELETE n.nombre', {nombreEquipoParam:nombreEquipo})
        .then(function(result){
            res.redirect('/');
            session5.close();
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
})


//Para eliminar una competición
let session6 = driver.session();
app.post('/competicion/delete',function(req, res){
    let nombreCompeticion = req.body.nombre;

    session6
        .run('MATCH (n:competicion {nombre:{nombreCompeticionParam}}) DELETE n.nombre', {nombreCompeticionParam:nombreCompeticion})
        .then(function(result){
            res.redirect('/');
            session6.close();
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
})


//Para eliminar todos los nodos
let session7 = driver.session();
app.post('/borrar',function(req, res){
    let nombreCompeticion = req.body.nombre;

    session7
        .run('MATCH (n) DETACH DELETE n')
        .then(function(result){
            res.redirect('/');
            session7.close();
        })
        .catch(function(err){
            console.log(err);
        });

    
})

app.listen(3000);
console.log('Server on port 3000');