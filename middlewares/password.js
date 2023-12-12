var crypto= require("crypto");

function generarPassword(password){
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.scryptSync(password,salt, 100000,64,'sha512').toString('hex');

    return{
        salt,
        hash
    }
}

/*function validarPassword(password,salt,hash){
    var hashNuevo = crypto.scryptSync(password,salt, 100000,64,'sha512').toString('hex');

    return hashNuevo === hash;
}*/
function validarPassword(password, hash, salt){
    var hashValidar=crypto.scryptSync(password,salt,100000, 64, 'sha512').toString("hex");
    return hashValidar===hash
}

var {salt,hash}=generarPassword("Hola");

function autorizado(req,res,siguiente){
    console.log("autorizando...");
    if(req.session.usuario || req.session.admin){
        console.log("usuario autorizado");
    siguiente();
}else{
    res.redirect("/login");
}
}

function admin(req,res,siguiente){
    console.log("Administrador Autorizado");
    if(req.session.admin){
        siguiente();
    }else{
        if(req.session.usuario){
            res.redirect("/");
        }else{
            res.redirect("/login");
        }
    }
}


module.exports={
generarPassword,
validarPassword,
autorizado,
admin
}