var express=require("express");
var path=require("path");
var cors=require("cors");
var rutasUsuarios=require("./rutas/usuariosRutas");
var rutasProductos=require("./rutas/productosBocaRutas");
const session = require('cookie-session');
const usuariosRutasApis = require("./rutas/usuariosRutasApis");
const productosRutasApis = require("./rutas/productosBocaRutasApis");
const passport = require("passport");

var app=express();

 app.use(session({
    secret:'secreto',
    resave:true,
    name: 'session',
    keys: ['r9203jfj'],
    maxAge: 24 * 60 * 60 * 1000, 
    saveUninitialized:true
  }));
  
 app.use(passport.initialize());
 app.use(passport.session());
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",rutasUsuarios);
app.use("/",rutasProductos);

app.use("/apis", usuariosRutasApis);
app.use("/apis", productosRutasApis);


app.use(express.static("images"));


var port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("JALANDO AL 100% -> http://localhost:"+port);
});
