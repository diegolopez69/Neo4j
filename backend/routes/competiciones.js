const neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
const Router = require('express').Router
const router = new Router();
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

let session3 = driver.session();
router.post('/add',function(req, res){
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


let session4 = driver.session();
router.post('/equipo/add',function(req, res){
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



let session6 = driver.session();
router.post('/delete',function(req, res){
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

module.exports = router;