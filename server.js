const express = require("express");
const app = express();
const sql = require('mssql')
const hostname = '10.199.14.46';
// const hostname = 'localhost';
const port = 8022;

// CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// DB Config
const config = {
    user: 'su',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000123'
};

// Main Function
var executeQuery = function(res, query, param, reqType) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      if(reqType != 0) {
        param.forEach(function(p)
        {
          request.input(p.name, p.sqltype, p.value);
        });
      }
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          res.send(response.recordset)
        }
     })
    }
  })
}

// GET API
app.get("/",function(req, res)
{
  res.end('help meh');
});

app.get("/api/mahasiswa", function(req, res)
{
  var query = "select * from mahasiswa";
  executeQuery(res, query, null, 0);
});

// POST API
app.post("/api/mahasiswa", function(req, res)
{
  var param = [
    { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
    { name: 'jk', sqltype: sql.VarChar, value: req.body.jk },
    { name: 'tgl', sqltype: sql.Char, value: req.body.tgl },
    { name: 'foto', sqltype: sql.VarChar, value: req.body.foto },
    { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif}
  ]

  var query = 'insert into mahasiswa ( nrp, nama, angkatan, jk, tgl, foto, aktif ) values( @nrp, @nama, @angkatan, @jk, @tgl, @foto, @aktif)';
  executeQuery(res, query, param, 1)
})

// UPDATE API
app.put('/api/mahasiswa/:id',function(req,res)
{

  var param = [
    { name: 'id', sqltype: sql.Int, value: req.body.id }, 
    { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
    { name: 'jk', sqltype: sql.VarChar, value: req.body.jk },
    { name: 'tgl', sqltype: sql.Char, value: req.body.tgl },
    { name: 'foto', sqltype: sql.VarChar, value: req.body.foto },
    { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif }
  ]
  
  var query = "update mahasiswa set nama = @nama, nrp = @nrp, angkatan = @angkatan, jk = @jk, tgl = @tgl, foto = @foto, aktif = @aktif WHERE id = @id";
  executeQuery(res,query, param, 1);
});

// DELETE API
app.delete('/api/mahasiswa/:id', function(req, res)
{
  var query = "delete from mahasiswa where id =" + req.params.id;
  executeQuery(res, query, null, 0);
})

app.listen(port, hostname, function () {
  var message = "Server JALAN BOSS : " + port;
  console.log(message);
});