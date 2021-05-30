let neo4j = require("neo4j-driver");
const rabbitPublisher = require("../services/rabbit.publisher.service");
let driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "test")
);

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
          nombre: record._fields[0].properties.nombre,
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
