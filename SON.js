/**
 * JSON으로 변환되는 간단한 데이터 표현식
 */
global.SON = METHOD(() => {
	
	let parseValue = (valueContent, tabCount) => {
		
		// string
		if (valueContent[0] === '\'') {
			
			return '"' + RUN(() => {
				
				let ret = '';
				let nowTabCount = 0;
				
				valueContent = valueContent.substring(1, valueContent.length - 1).trim();
				
				EACH(valueContent, (ch, i) => {
					
					if (nowTabCount !== -1) {
						if (ch === '\t') {
							nowTabCount += 1;
							if (nowTabCount === tabCount + 1) {
								nowTabCount = -1;
							}
						} else {
							nowTabCount = -1;
						}
					}
					
					if (nowTabCount === -1) {
						
						if (ch === '\r' || (ch === '\\' && valueContent[i + 1] === '\'')) {
							// ignore.
						} else if (ch === '"') {
							ret += '\\"';
						} else if (ch === '\n') {
							ret += '\\n';
							nowTabCount = 0;
						} else {
							ret += ch;
						}
					}
				});
				
				return ret;
				
			}) + '"';
		}
		
		// array
		else if (valueContent[0] === '[') {
			
			return '[' + RUN(() => {
				
				let content = valueContent.substring(1, valueContent.length - 1).trim();
				let lastIndex = 0;
				let isStringMode;
				let arrayLevel = 0;
				let v = '';
				let ret = '';
				
				EACH(content, (ch, i) => {
					
					if (isStringMode !== true && ch === '[') {
						arrayLevel += 1;
					}
					
					else if (isStringMode !== true && ch === ']') {
						arrayLevel -= 1;
					}
					
					else if (ch === '\'' && content[i - 1] !== '\\') {
						if (isStringMode === true) {
							isStringMode = false;
						} else {
							isStringMode = true;
						}
					}
					
					else if (isStringMode !== true && arrayLevel === 0 && ch === ',') {
						
						v = parseValue(content.substring(lastIndex, i).trim(), tabCount);
						
						if (v !== '') {
							ret += v + ', ';
						}
						
						lastIndex = i + 1;
					}
				});
				
				if (isStringMode === true) {
					SHOW_ERROR('SON', 'parse error.');
				}
				
				else if (arrayLevel !== 0) {
					SHOW_ERROR('SON', 'parse error.');
				}
				
				else {
					ret += parseValue(content.substring(lastIndex).trim(), tabCount);
				}
				
				return ret;
				
			}) + ']';
		}
		
		// boolean, number
		else if (valueContent === 'true' || valueContent === 'false' || isNaN(valueContent) !== true) {
			return valueContent;
		}
		
		else {
			
			REPEAT(tabCount, () => {
				valueContent = '\t' + valueContent;
			});
			
			return parse(valueContent, tabCount);
		}
	}
	
	let parse = (content, tabCount) => {
		
		let json = '';
		
		let subContent = '';
		let lastIndex = 0;
		
		let isStringMode;
		let arrayLevel = 0;
		
		let parseLine = (line) => {
			
			let nowTabCount = 0;
			EACH(line, (ch) => {
				if (ch === '\t') {
					nowTabCount += 1;
				} else {
					return false;
				}
			});
			
			if (line.trim() !== '') {
				
				// 탭 수가 같으면 여기까지의 내용을 해석
				if (nowTabCount === tabCount) {
					
					let valueContent;
					
					if (subContent !== '') {
						json += parse(subContent, tabCount + 1) + ',\n';
						subContent = '';
					}
					
					REPEAT(tabCount + 1, () => {
						json += '\t';
					});
					
					line = line.trim();
					
					// find name.
					json += '"';
					EACH(line, (ch, i) => {
						if (ch === ' ' || ch === '\t') {
							valueContent = line.substring(i).trim();
							return false;
						}
						json += ch;
					});
					json += '": ';
					
					// parse value content.
					if (valueContent !== undefined) {
						json += parseValue(valueContent, tabCount + 1) + ',\n';
					}
				}
				
				else {
					subContent += line + '\n';
				}
			}
		};
		
		EACH(content, (ch, i) => {
			
			// 배열
			if (isStringMode !== true && ch === '[') {
				arrayLevel += 1;
			} else if (isStringMode !== true && ch === ']') {
				arrayLevel -= 1;
			}
			
			// 문자열
			else if (ch === '\'' && content[i - 1] !== '\\') {
				if (isStringMode === true) {
					isStringMode = false;
				} else {
					isStringMode = true;
				}
			}
			
			// 배열도 문자열도 아닌 경우 한 줄 해석
			else if (isStringMode !== true && arrayLevel === 0 && ch === '\n') {
				parseLine(content.substring(lastIndex, i));
				lastIndex = i + 1;
			}
		});
		
		// 아직 문자열 모드인 경우
		if (isStringMode === true) {
			SHOW_ERROR('SON', 'parse error.');
		}
		
		// 아직 배열 모드인 경우
		else if (arrayLevel !== 0) {
			SHOW_ERROR('SON', 'parse error.');
		}
		
		// 아직 남아있는 내용이 있는 경우
		else {
			parseLine(content.substring(lastIndex));
		}
		
		if (subContent !== '') {
			json += parse(subContent, tabCount + 1) + '\n';
		} else {
			json = json.substring(0, json.length - 2) + '\n';
		}
		
		REPEAT(tabCount, () => {
			json += '\t';
		});
		
		return '{\n' + json + '}';
	};
	
	return {
		
		run : (content) => {
			//REQUIRED: content
			
			return parse(content, 0);
		}
	};
});
