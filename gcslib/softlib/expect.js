/* Copyright (c) 2022 Read Write Tools. Legal use subject to MIT License. */
import terminal from'./terminal.js';export default function expect(t,e,r){if(r=r||'',void 0===e)return terminal.logic('\'type\' should be a String or an Array of Strings, but is undefined'),!1;if(null===e)return terminal.logic('\'type\' should be a String or an Array of Strings, but is null'),!1;if('String'==e.constructor.name){if(1==expectOne(t,e))return!0}else{if('Array'!=e.constructor.name)return terminal.logic('\'type\' should be a String or an Array of Strings'),!1;for(let r of e)if(1==expectOne(t,r))return!0}var n='';return n='String'==e.constructor.name?`Expected type '${e}'`:'Expected one of these types \''+e.join('|')+'\'',void 0===t?terminal.expect(`${n}, but got 'undefined' ${r}`):null===t?terminal.expect(`${n}, but got 'null' ${r}`):void 0===t.__proto__?terminal.expect(`${n}, but got 'no prototype' ${r}`):terminal.expect(`${n}, but got '${t.constructor.name}' ${r}`),!1}function expectOne(t,e){return void 0===t?'undefined'==e:null===t?'null'==e:void 0===t.__proto__?'no prototype'==e:t.constructor.name==e}