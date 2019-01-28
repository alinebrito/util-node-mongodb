/**
 * Script to insert a CSV file on MongoDB.
 */

var file = "./input/repository_dependencies-1.2.0-2018-03-12.csv";
var nameDatabase = 'librariesio';
var nameCollection = "repository_dependencies";
var separador = ","; 

var collection = null;
var db = null;
var dbUrl = 'mongodb://127.0.0.1:27017/' + nameDatabase;
var lineReader = require('line-reader');
var MongoClient = require('mongodb').MongoClient;


var insertRegistry = function(registry, last){
	collection.insert([registry], function (err, result) {
		if (err) {
			console.log("ERROR: " + err);
		} 
		if(last){ 
			console.log("\nSuccessfully insert data! \n");
			//db.close();
		}
	});
}

var parserFile = function(){

	//last == end file
	lineReader.eachLine(file, function(line, last) {
	    
		var data = line.split(separador);
		var registry = new Object();

		// registry.ID =  data[0];

		if(registry.ManifestPlatform == "maven"){
			console.log(registry);
			insertRegistry(registry,last);

		}

		
	});
}

var initParser = function(){
	console.log("\nStarted process...");
	MongoClient.connect(dbUrl, function(err, dbMongo) {
		  if(err) {
		  	console.log("\nError connecting in " + dbUrl);
		  }
		  else{
		  		db = dbMongo;
			  	collection = dbMongo.collection(nameCollection);
			  	console.log("\nConnected to " + dbUrl);
			  	console.log("\nReading file " + file + "...\n");
			  	parserFile();
		  }

	});
}

initParser();
