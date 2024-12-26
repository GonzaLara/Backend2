export const isLoggedIn = (req, res, next) => {
    if(req.session.user){
        next(); //Permitir el acceso si hay sesion
    } else {
        res.redirect('/login'); //Redirije al login si no hay sesion
    }
}

export const isLoggedOut = (req, res, next) => {
    if(req.session.user){
        res.redirect('/index'); //Redirige al index si ya estoy logueado
    } else {
        next(); //Permitir el acceso si no hay sesion
    }
}