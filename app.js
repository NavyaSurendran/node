
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

//load customers route
var customers = require('./routes/customers'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


app.use(
	    
	    connection(mysql,{
	        
	        host: 'localhost',
	        user: 'root',
	        password : 'root',
	        port : 3306, //port mysql
	        database:'nodejs'

	    },'pool') //or single

	);



	app.get('/', routes.index);
	app.get('/customers', customers.list);
	app.get('/customers/add', customers.add);
	app.post('/customers/add', customers.save);
	app.get('/customers/delete/:id', customers.delete_customer);
	app.get('/customers/edit/:id', customers.edit);
	app.post('/customers/edit/:id',customers.save_edit);


	app.use(app.router);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
