let neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

module.exports = {
    //Añadir un usuario
    addUsuario: (req, res)=>{  
        let nombreUsuario = req.body.nombre;
        let session10 = driver.session();
        session10
        .run('CREATE(n:usuario {nombre:{nombreUsuarioParam}}) RETURN n.nombre', {nombreUsuarioParam:nombreUsuario})
            .then(function(result){
                rabbitPublisher.publishMessage('Usuario añadido');
                res.redirect('/');
                session10.close();
            })
            .catch(function(err){
                console.log(err);
            });
    
        res.redirect('/');
    },
    //Añadir una contraseña
    addContraseña: (req, res)=>{  
        let nombreContraseña = req.body.nombre;
        let session11 = driver.session();
        session11
            .run('CREATE(n:contraseña {nombre:{nombreContraseñaParam}}) RETURN n.nombre', {nombreContraseñaParam:nombreContraseña})
            .then(function(result){
                rabbitPublisher.publishMessage('Contraseña añadida');
                res.redirect('/');
                session11.close();
            })
            .catch(function(err){
                console.log(err);
            });
    
        res.redirect('/');
    },
}