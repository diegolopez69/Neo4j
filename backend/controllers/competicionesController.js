let neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

module.exports = {
    //Añadir una competición
    add: (req, res)=>{  
    let nombreCompeticion = req.body.nombre;
    let session3 = driver.session();
    session3
        .run('CREATE(n:competicion {nombre:{nombreCompeticionParam}}) RETURN n.nombre', {nombreCompeticionParam:nombreCompeticion})
        .then(function(result){
            rabbitPublisher.publishMessage('Competición añadida');
            res.redirect('/');
            session3.close();
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
    },
    //Añadir una competición a un equipo
    addEquipo: (req, res)=>{  
        let session4 = driver.session();
        let nombreCompeticion = req.body.nombreCompeticion;    
        let nombreEquipo = req.body.nombreEquipo;
        

        console.log({nombreCompeticion});
        console.log({nombreEquipo});
        session4
            .run('MATCH(a:equipo {nombre:{nombreEquipoParam}}), (b:competicion{nombre:{nombreCompeticionParam}}) MERGE (a)-[r:COMPITE]-(b) RETURN a,b', {nombreEquipoParam: nombreEquipo, nombreCompeticionParam :nombreCompeticion})
            .then(function(result){
            rabbitPublisher.publishMessage('Equipo añadido a una competición');
            })
            .catch(function(err){
                console.log(err);
            });
        res.redirect('/');
        },
        //Eliminar una competición
        delete: (req, res)=>{  
            let nombreCompeticion = req.body.nombre;
            let session6 = driver.session();
            session6
                .run('MATCH (n:competicion {nombre:{nombreCompeticionParam}}) DELETE n.nombre', {nombreCompeticionParam:nombreCompeticion})
                .then(function(result){
                    rabbitPublisher.publishMessage('Competición eliminada');
                    res.redirect('/');
                    session6.close();
                })
                .catch(function(err){
                    console.log(err);
                });

            res.redirect('/');
                        
            },
}