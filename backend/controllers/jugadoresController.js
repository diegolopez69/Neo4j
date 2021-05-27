let neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

module.exports = {
    //Añadir una competición
    add: (req, res)=>{  
        let nombreJugador = req.body.nombre;
        let session8 = driver.session();
        session8
            .run('CREATE(n:jugador {nombre:{nombreJugadorParam}}) RETURN n.nombre', {nombreJugadorParam:nombreJugador})
            .then(function(result){
                rabbitPublisher.publishMessage('Jugador añadido');
                session8.close();
                res.redirect('/');
                
            })
            .catch(function(err){
                console.log(err);
            });
    
        res.redirect('/');
    },
    //Añadir una jugadores a un equipo
    addEquipo: (req, res)=>{  
        let nombreEquipo = req.body.nombreEquipo;
        let nombreJugador = req.body.nombreJugador;
        let session9 = driver.session();
    
        session9
            .run('MATCH(a:jugador {nombre:{nombreJugadorParam}}), (b:equipo {nombre:{nombreEquipoParam}}) MERGE (a)-[r:JUEGA_EN]-(b) RETURN a,b', {nombreJugadorParam: nombreJugador, nombreEquipoParam: nombreEquipo})
            .then(function(result){
            rabbitPublisher.publishMessage('Jugador añadido a un equipo');
            session9.close();
            res.redirect('/');
            })
            .catch(function(err){
                console.log(err);
            });
    
        res.redirect('/');
    },
    //Buscar a todos los jugadores
    get: (req, res)=>{  
        let session12 = driver.session();
        session12
            .run('MATCH (n:jugador) RETURN n')
            .then(function (result) {
                rabbitPublisher.publishMessage('búsqueda de todos los jugadores');
                session12.close();
                res.redirect('/');

            })
            .catch(function (err) {
                console.log(err);
            });

        res.redirect('/');
    },
    //Borrar un jugador
    delete:(req, res)=>{
        let nombreJugador = req.body.nombre;
        let session13 = driver.session();
        session13
            .run('MATCH(n:jugador {nombre:{nombreJugadorParam}}) DETACH DELETE n', {nombreJugadorParam:nombreJugador})
            .then(function(result){
                rabbitPublisher.publishMessage('jugador eliminado');
                session13.close();
                res.redirect('/');
                
            })
            .catch(function(err){
                console.log(err);
            });
    
        res.redirect('/');
    }
}