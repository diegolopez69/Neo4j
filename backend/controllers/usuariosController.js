let neo4j = require("neo4j-driver");
const rabbitPublisher = require("../services/rabbit.publisher.service");
let driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "test")
);

module.exports = {
  //Añadir un usuario
  add: (req, res) => {
    let nombreUsuario = req.body.nombre;
    let session13 = driver.session();
    session13
      .run("CREATE(n:usuario {nombre: $nombreUsuarioParam}) RETURN n.nombre", {
        nombreUsuarioParam: nombreUsuario,
      })
      .then(function (result) {
        rabbitPublisher.publishMessage("usuario añadido");
        session13.close();
        //res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },


  //Buscar a todos los usuarios
  get: (getUsuarios = async (req, res) => {
    let temp = [];
    try {
      const tempSession = driver.session();
      const { records: data } = await tempSession.run(
        "MATCH(n:usuario) RETURN n"
      );
      rabbitPublisher.publishMessage("usuario añadido");
      temp = data.map((record) => {
        return {
          id: record._fields[0].identity.low,
          nombre: record._fields[0].properties.nombre,
        };
      });
      res.send({ usuarios: temp });
    } catch (exception) {
      console.log("fallo por esto: ", exception);
    }
    return temp;
  }),

  //Borrar un usuario
  delete: (req, res) => {
    let nombreUsuario = req.body.nombre;
    let session15 = driver.session();
    session15
      .run("MATCH(n:usuario {nombre: $nombreUsuarioParam}) DETACH DELETE n", {
        nombreUsuarioParam: nombreUsuario,
      })
      .then(function (result) {
        rabbitPublisher.publishMessage("usuario eliminado");
        session15.close();
        //res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
};
