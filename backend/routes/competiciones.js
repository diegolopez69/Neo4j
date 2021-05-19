const Router = require('express').Router
const router = new Router();

const CompeticionesController = require('./../controllers/competicionesController');

router.post('/add',CompeticionesController.add);
router.post('/equipo/add',CompeticionesController.addEquipo);
router.post('/delete',CompeticionesController.addEquipo);

// let session3 = driver.session();
// router.post('/add',function(req, res){
//     let nombreCompeticion = req.body.nombre;

//     session3
//         .run('CREATE(n:competicion {nombre:{nombreCompeticionParam}}) RETURN n.nombre', {nombreCompeticionParam:nombreCompeticion})
//         .then(function(result){
//             res.redirect('/');
//             session3.close();
//         })
//         .catch(function(err){
//             console.log(err);
//         });

//     res.redirect('/');
// })


// let session4 = driver.session();
// router.post('/equipo/add',function(req, res){
//     let nombreCompeticion = req.body.nombreCompeticion;    
//     let nombreEquipo = req.body.nombreEquipo;

//     console.log({nombreCompeticion});
//     console.log({nombreEquipo});
//     session4
//         .run('MATCH(a:equipo {nombre:{nombreEquipoParam}}), (b:competicion{nombre:{nombreCompeticionParam}}) MERGE (a)-[r:COMPITE]-(b) RETURN a,b', {nombreEquipoParam: nombreEquipo, nombreCompeticionParam :nombreCompeticion})
//         .then(function(result){
//         })
//         .catch(function(err){
//             console.log(err);
//         });

//     res.redirect('/');
// })




// router.post('/delete',function(req, res){
//     let nombreCompeticion = req.body.nombre;
//     let session6 = driver.session();
//     session6
//         .run('MATCH (n:competicion {nombre:{nombreCompeticionParam}}) DELETE n.nombre', {nombreCompeticionParam:nombreCompeticion})
//         .then(function(result){
//             res.redirect('/');
//             session6.close();
//         })
//         .catch(function(err){
//             console.log(err);
//         });

//     res.redirect('/');
// })

module.exports = router;