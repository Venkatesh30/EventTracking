var notification = require("../models/notification");
var isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect("/login");
    }
}
module.exports = function(app, passport) {
    app.get("/event/list",isLoggedIn,async function(req,res){
        var data = await notification.list(req);
        res.send(data);
    });
    app.post("/notification/api/schedule",isLoggedIn,async function(req,res){
        var data = notification.create(req);
        res.send(data);
    });
}
