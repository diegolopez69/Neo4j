let neo4j = require("neo4j-driver");
const rabbitPublisher = require("../services/rabbit.publisher.service");
let driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "test")
);

module.exports = {
  //Añadir una competición
  add: (req, res) => {
    
    let nombreCompeticion = req.body.nombre;


    let session3 = driver.session();
    session3
      .run(
        "CREATE(n:competicion {nombre:{nombreCompeticionParam}}) RETURN n.nombre",
        { nombreCompeticionParam: nombreCompeticion }
      )
      .then(function (result) {
        rabbitPublisher.publishMessage("Competición añadida");
        session3.close();
        //res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect('/');
    },
    //Buscar todas las competiciones
    get: (req, res)=>{  
        let session3 = driver.session();
        session3
            .run('CREATE (n:competicion return n)')
            .then(function(result){
                rabbitPublisher.publishMessage('Competición añadida');
                session3.close();
                res.redirect('/');
                
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
        

  //Buscar todas las competiciones
  get: (getCompeticiones = async (req, res) => {
    let temp = [];
    try {
      const tempSession = driver.session();
      const { records: data } = await tempSession.run(
        "MATCH(n:competicion) RETURN n"
      );
      rabbitPublisher.publishMessage("búsqueda de todas las competiciones");
      temp = data.map((record) => {
        return {
          id: record._fields[0].identity.low,
          nombre: record._fields[0].properties.nombre,
        };
      });
      res.send({ competiciones: temp });
    } catch (exception) {
      console.log("fallo por esto: ", exception);
    }
    return temp;
  }),
  //Añadir una competición a un equipo
  addEquipo: (req, res) => {
    
    
    let session4 = driver.session();
    let nombreCompeticion = req.body.nombreCompeticion;
    let nombreEquipo = req.body.nombreEquipo;
    console.log({nombreEquipo});
    console.log({nombreCompeticion});
    
    session4
      .run(
        "MATCH(a:equipo {nombre: $nombreEquipoParam}), (b:competicion{nombre: $nombreCompeticionParam}) MERGE (a)-[r:COMPITE]-(b) RETURN a,b",
        {
          nombreEquipoParam: nombreEquipo,
          nombreCompeticionParam: nombreCompeticion,
        }
      )
      .then(function (result) {
        session4.close();
        console.log('Relación de competición equipo éxitosa!');
        rabbitPublisher.publishMessage("Equipo añadido a una competición");
      })
      .catch(function (err) {
        console.log(err);
      });
    res.redirect("/");
  },

  //Eliminar una competición
  delete: (req, res) => {
    let nombreCompeticion = req.body.nombre;
    let session8 = driver.session();
    session8
      .run(
        "MATCH(n:competicion {nombre: $nombreCompeticionParam}) DETACH DELETE n",
        { nombreCompeticionParam: nombreCompeticion }
      )
      .then(function (result) {
        rabbitPublisher.publishMessage("competición eliminado");
        session8.close();
        //res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
};
