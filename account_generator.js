#!/usr/local/bin/node

//web3 address:port
var Web3 = require('web3');
var web3 = new Web3('http://loaclhost:8383');//default port 8545, my port 8381
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
		}
		return accounts;
	}
};

//mongodb connection
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//connection url
var url = 'mongodb://loaclhost:27017/AccountDB';

var num = 100;

MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log("Connect to db server successfully");
	var dbase = db.db("AccountDB");
	dbase.createCollection('account', function(err, res){
		if(err) throw err;
		console.log("collection created");
	});
	var account_file = Adrsgenerator(num);
	dbase.collection('AccountDB').insertMany(account_file, function(err, res){
        if (err) throw err;
        console.log("inserted files count: " + res.insertedCount);		
	});
	db.close();
});