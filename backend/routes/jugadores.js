let neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
const Router = require('express').Router
const router = new Router();
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

let session8 = driver.session();
router.post('/add',function(req, res){
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

let session9 = driver.session();
router.post('/equipo/add',function(req, res){ 
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

module.exports = router;