const Router = require('express').Router
const router = new Router();

const JugadoresController = require('./../controllers/jugadoresController');

router.post('/add',JugadoresController.add);
router.post('/equipo/add',JugadoresController.addEquipo);


module.exports = router;







// router.post('/add',function(req, res){
//     let nombreJugador = req.body.nombre;
//     let session8 = driver.session();
//     session8
//         .run('CREATE(n:jugador {nombre:{nombreJugadorParam}}) RETURN n.nombre', {nombreJugadorParam:nombreJugador})
//         .then(function(result){
//             rabbitPublisher.publishMessage('Evento enviado');
//             res.redirect('/');
//             session8.close();
//         })
//         .catch(function(err){
//             console.log(err);
//         });

//     res.redirect('/');
// })



// router.post('/equipo/add',function(req, res){ 
//     let nombreEquipo = req.body.nombreEquipo;
//     let nombreJugador = req.body.nombreJugador;
//     let session9 = driver.session();

//     session9
//         .run('MATCH(a:jugador {nombre:{nombreJugadorParam}}), (b:equipo {nombre:{nombreEquipoParam}}) MERGE (a)-[r:JUEGA_EN]-(b) RETURN a,b', {nombreJugadorParam: nombreJugador, nombreEquipoParam: nombreEquipo})
//         .then(function(result){
//         })
//         .catch(function(err){
//             console.log(err);
//         });

//     res.redirect('/');
// })

// module.exports = router;