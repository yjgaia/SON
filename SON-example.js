require('uppercase-core');

INIT_OBJECTS();

require('./SON.js');

let sonCode = READ_FILE({
	path : 'example.son',
	isSync : true
}).toString();

let json = SON(sonCode);

console.log(json);
