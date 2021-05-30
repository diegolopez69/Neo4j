let neo4j = require("neo4j-driver");
const rabbitPublisher = require("../services/rabbit.publisher.service");
let driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "test")
);

const colores = {
  competicion:'red',
  equipo:'yellow',
  jugador:'blue'
}

module.exports = { 
  //Buscar a todos los jugadores
  list:async (req, res) => {
    let temp = [];
    try {
      const tempSession = driver.session();
      const { records: data } = await tempSession.run(
        "MATCH(n) RETURN n"
      );
      rabbitPublisher.publishMessage("búsqueda de todos los jugadores");
      temp = data.map((record) => {
        return {
          id: record._fields[0].identity.low,
          name: record._fields[0].properties.nombre,
          _color: colores[record._fields[0].labels[0]]
        };
      });
      res.send({nodos:temp});
      //res.send(data);
    } catch (exception) {
      console.log("fallo por esto: ", exception);
    }
    return temp;
  },
};
