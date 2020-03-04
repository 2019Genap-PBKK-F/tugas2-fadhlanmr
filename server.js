var http = require('http');
var express = require('express');
var app = express();
var sql = require('mssql')
var bodyParser = require('body-parser');
var hostname = '10.199.14.46';
var port = 8022;

var config = {
    user: "su",
    password: "SaSa1212",
    server: "10.199.13.253",
    database: "nrp05111740000123",
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var  executeQuery = function(res, query){             
    sql.connect(config, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                 }
                 else {
                        // create Request object
                        var request = new sql.Request();
                        // query to the database
                        request.query(query, function (err, res) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                     res.send(err);
                                    }
                                    else {
                                      res.send(res);
                                           }
                              });
                      }
     });           
}

app.get("/",function(req, res)
{
  res.end('FREDDY IN THE HOUSE');
});

//GET API
app.get("/api/mahasiswa", function(req , res){
    var query = "select * from mahasiswa";
    executeQuery (res, query, null, 0);
});

//POST API
app.post("/api/mahasiswa", function(req , res){

    var param = [
        { name: 'nrp', sqltype: sql.Char, value: req.body.nrp},
        { name: 'nama', sqltype: sql.VarChar, value: req.body.nama},
        { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan},
        { name: 'jk', sqltype: sql.VarChar, value: req.body.jk},
        { name: 'tgl', sqltype: sql.Char, value: req.body.tgl},
        { name: 'foto', sqltype: sql.VarChar, value: req.body.foto},
        { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif}
    ]

    var query = 'insert into mahasiswa ( nrp, nama, angkatan, jk, tgl, foto, aktif ) values ( @nrp, @nama, @angkatan, @jk, @tgl, @foto, @aktif )';
    executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/mahasiswa/:id", function(req , res){

    var param = [
        { name: 'id', sqltype: sql.Int, value: req.body.id},
        { name: 'nrp', sqltype: sql.Char, value: req.body.nrp},
        { name: 'nama', sqltype: sql.VarChar, value: req.body.nama},
        { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan},
        { name: 'jk', sqltype: sql.VarChar, value: req.body.jk},
        { name: 'tgl', sqltype: sql.Char, value: req.body.tgl},
        { name: 'foto', sqltype: sql.VarChar, value: req.body.foto},
        { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif}
    ]
    
    var query = "UPDATE mahasiswa SET nama = @nama, nrp = @nrp, angkatan = @angkatan, jk = @jk, tgl = @tgl, foto = @foto, aktif = @aktif WHERE id = @id";
    executeQuery (res, query, param, 1);
});

// DELETE API
app.delete("/api/mahasiswa/:id", function(req , res){
    var query = "DELETE FROM mahasiswa WHERE Id=" + req.params.id;
    executeQuery (res, query, null, 0);
});

// Node Log
app.listen(port, hostname, () => {
    var message = "Server MANTAAAAAAAB " + hostname + port;
    console.log(message);
});