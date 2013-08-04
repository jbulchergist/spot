"use strict";
var fs = require('fs'),
		path = require('path');

var projectRoot = process.env.PWD;

var _registeredTypes = {
	unregistered: {
		rootDir:   projectRoot,
		encoding:  'utf8',
		cb:        function(err, data){},
		processCB: function(err, data, cb){ cb(err, data); }
	}
}

var Spot = (function(){

	var spot = function (conf) {
	}

	// resorce(resID, path, encoding)
	spot.prototype.train = function(fileType, dir, encoding, cb, processCB) {
		var fullPath = path.normalize(projectRoot + '/' + dir);

		_registeredTypes[fileType] = {
			'rootDir':   fullPath  || _registeredTypes.unregistered.rootDir,
			'encoding':  encoding  || _registeredTypes.unregistered.encoding,
			'cb':        cb        || _registeredTypes.unregistered.cb,
			'processCB': processCB || _registeredTypes.unregistered.processCB
		};
	};

	// resource(resID, file, preCacheOp)
	// returns this for chaining
	// spot.prototype.fetch = function(resource, cb) {
	spot.prototype.fetch = function(registeredTypeOrEncoding, file, cb) {
		var typeConf = _registeredTypes[registeredTypeOrEncoding] || _registeredTypes.unregistered;
		var file = typeConf.rootDir + '/' + file;

		var chew = function(err, data) {
			if (err) {
				cb(err);
			}

			if (typeof cb !== 'function') {
				cb = typeConf.cb;
			}

			// The process CB gives the calling function the option to modify the returned value. 
			// Useful for processing CSS and the like, if you choose to go that route.
			typeConf.processCB(err, data, cb);
	  };

	  fs.readFile(file, typeConf.encoding, chew);
	};

	return spot;
})();

module.exports = new Spot();