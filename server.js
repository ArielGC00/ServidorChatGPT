import express from "express";
import mysql from "mysql";
import cors from "cors";
// Se utiliza express para hacer un servidor
const app = express();
// Función para relizar la conexión con la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ari20o4Car!",
  database: "TuSalud"
});
// Función para mostrar el error si es que ocurre
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida correctamente.');
});

app.use(express.json())
app.use(cors())

// función para relizar el get de la base de datos
app.get("/chatgpt", (req, res) => {
  const q = "SELECT * FROM ConsultasIA";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// función para realizar el post a la base de datos
app.post("/chatgpt",(req,res)=>{
    const q="insert into ConsultasIA(dagnositcoConsulta) values(?)";
    const values=[
        req.body.diagnostico,
    ];
    db.query(q,[values],(err,data)=>{
        if (err) return res.json(err);
        return res.json('se han agregado los datos');
    })
})


app.listen(8800, () => {
  console.log("Servidor iniciado en el puerto 8800");
});
