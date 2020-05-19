const express = require("express");
const app = express();
const sql = require('mssql')
//const hostname = '10.199.14.46';
const hostname = 'localhost';
const port = 8022;

// CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, *")
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// DB Config
const config = {
    user: 'sa',
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

//Data Dasar

app.get("/api/data-dasar/", function(req, res)
{
    var query = "select * from DataDasar"
    executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/nama", function(req, res)
{
  var query = 'select id, nama as name from DataDasar'
  executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/:id",function(req, res)
{
    var query = "select * from DataDasar where id=" + req.params.id
    executeQuery(res, query, null, 0)
})

app.post("/api/data-dasar/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date ) values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP + 365) )'
  executeQuery(res, query, model, 1)
})

app.put("/api/data-dasar/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = 'update DataDasar set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id'
  executeQuery(res, query, model, 1)
})

app.delete("/api/data-dasar/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.params.id }
  ]

  var query = "delete from DataDasar where id = @id"
  executeQuery(res, query, model, 1)
})

//Jenis SatKer 

app.get("/api/jenis-satker/", function(req, res)
{
    var query = "select * from JenisSatker"
    executeQuery(res, query, null, 0)
})

app.get("/api/jenis-satker/nama", function(req, res)
{
    var query = "select id, nama as name from JenisSatker"
    executeQuery(res, query, null, 0)
})

app.post("/api/jenis-satker/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    // { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = 'insert into JenisSatker ( nama, create_date, last_update, expired_date ) values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP + 365) )'
  executeQuery(res, query, model, 1)
})

app.put("/api/jenis-satker/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = "update JenisSatker set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id" 
  executeQuery(res, query, model, 1)
})

app.delete("/api/jenis-satker/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.params.id }
  ]

  var query = "delete from JenisSatker where id = @id" 
  executeQuery(res, query, model, 1)
})

//Periode

app.get("/api/periode/", function(req, res)
{
    var query = "select * from Periode"
    executeQuery(res, query, null, 0)
})

app.get("/api/periode/tahun", function(req, res)
{
    var query = "select id, nama as name from Periode"
    executeQuery(res, query, null, 0)
})

app.post("/api/periode/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = "insert into Periode( nama, create_date, last_update ) values ( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"
  executeQuery(res, query, model, 1)
})

app.put("/api/periode/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "update Periode set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id" 
  executeQuery(res, query, model, 1)
})

app.delete("/api/periode/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.params.id }
  ]

  var query = "delete from Periode where id = @id"
  executeQuery(res, query, model, 1)
})

// Aspek

app.get("/api/aspek/", function(req, res)
{
    var query = "select * from Aspek"
    executeQuery(res, query, null, 0)
})

app.get("/api/aspek/nama", function(req, res)
{
    var query = "select id, aspek as name from Aspek"
    executeQuery(res, query, null, 0)
})

app.post("/api/aspek/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponenAspek }
  ]

  var query = "insert into Aspek( aspek, komponen_aspek ) values ( @aspek, @komponen_aspek )"
  executeQuery(res, query, model, 1)
})

app.put("/api/aspek/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.params.id },
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponenAspek }
  ]

  var query = "update Aspek set aspek = @aspek, komponen_aspek = @komponen_aspek where id = @id" 
  executeQuery(res, query, model, 1)
})

app.delete("/api/aspek/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.params.id }
  ]

  var query = "delete from Aspek where id = @id"
  executeQuery(res, query, model, 1)
})


//Master Indikator

app.get("/api/master-indikator/", function(req, res)
{
  var query = "select * from MasterIndikator"
  executeQuery(res, query, null, 0)
})

app.get("/api/master-indikator/nama", function(req, res)
{
  var query = "select id, nama as name from MasterIndikator"
  executeQuery(res, query, null, 0)
})

app.post("/api/master-indikator/", function(req, res)
{
  var model = [
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = "insert into MasterIndikator( id_aspek, id_penyebut, id_pembilang, nama, deskripsi, default_bobot, create_date, last_update, expired_date ) "
              + "values( @id_aspek, @id_penyebut, @id_pembilang, @nama, @deskripsi, @default_bobot, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP+365) )"
  executeQuery(res, query, model, 1)
})

app.put("/api/master-indikator/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot }
  ]

  var query = "update MasterIndikator set id_aspek = @id_aspek, id_penyebut = @id_penyebut, id_pembilang = @id_pembilang, nama = @nama, deskripsi = @deskripsi, "
              + "default_bobot = @default_bobot, last_update = CURRENT_TIMESTAMP where id = @id"
  executeQuery(res, query, model, 1)
})

app.delete("/api/master-indikator/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.params.id }
  ]
  
  var query = "delete from MasterIndikator where id = @id"
  executeQuery(res, query, model, 1)
})

//Indikator Periode

app.get("/api/indikator-periode", function(req, res)
{
  var query = "select * from Indikator_Periode"
  executeQuery(res, query, null, 0)
})

app.post("/api/indikator-periode", function(req, res)
{
  var model = [
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
  ]
  console.log(model)

  var query = "insert into Indikator_Periode values( @id_master, @id_periode, @bobot )"
  executeQuery(res, query, model, 1)
})

app.put("/api/indikator-periode/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'id', sqltype: sql.Int, value: req.params.id },
    { name: 'id2', sqltype: sql.Int, value: req.params.id2 }
  ]

  var query = "update Indikator_Periode set id_master = @id_master, id_periode = @id_periode, bobot = @bobot where id_master = @id and id_periode = @id2"
  executeQuery(res, query, model, 1)
})

app.delete("/api/indikator-periode/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_master', sqltype: sql.Int, value: req.params.id },
    { name: 'id_periode', sqltype: sql.Int, value: req.params.id2 },
  ]

  var query = "delete from Indikator_Periode where id_master = @id_master and id_periode = @id_periode"
  executeQuery(res, query, model, 1)
})

//Satuan Kerja

app.get("/api/satuan-kerja/", function(req, res)
{
  var query = "select * from SatuanKerja"
  executeQuery(res, query, null, 0)
})

app.get("/api/satuan-kerja/induk", function(req, res)
{
  var query = "select id, nama as name from SatuanKerja"  
  executeQuery(res, query, null, 0)
})

app.post("/api/satuan-kerja/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'level_unit', sqltype: sql.Int, value: req.body.level_unit },
    { name: 'id_induk_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_induk_satker },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    // { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = "insert into SatuanKerja( id, nama, level_unit, id_induk_satker, id_jns_satker, email, create_date, last_update, expired_date)" +
              "values( @id, @nama, @level_unit, @id_induk_satker, @id_jns_satker, @email, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP+365) )"
  executeQuery(res, query, model, 1)
})

app.put("/api/satuan-kerja/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'level_unit', sqltype: sql.Int, value: req.body.level_unit },
    { name: 'id_induk_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_induk_satker },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    // { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = "update SatuanKerja set nama = @nama, level_unit = @level_unit, id_induk_satker = @id_induk_satker, id_jns_satker = @id_jns_satker, email = @email, last_update = CURRENT_TIMESTAMP " +
              "where id = @id"
  executeQuery(res, query, model, 1)
})

app.delete("/api/satuan-kerja/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.params.id }
  ]

  var query = "delete from SatuanKerja where id = @id"
  executeQuery(res, query, model, 1)
})

//Capaian Unit

app.get("/api/capaian-unit/",function(req, res)
{
    var query = "select * from Capaian_Unit"
    executeQuery(res, query, null, 0)
})

app.post("/api/capaian-unit/", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "insert into Capaian_Unit values( @id_satker, @id_datadasar, @capaian, CURRENT_TIMESTAMP )"
  executeQuery(res, query, model, 1)
})

app.put("/api/capaian-unit/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.params.id },
    { name: 'id2', sqltype: sql.Int, value: req.params.id2 }
  ]

  var query = "update Capaian_Unit set id_satker = @id_satker, id_datadasar = @id_datadasar, capaian = @capaian where id_satker = @id and id_datadasar = @id2"
  executeQuery(res, query, model, 1)
})

app.delete("/api/capaian-unit/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.params.id },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.params.id2 }
  ]

  var query = "delete from Capaian_Unit where id_satker = @id_satker and id_datadasar = @id_datadasar"
  executeQuery(res, query, model, 1)
})

//Indikator Satuan Kerja

app.get("/api/indikator-satuan-kerja/:id", function(req, res)
{
	var model = [
		{ name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.params.id },
	]
	
	var query = "select a.aspek as Aspek, a.komponen_aspek as Komponen, mi.nama as Indikator, isk.bobot as Bobot, isk.target as Target, isk.capaian as Capaian from indikator_satuankerja as isk, masterindikator as mi, aspek as a where a.id = mi.id_aspek and mi.id = isk.id_master and isk.id_satker = @id_satker"
	//var query = "select id_periode as num, id_master as Aspek, id_master as Komponen, id_satker as Indikator, bobot as Bobot, target as Target, capaian as Capaian from indikator_satuankerja where id_satker = @id_satker"
	//var query = "select * from indikator_satuankerja where id_satker = @id_satker"
	executeQuery(res, query, model, 1)
})

app.get("/api/satuan-kerja/dropdown", function(req, res)
{
  var query = "select id, nama from SatuanKerja where nama like 'Departemen%' or nama like 'Fakultas%' order by nama"  
  executeQuery(res, query, null, 0)
})

//Log Indikator Satuan Kerja

app.get("/api/log-indikator-satker", function(req, res){
  var query = "select * from Indikator_SatuanKerja_Log"
  executeQuery(res, query, null, 0)
})

//Read FP
app.get("/api/dosen/", function(req, res)
{
    var query = "select * from Dosen"
    executeQuery(res, query, null, 0)
})

app.get("/api/abmas/", function(req, res)
{
    var query = "select * from abmas"
    executeQuery(res, query, null, 0)
})

app.get("/api/publikasi/", function(req, res)
{
    var query = "select * from publikasi"
    executeQuery(res, query, null, 0)
})

app.get("/api/penelitian/", function(req, res)
{
    var query = "select * from penelitian"
    executeQuery(res, query, null, 0)
})

app.listen(port, hostname, function () {
  var message = "Server JALAN BOSS : " + port;
  console.log(message);
});