let neo4j = require("neo4j-driver");
const rabbitPublisher = require("../services/rabbit.publisher.service");
let driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "test")
);

module.exports = {
  //Añadir un jugador
  add: (req, res) => {
    let nombreJugador = req.body.nombre;
    let session8 = driver.session();
    session8
      .run("CREATE(n:jugador {nombre: $nombreJugadorParam}) RETURN n.nombre", {
        nombreJugadorParam: nombreJugador,
      })
      .then(function (result) {
        rabbitPublisher.publishMessage("jugador añadido");
        session8.close();
        //res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },

  //Añadir una jugadores a un equipo
  addEquipo: (req, res) => {
    let nombreEquipo = req.body.nombreEquipo;
    let nombreJugador = req.body.nombreJugador;
    let session9 = driver.session();

    session9
      .run(
        "MATCH(a:jugador {nombre:{nombreJugadorParam}}), (b:equipo {nombre:{nombreEquipoParam}}) MERGE (a)-[r:JUEGA_EN]-(b) RETURN a,b",
        { nombreJugadorParam: nombreJugador, nombreEquipoParam: nombreEquipo }
      )
      .then(function (result) {
        rabbitPublisher.publishMessage("Jugador añadido a un equipo");
        session9.close();
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
  //Buscar a todos los jugadores
  get: (getJugadores = async (req, res) => {
    let temp = [];
    try {
      const tempSession = driver.session();
      const { records: data } = await tempSession.run(
        "MATCH(n:jugador) RETURN n"
      );
      rabbitPublisher.publishMessage("jugador añadido");
      temp = data.map((record) => {
        return {
          id: record._fields[0].identity.low,
          nombre: record._fields[0].properties.nombre,
        };
      });
      res.send({ jugadores: temp });
    } catch (exception) {
      console.log("fallo por esto: ", exception);
    }
    return temp;
  }),

  //Borrar un jugador
  delete: (req, res) => {
    let nombreJugador = req.body.nombre;
    let session8 = driver.session();
    session8
      .run("MATCH(n:jugador {nombre: $nombreJugadorParam}) DETACH DELETE n", {
        nombreJugadorParam: nombreJugador,
      })
      .then(function (result) {
        rabbitPublisher.publishMessage("jugador eliminado");
        session8.close();
        //res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
};
