![spot](https://raw.github.com/jbulchergist/spot/master/spot.png)

spot
====

A simple file retriever capable of preprocessing

# Features
- Request files with a path relative to your project root, or from a pre-configured path
- Set up file types beforehand, with pre-defined options including:
 - a root path
 - encoding
 - pre-processor callback
 - callback

# Usage

## Unconfigured

```js
spot.fetch('utf8', 'assets/css/main.css', function(err, data){
	// do something useful
});
```

## Configure / add a preprocessor

```js
var spot = require('spot');

var preprocessor = function(err, data, cb) {
	data.replace('dog', 'spot');
	cb(err, data);
}
var cb = function(err, data) {
	// do something useful
}
var cb2 = function(err, data) {
	// do something else useful
}

spot.train('css', 'assets/css', 'utf8', cb, preprocessor);

spot.fetch('css', 'main.css');
// you can override the callback
spot.fetch('css', 'main.css', cb2);
```