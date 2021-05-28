let neo4j = require("neo4j-driver");
const rabbitPublisher = require("../services/rabbit.publisher.service");
let driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "test")
);

module.exports = {
  //Añadir un equipo
  add: (req, res) => {
    let nombreEquipo = req.body.nombre;
    let session2 = driver.session();
    session2
      .run("CREATE(n:equipo {nombre: $nombreEquipoParam}) RETURN n.nombre", {
        nombreEquipoParam: nombreEquipo,
      })
      .then(function (result) {
        rabbitPublisher.publishMessage("equipo añadido");
        session2.close();
        //res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
  //Buscar a todos los equipos
  get: (getEquipos = async (req, res) => {
    let temp = [];
    try {
      const tempSession = driver.session();
      const { records: data } = await tempSession.run(
        "MATCH(n:equipo) RETURN n"
      );
      temp = data.map((record) => {
        return {
          id: record._fields[0].identity.low,
          nombre: record._fields[0].properties.nombre,
        };
      });
      res.send({ equipos: temp });
    } catch (exception) {
      console.log("fallo por esto: ", exception);
    }
    return temp;
  }),
  //Borrar un equipo
  delete: (req, res) => {
    let nombreEquipo = req.body.nombre;
    let session5 = driver.session();
    session5
      .run("MATCH(n:equipo {nombre: $nombreEquipoParam}) DETACH DELETE n", {
        nombreEquipoParam: nombreEquipo,
      })
      .then(function (result) {
        rabbitPublisher.publishMessage("equipo eliminado");
        session5.close();
        //res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
};
