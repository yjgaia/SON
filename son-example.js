require('./import/UJS-NODE.js');
require('./son.js');

var json = son(READ_FILE({
	path : 'example.son',
	isSync : true
}).toString());

console.log(json);
