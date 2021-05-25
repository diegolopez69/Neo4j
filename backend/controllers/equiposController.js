let neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

module.exports = {
    //Añadir un equipo
    add: (req, res)=>{  
        let nombreEquipo = req.body.nombre;
        let session2 = driver.session();
        session2
            .run('CREATE(n:equipo {nombre:{nombreEquipoParam}}) RETURN n.nombre', {nombreEquipoParam:nombreEquipo})
            .then(function(result){
                rabbitPublisher.publishMessage('Equipo añadido');
                session2.close();
                res.redirect('/');
            })
            .catch(function(err){
                console.log(err);
            });
    
        res.redirect('/');
    },
    //Borrar un equipo
    borrar:(req, res)=>{
        let nombreEquipo = req.body.nombre;
        let session5 = driver.session();
        session5
            .run('MATCH(n:equipo {nombre:{nombreEquipoParam}}) DETACH DELETE n.nombre', {nombreEquipoParam:nombreEquipo})
            .then(function(result){
                rabbitPublisher.publishMessage('Equipo eliminado');
                session5.close();
                res.redirect('/');
                
            })
            .catch(function(err){
                console.log(err);
            });
    
        res.redirect('/');
    }
}