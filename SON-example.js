require('./import/UJS-NODE.js');
require('./SON.js');

var json = SON(READ_FILE({
	path : 'example.son',
	isSync : true
}).toString());

console.log(json);
