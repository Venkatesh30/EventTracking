// app/routes.js
let notificationRoutes = require("./routes/notification_route");
let groups = require("./modules/groups");

module.exports = function(app, passport) {
    notificationRoutes(app,passport);
    
    // route for home page
    app.get('/', function(req, res) {
        if(req.isAuthenticated()){
            res.render('index.ejs');
        }
        else{
            res.redirect("/login");
        }
         // load the index.ejs file
    });
    app.get('/login',function(req,res){
        res.render('login.ejs');
    })
    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/'
        })
    );

    app.get('/allUsers',isLoggedIn,async function(req,res){
        console.log(req.user);
        //res.send("success");
        let data = await groups.getAllUsers();
        res.render('allUsers.ejs', {
            data:data
        });
    })

    app.get('/myGroups',isLoggedIn,async function(req,res){
        //console.log(req.user);
        //res.send("success");
        let data = await groups.getMyGroups(req.user);
        res.render('myGroups.ejs', {
            data:data
        });
    })

    app.get('/createGroup',isLoggedIn,async function(req,res){
        //console.log(req.user);
        //res.send("success");
        let userData = await groups.getAllUsers();
        res.render('createGroup.ejs', {
            userData,
            user:req.user
        });
    })

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
