/**
 * Scrip para inserir dados de um CSV no mongoDB.
 */
// -------

// Path e nome do arquivo de entrada.
var file = "./list_libraries_and_javadoc.csv";

// Dados para conexão com o MongoDB
var dbUrl = 'mongodb://127.0.0.1:27017/APIs-BreakingChange-pesquisa-piloto-2';
var db = null;

//Dados da coleção onde os dados serão inseridos.
var nameCollection = "bibliotecas_com_javadoc";
var collection = null;

//Bibliotecas para acessar banco de dados e ler o arquivo de entrada.
var lineReader = require('line-reader');
var MongoClient = require('mongodb').MongoClient;

//Número de colunas no CSV.
var numberCols = 33;

//Separador dos dados no CSV.
var separador = ";"; 

//Insere os dados na coleção.
var insertRegistry = function(registry, last){
	collection.insert([registry], function (err, result) {
		if (err) {
			console.log("ERROR: " + err);
		} 
		//else {
			//console.log(registry.category);
		//}
		if(last){ // Se último registro, encerra a conexão.  	
			console.log("\nSuccessfully insert data! \n");
			//db.close();
		}
	});
}

var parserFile = function(){

	var i = 0;
	//last == true se fim do arquivo.
	lineReader.eachLine(file, function(line, last) {
	    
		//Quebra a linha pelo separador
		var data = line.split(separador);

		if(data.length >= 4){

			var registry = new Object();

			registry.idGitHub = data[1];

			//TODO: adicionar propriedades conforme a necessidade.

			insertRegistry(registry,last);
		}
		else{
			console.log("ERROR: Data invalid! " + i + ": [" + line + "]");
		}
		i++;
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
