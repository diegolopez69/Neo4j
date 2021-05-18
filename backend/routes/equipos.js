let neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
const Router = require('express').Router
const router = new Router();
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

let session2 = driver.session();
router.post('/add',function(req, res){
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


let session5 = driver.session();
router.post('/borrar',function(req, res){
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

module.exports = router;