let express = require('express');
let app = express();
var passport = require('passport');
var flash    = require('connect-flash');
var fs = require("fs");

var options = {
	key: fs.readFileSync('privateKey.key'),
	cert: fs.readFileSync('certificate.crt')
};

//const authorization = require("./config/auth");
require('./config/passport')(passport); // pass passport for configuration

let dbConnection = require("./dbConnection");

//app.set('view engine', 'ejs');
app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms
	app.use("/Images", express.static(__dirname + "/Images"));
	app.use("/static", express.static(__dirname + "/views/static"));

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

require('./app/routes.js')(app, passport);
/* app.use("/auth",authorization);

app.get("/runTest",function(req,res){
    res.send({success:true});
})

app.get("/",function(req,res){
	res.render("index");
})

app.get("/runQuery",function(req,res){
	let query = req.query.qryStr || null;
	if(query){
		dbConnection.query(query)
		.then(function(data){
			res.send({
				success:true,
				data
			})
		})
		.catch(function(error){
			res.send({
				success:false,
				msg:error
			})
		})
	}
	else{
		res.send({
			success:false,
			msg:"Empty Query String"
		})
	}
}) */

var server = app.listen(3010, function () {
	console.log('app listening on port 3010!');  
});

var https = require('https');
https.createServer(options, app).listen(8000);