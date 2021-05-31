let neo4j = require("neo4j-driver");
const rabbitPublisher = require("../services/rabbit.publisher.service");
let driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "test")
);

module.exports = {
  //Añadir un usuario
  addUsuario: (req, res) => {
    let nombreUsuario = req.body.nombre;
    let session10 = driver.session();
    session10
      .run("CREATE(n:usuario {nombre:{nombreUsuarioParam}}) RETURN n.nombre", {
        nombreUsuarioParam: nombreUsuario,
      })
      .then(function (result) {
        rabbitPublisher.publishMessage("Usuario añadido");
        session10.close();
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
  //Añadir una contraseña
  addContraseña: (req, res) => {
    let nombreContra = req.body.nombre;
    let session11 = driver.session();
    session11
      .run(
        "CREATE(n:contraseña {nombre:{nombreContraseñaParam}}) RETURN n.nombre",
        { nombreContraseñaParam: nombreContra }
      )
      .then(function (result) {
        rabbitPublisher.publishMessage("Contraseña añadida");
        session11.close();
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
  //Relacionar un usuario-contraseña
  addUsuarioContraseña: (req, res) => {
    let nombreUsuario = req.body.nombreUsuario;
    let nombreContra = req.body.nombreContra;
    let session9 = driver.session();

    session9
      .run(
        "MATCH(a:usuario {nombre:{nombreUsuarioParam}}), (b:contraseña {nombre:{nombreContraseñaParam}}) MERGE (a)-[r:ACCEDE_CON]-(b) RETURN a,b",
        {
          nombreUsuarioParam: nombreUsuario,
          nombreContraseñaParam: nombreContra,
        }
      )
      .then(function (result) {
        rabbitPublisher.publishMessage("creada la relación usuario-contraseña");
        session9.close();
        res.redirect("/");
      })
      .catch(function (err) {
        console.log(err);
      });

    res.redirect("/");
  },
  //Para entrar
  entrar: (getEquipos = async (req, res) => {
    let temp = [];
    try {
      const tempSession = driver.session();
      const firstQUery = await tempSession.run(
        "match (n:usuario {nombre: 'admin'}) return n"
      );
      const secondQUeryRESult = await tempSession.run(
        "match (n:contraseña {nombre: '123'}) return n"
      ); 
      
      if(firstQUery.records.length && secondQUeryRESult.records.length){
        res.send({
          login:true,
          message:'Usuario autenticado exitosamente'
        });
        console.log('Entrooooo');
      }else{
        res.send({
          login:false,
          message:'Usuario o contraseña incorrectos'
        })
        console.log('NO Entrooooo');
      }
      
      rabbitPublisher.publishMessage("Usuario esta tratando de ingresar");
     /* temp = data.map((record) => {
        return {
          id: record._fields[0].identity.low,
          nombre: record._fields[0].properties.nombre,
        };
      });
      res.send({ equipos: temp });*/
    } catch (exception) {
      console.log("fallo por esto: ", exception);
    }
    return temp;
  }),
};
