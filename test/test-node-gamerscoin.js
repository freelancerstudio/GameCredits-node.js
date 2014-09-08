var fs = require('fs'),
	events = require('events');

var config = {
    rpchost: "127.0.0.1",
    rpcport: 50001,
    rpcuser: "testnet_user",
    rpcpassword: "testnet_pass"
};
ca = fs.readFileSync('./test/test.crt')
options = {
      host: config.rpchost,
      port: config.rpcport,
      user: config.rpcuser,
      pass: config.rpcpassword,
      passphrasecallback: function () { return "passphrasecallback";},
      https: true,
      ca: ca
    };
var gamerscoin = require('../lib/gamerscoin')(options);

exports.get = function (test) {
	var options_keys = Object.keys(options);

	var num_propt = Object.keys(options_keys).length;
	test.expect(num_propt);
	

	if( options.length < config.length ){
		throw new Error('not all config options being used');
		test.done();
	}

	var idx = 0;
	for(var propt in options){
		test.deepEqual(gamerscoin.get(''+options_keys[idx]), options[''+propt]);
		idx ++;
	}
	
	test.done();
}
exports.set = function (test) {

	var new_options = {
      host: '127.0.0.1',
      port: 50001,
      user: 'new_1337_^*)()',
      pass: '*&@#cra$%zy@',
      passphrasecallback: function () { return 1+1;},
      https: false,
      ca: 'nothing here'
    };
	var options_keys = Object.keys(new_options);

	var num_propt = Object.keys(new_options).length;
	test.expect(num_propt);

	if( new_options.length < config.length ){
		throw new Error('not all config options being used');
		test.done();
	}

	var idx = 0;
	for(var propt in new_options){
		gamerscoin.set(''+options_keys[idx], new_options[ ''+options_keys[idx] ]);
		test.deepEqual(gamerscoin.get(''+options_keys[idx]), new_options[''+propt]);
		idx ++;
	}
	test.done();
}


// NOTE:
// 			All the code below has beencommented out as
// 			not sure if account name is the same as the user name or not

/*
/* BEFORE RUNNING read below:
 * Either run gamerscoind directly or run gamerscoin-qt with the -server
 * command line option. Make sure you have a ~/.gamerscoin/gamerscoin.conf
 * with rpcuser and rpcpassword config values filled out. Note that
 * newer versions of gamerscoin (1.5 and above) don't allow identical
 * your rpc username and password to be identical.
 *
 */
/*
exports.commands_noAuth = {		
	//NOTE: Before running the getBalance test add some testgamers to your wallet here: http://testgamers.lionservers.de/
	// 			or add "gen=1" to the bottom of your gamerscoin.conf file
	getBalance: function(test){
		var curr_balance;
		gamerscoin.getBalance(function(err, balance) {
			test.ifError(err);
		  if (err) {
		    console.error('Failed to fetch balance', err.message);
		  }else {
		  	console.log('Gamerscoin balance is', balance);
			}
		  test.done();
		});
	},
	getBalance: function(test){

	},

	getGenerate: function(test){
		test.expect(2);
		gamerscoin.setGenerate(true,1);	
		test.equal(gamerscoin.getGenerate(), true);

		gamerscoin.setGenerate(false,1);	
		test.equal(gamerscoin.getGenerate(), false);
		test.done();
	},
	getreceived_: function(test){
		var amount= 0.0001;
		//gamerscoin.setAccount()
		sendfrom("testnet_user", gamerscoin.getaccountaddress('testnet_user'),amount, function(err,addr){
			test.equal(getreceivedbyaccount('testnet_user', amount);
			test.equal( getreceivedbyaddress( gamerscoin.getaccountaddress('testnet_user') ), amount);
			test.done();

		});



	}

	
}

//all api commands that need .auth()
exports.commands_Auth = {		
	
	setUp: function () {
		gamerscoin.auth('testnet_user', 'testnet_pass');
	}

	
}
*/