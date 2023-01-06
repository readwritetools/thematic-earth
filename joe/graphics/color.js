/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import expect from'../dev/expect.js';import aver from'../dev/aver.js';export function rgb2Decimal(e){if(-1!=e.indexOf('#'))return rgbHex2rgbDecimal(e);if(-1!=e.indexOf('rgb'))return rgbFunc2rgbDecimal(e);return{red:0,green:0,blue:0,alpha:1}}export function rgbHex2rgbAlpha(e){expect(e,'String');var r='ffffff',t='ff';if('#'!=e.charAt(0))return{rrggbb:r,alpha:t};var a=e.substr(1);switch(a.length){case 3:var n=a.charAt(0).toLowerCase(),u=a.charAt(1).toLowerCase(),c=a.charAt(2).toLowerCase();r=`${n}${n}${u}${u}${c}${c}`,t='ff';break;case 6:r=a.substr(0,6).toLowerCase(),t='ff';break;case 8:r=a.substr(0,6).toLowerCase(),t=a.substr(6,2).toLowerCase()}return{rrggbb:r,alpha:t}}export function rgbHex2rgbDecimal(e){expect(e,'String');var r=0,t=0,a=0,n=1;if('#'!=e.charAt(0))return{red:r,green:t,blue:a,alpha:n};var u=e.substr(1);switch(u.length){case 3:r=hex2decimal(u.charAt(0)),r+=16*r,t=hex2decimal(u.charAt(1)),t+=16*t,a=hex2decimal(u.charAt(2)),a+=16*a;break;case 6:r=hex2decimal(u.substr(0,2)),t=hex2decimal(u.substr(2,2)),a=hex2decimal(u.substr(4,2));break;case 8:r=hex2decimal(u.substr(0,2)),t=hex2decimal(u.substr(2,2)),a=hex2decimal(u.substr(4,2)),n=hex2percent(u.substr(6,2))}return aver(r>=0&&r<=255),aver(t>=0&&t<=255),aver(a>=0&&a<=255),aver(n>=0&&n<=1),{red:r,green:t,blue:a,alpha:n}}export function rgbFunc2rgbDecimal(e){expect(e,'String');var r=0,t=0,a=0,n=1;if('rgb('==e.substr(0,4)){let n=e.match(/^rgb\(([^)]+)\)/);if(2==n.length){let e=n[1].split(',');3==e.length&&(r=Number(e[0]),t=Number(e[1]),a=Number(e[2]))}}else if('rgba('==e.substr(0,5)){let u=e.match(/^rgba\(([^)]+)\)/);if(2==u.length){let e=u[1].split(',');4==e.length&&(r=Number(e[0]),t=Number(e[1]),a=Number(e[2]),n=Number(e[3]))}}return aver(r>=0&&r<=255),aver(t>=0&&t<=255),aver(a>=0&&a<=255),aver(n>=0&&n<=1),{red:r,green:t,blue:a,alpha:n}}export function rgbaDecimal2rbgaHex(e,r,t,a){return`#${decimal2hex(e)}${decimal2hex(r)}${decimal2hex(t)}${decimal2hex(Math.floor(255*a))}`}export function rgbDecimal2hsv(e,r,t){let a,n,u,c,i;expect(e,'Number'),expect(r,'Number'),expect(t,'Number'),aver(e>=0&&e<=255),aver(r>=0&&r<=255),aver(t>=0&&t<=255);const s=e/255,o=r/255,b=t/255,l=Math.max(s,o,b),h=l-Math.min(s,o,b),diffc=function(e){return(l-e)/6/h+.5};return 0===h?(c=0,i=0):(i=h/l,a=diffc(s),n=diffc(o),u=diffc(b),s===l?c=u-n:o===l?c=1/3+a-u:b===l&&(c=2/3+n-a),c<0?c+=1:c>1&&(c-=1)),{hue:Math.round(360*c),saturation:Math.round(100*i),brightness:Math.round(100*l)}}export function hsv2rgbDecimal(e,r,t){aver(e>=0&&e<=360),aver(r>=0&&r<=100),aver(t>=0&&t<=100);const a=e/60,n=r/100;let u=t/100;const c=Math.floor(a)%6,i=a-Math.floor(a),s=Math.round(255*u*(1-n)),o=Math.round(255*u*(1-n*i)),b=Math.round(255*u*(1-n*(1-i)));switch(u=Math.round(255*u),aver(u>=0&&u<=255),aver(b>=0&&b<=255),aver(s>=0&&s<=255),aver(o>=0&&o<=255),c){case 0:return{red:u,green:b,blue:s};case 1:return{red:o,green:u,blue:s};case 2:return{red:s,green:u,blue:b};case 3:return{red:s,green:o,blue:u};case 4:return{red:b,green:s,blue:u};case 5:return{red:u,green:s,blue:o}}}export function hex2decimal(e){expect(e,'String');var r=parseInt(e,16);return Number.isNaN(r)&&(r=0),aver(r>=0),aver(r<=255),r}export function hex2percent(e){expect(e,'String');var r=parseInt(e,16);Number.isNaN(r)&&(r=0);var t=r/255;return aver(t>=0),aver(t<=1),t}export function decimal2hex(e){return expect(e,['Number','String']),'String'==e.constructor.name&&(e=Number(e)),aver(e>=0),aver(e<=255),e.toString(16).padStart(2,'0').toLowerCase()}export function rgbaHexFromCSS(e){if(expect(e,'String'),'rgb('==e.substr(0,4)){let r=e.match(/^rgb\(([^)]+)\)/);if(2==r.length){let e=r[1].split(',');if(3==e.length){return`#${decimal2hex(e[0])}${decimal2hex(e[1])}${decimal2hex(e[2])}`}}}if('rgba('==e.substr(0,5)){let r=e.match(/^rgba\(([^)]+)\)/);if(2==r.length){let e=r[1].split(',');if(4==e.length){return`#${decimal2hex(e[0])}${decimal2hex(e[1])}${decimal2hex(e[2])}${Math.round(255*Number(e[3].trim()),0).toString(16).padStart(2,'0').toLowerCase()}`}}}return e}export function scaleSaturationBrightness(e,r){if(expect(e,['Number','String']),expect(r,'Number'),'String'==e.constructor.name&&(e=e.indexOf('%')==e.length-1?Number(e.substr(0,e.length-1)):'auto'==e?r>50?20:r<50?180:100:Number(e)),e=Math.max(0,e),'Number'==(e=Math.min(200,e)).constructor.name){if(e<100){return r-r*(e/100)}if(e>100){return r+(100-r)*((e-100)/100)}}return r}export function scaleTransparency(e,r){if(expect(e,['Number','String']),expect(r,'Number'),'String'==e.constructor.name&&(e=e.indexOf('%')==e.length-1?Number(e.substr(0,e.length-1)):'auto'==e?r>-.5?20:r<.5?180:100:Number(e)),'Number'==e.constructor.name){if(e<100){return r-r*(e/100)}if(e>100){return r+(1-r)*((e-100)/100)}}return r}export function computeColorPlusTransparency(e,r){return expect(e,'String'),expect(r,'Number'),r<0&&(r=0),r>1&&(r=1),9==e.length?e:('#'==e[0]&&(e=e.substr(1)),3==e.length&&(e=`${e[0]}${e[0]}${e[1]}${e[1]}${e[2]}${e[2]}`),`#${e}${Math.floor(255*r).toString(16).padStart(2,'0').toLowerCase()}`)}