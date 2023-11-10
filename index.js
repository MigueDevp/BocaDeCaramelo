var express=require("express");
var path=require("path");
var cors=require("cors");

var rutasUsuarios=require("./rutas/usuariosRutas");
var rutasProductos=require("./rutas/productosBocaRutas");

var app=express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",rutasUsuarios);
app.use("/",rutasProductos);

var port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Si jala el servidor dale click -> http://localhost:"+port);
});
