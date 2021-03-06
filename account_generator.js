#!/usr/local/bin/node

//web3 address:port
var Web3 = require('web3');
var web3 = new Web3('http://loaclhost:8381');//default port 8545, my port 8381
//account generator
function Adrsgenerator(x) {
	if (x <= 0){
		console.log("invalid input");
		return;
	}
	else{
		//var batch = new web3.BatchRequest();
		var accounts = new Array();
		for(var i = 0; i < x; ++i){
			var new_account = web3.eth.accounts.create();
			var address = new_account.address;
                        var privateKey = new_account.privateKey;
			accounts[address] = privateKey;
                        //console.log(address + ' ' + privateKey + '\n');
		}
		console.log(accounts.length);
		
		//console.log(address + ' ' + privateKey + '\n');
		return accounts;
	}
};

var insertDocument = function(db, array, callback){
    db.collection('account').insertOne(array, 
	function(err, result){
            assert.equal(err, null);
	    console.log('Inserted');
	    callback();
        });
};

//mongodb connection
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//connection url
var url = 'mongodb://127.0.0.1:27017/AccountDB';

var num = 100;
var account_file = Adrsgenerator(num);
//console.log(account_file.length);

MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    var db = db.db('AccountDB');
    var collections = db.collection('account');
    insertDocument(db, account_file, function(){
        db.close();
    });
});
