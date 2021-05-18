let neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

module.exports = {
    add: (req, res)=>{  
    let nombreCompeticion = req.body.nombre;
    let session3 = driver.session();
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
    },

    addEquipo: (req, res)=>{  
        let session4 = driver.session();
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
            
        }    
}