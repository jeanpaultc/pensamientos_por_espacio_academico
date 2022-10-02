//prepara la conección a la base de datos
var mysql = require('mysql');
const fs = require('fs')
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sistematizaciondatos_com",
  password: ""
});

//se conecta a la base de datos
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//prueba exótica
let algo = {
    name: "perro sarnoso",
    data: [
        {
            name: "como su papa",
            value: 3
        },{
            name: "sapo hpta",
            value: 5
        }
    ]
};
console.log(algo)

//carga los datos de la base de datos para almacenarlo en un archivo json bien makia, bien exótico
con.query('select re.codigo, re.nombre, rp.detalle, count(rp.detalle) as cantidad from res_asignacion_pensamiento rap join res_espacio re on (rap.codigo_espacio = re.codigo) join res_pensamiento rp on (rap.codigo_pensamiento = rp.codigo) group by re.codigo, rp.codigo order by re.codigo;', function (error, results, fields) {
    if (error)
        throw error;
    
    //guarda los elementos de la búsqueda en arrays
    let i=1;
    let nombre="";
    let datos=[];
    let data=[];
    results.forEach(element => {
        if(element.codigo > i){
            data.push({
                name: nombre,
                data: datos
            });
            i = element.codigo;
            datos=[];
        }
        nombre = element.nombre;
        datos.push({
            name: element.detalle,
            value: element.cantidad
        });
    });
    //console.log(data);

    //crea el archivo JSON con los bien exóticos arrays gomelos 👌
    fs.writeFile("datos.json", JSON.stringify(data), (err) => {
      if (err) {
       console.error(err)
       return
      }
    })
});

//finaliza la conección
con.end();


var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.get('/',function(request,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/datos.json',function(request,res){
  res.sendFile(__dirname + '/datos.json');
});

app.get('/estilo.css',function(request,res){
  res.sendFile(__dirname + '/estilo.css');
});

app.get('/graficar.js',function(request,res){
  res.sendFile(__dirname + '/graficar.js');
});


app.listen(3000,function(){
  console.log('El servidor Esta En llamas!');
});