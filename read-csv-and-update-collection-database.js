/**
 * Scrip para atualizar dados de um CSV no mongoDB.
 */
// -------

// Path e nome do arquivo de entrada.
var file = "./pendendesLibrary.txt";

// Dados para conexão com o MongoDB
var dbUrl = 'mongodb://127.0.0.1:27017/APIDiff';
var db = null;

//Dados da coleção onde os dados serão inseridos.
var nameCollection = "top-2000-libraries-dados-brutos-sem-deprecated-analisadas";
var collection = null;

//Bibliotecas para acessar banco de dados e ler o arquivo de entrada.
var lineReader = require('line-reader');
var MongoClient = require('mongodb').MongoClient;

//Separador dos dados no CSV.
var separador = ","; 

//Insere os dados na coleção.
var updateRegistry = function(data, last){

	var criteria = new Object();
	criteria.full_name = data;

	var parameterUpdate = new Object();
	parameterUpdate.isLibrary = -1;

	collection.update(criteria, {$set: parameterUpdate}, function (err, result) {
		if (err) {
			console.log("ERROR: " + err);
		} 
		else {
			console.log(criteria);
			console.log(result.result);
		}
		if(last){ // Se último registro, encerra a conexão.  	
			console.log("\nSuccessfully update data! \n");
			//db.close();
		}
	});
}

var parserFile = function(){

	//last == true se fim do arquivo.
	lineReader.eachLine(file, function(line, last) {
		console.log(line);
		updateRegistry(line,last);
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
