# son
JSON으로 변환되는 간단한 표현식

## 실행 방법
```javascript
require('./import/UJS-NODE.js');
require('./son.js');

var json = son(READ_FILE({
	path : 'example.son',
	isSync : true
}).toString());

console.log(json);
```

## 예
`son`
```son
glossary
	title 'example glossary'
	GlossDiv
		title 'S'
		GlossList
			GlossEntry
				ID			'SGML'
				SortAs		'SGML'
				GlossTerm	'Standard Generalized Markup Language'
				Acronym		'SGML'
				Abbrev		'ISO 8879:1986'
				GlossDef
					para			'A meta-markup language, used to create markup languages such as DocBook.'
					GlossSeeAlso	['GML', 'XML']
				GlossSee	'markup'
```

`json`
```json
{
	"glossary": {
		"title": "example glossary",
		"GlossDiv": {
			"title": "S",
			"GlossList": {
				"GlossEntry": {
					"ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
						"para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
					},
					"GlossSee": "markup"
				}
			}
		}
	}
}
```

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)