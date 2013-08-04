"use strict";

var vows   = require('vows'),
		assert = require('assert');

var suite = vows.describe('Fetch a file.'),
		spot = require('../lib/spot');

suite.addBatch({
	'Fetch a text file from the root (untrained)': {
		'topic': function() {
			spot.fetch('utf8', 'README.md', this.callback);
		},
		'access file': function(err, data) {
			assert.isNull(err);
		},
		'encoded file': function(err, data) {
			assert.isString(data);
		}
	},
	'Fetch a text file from a path relative to root (untrained)': {
		topic: function() {
			spot.fetch('utf8', 'lib/spot.js', this.callback);
		},
		'access file': function(err, data) {
			assert.isNull(err);
		},
		'encoded file': function(err, data) {
			assert.isString(data);
		}
	}
});

suite.addBatch({
	'Fetch a text file from the root (with training)': {
		topic: function() {
			spot.train('test', 'node_modules/vows', 'utf8', this.callback);
			spot.fetch('test', 'README.md');
		},
		'access file': function(err, data) {
			assert.isNull(err);
		},
		'encoded file': function(err, data) {
			assert.isString(data);
		}
	},
	'Fetch a text file from a path relative to root (with training)': {
		topic: function() {
			spot.train('test', 'node_modules/', 'utf8', this.callback);
			spot.fetch('test', 'vows/README.md');
		},
		'access file': function(err, data) {
			assert.isNull(err);
		},
		'encoded file': function(err, data) {
			assert.isString(data);
		}
	}
});

suite.addBatch({
	'Process a file before returning': {
		topic: function() {
			var processCB = function(err, data, cb) {
				cb(err, 'overwritten');
			}
			spot.train('test', 'node_modules/vows', 'utf8', this.callback, processCB);
			spot.fetch('test', 'README.md');
		},
		'processed file': function(err, data) {
			assert.equal(data, 'overwritten');
		}
	},
});

suite.addBatch({
	'Process a file using a custom cb': {
		topic: function() {
			spot.train('test', 'node_modules/vows', 'utf8');
			spot.fetch('test', 'README.md', this.callback);
		},
		'processed file': function(err, data) {
			assert.isString(data);
		}
	},
});



suite.export(module);