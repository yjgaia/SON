# SON
JSON으로 변환되는 간단한 데이터 표현식

## 실행 방법
```javascript
require('./import/UJS-NODE.js');
require('./SON.js');

var json = SON(READ_FILE({
	path : 'example.son',
	isSync : true
}).toString());

console.log(json);
```

## 예
`SON`
```son
name		'YJ Sim'
age			29
is_human	true
contact		[
	'hanul@hanul.me',
	'admin@btncafe.com',
	emergency
		phone	010-1234-5678
		fax		010-8765-4321
]
address
	country	'Korea'
	city	'Seoul'
description '
	Hi, I\'m YJ Sim.
	I am a developer.
	Bye.
'
```

`JSON`
```json
{
    "name": "YJ Sim",
    "age": 29,
    "is_human": true,
    "contact": ["hanul@hanul.me", "admin@btncafe.com", {
        "emergency": {
            "phone": {
                "010-1234-5678"
            },
            "fax": {
                "010-8765-4321"
            }
        }
    }],
    "address": {
        "country": "Korea",
        "city": "Seoul"
    },
    "description": "Hi, I'm YJ Sim.\nI am a developer.\nBye."
}
```

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)