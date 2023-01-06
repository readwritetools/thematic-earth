/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import expect from'../dev/expect.js';const degreesToRadians=Math.PI/180;export function draw(a,e,n,r){if(expect(a,'CanvasRenderingContext2D'),expect(e,'String'),expect(n,'CanvasParams'),expect(r,['ProjectedPoint','LegendFeaturePoint','PatternPoint']),!n.isVisible())return!1;var o=n.scaleSymbolsCoefficient(),s=!1,t=n.safeNumberOrNone(`${e}symbol-stroke-width`);'none'!=t&&0!=t&&(a.lineWidth=Number(t)*o,'none'!=(g=n.safeColorOrNone(`${e}symbol-stroke-color`))&&(a.strokeStyle=g,s=!0));var i=!1;'none'!=(y=n.safeColorOrNone(`${e}symbol-fill-color`))&&(a.fillStyle=y,i=!0);var l=n.safeString(`${e}symbol-type`),c='circle'==l,d=['polygon','triangle','rhombus','pentagon','hexagon'].includes(l),v=['star','diamond','trigram','shuriken','pentagram','hexagram'].includes(l),u=['crosshair','x-mark'].includes(l),f='unicode'==l;let m=n.getSymbolFillRadius(e);if(c)drawCircle(a,r.canvasX,r.canvasY,m,o,s,i);else{if(d)switch(l){case'triangle':return void drawPolygon(a,r.canvasX,r.canvasY,3,m,o,s,i);case'rhombus':return void drawPolygon(a,r.canvasX,r.canvasY,4,m,o,s,i);case'pentagon':return void drawPolygon(a,r.canvasX,r.canvasY,5,m,o,s,i);case'hexagon':return void drawPolygon(a,r.canvasX,r.canvasY,6,m,o,s,i);default:let t=n.safeNumber(`${e}symbol-node-count`);return void drawPolygon(a,r.canvasX,r.canvasY,t,m,o,s,i)}if(v)switch(l){case'diamond':return void drawStar(a,r.canvasX,r.canvasY,2,m,.5*m,o,s,i);case'trigram':return void drawStar(a,r.canvasX,r.canvasY,3,m,.25*m,o,s,i);case'shuriken':return void drawStar(a,r.canvasX,r.canvasY,4,m,.5*m,o,s,i);case'pentagram':return void drawStar(a,r.canvasX,r.canvasY,5,m,.5*m,o,s,i);case'hexagram':return void drawStar(a,r.canvasX,r.canvasY,6,m,.5*m,o,s,i);default:let t=n.safeNumber(`${e}symbol-node-count`);if(null==n[`${e}symbol-inner-size`])var h=Math.max(1,m/3);else h=n.safeNumber(`${e}symbol-inner-size`);return void drawStar(a,r.canvasX,r.canvasY,t,m,h,o,s,i)}if(u)if('none'!=(g=n.safeColorOrNone(`${e}symbol-stroke-color`)))switch(a.strokeStyle=g,l){case'crosshair':return drawOneLine(a,r.canvasX,r.canvasY,m,o,0),void drawOneLine(a,r.canvasX,r.canvasY,m,o,90);case'x-mark':return drawOneLine(a,r.canvasX,r.canvasY,m,o,45),void drawOneLine(a,r.canvasX,r.canvasY,m,o,135);default:return}if(f){var g,y,b=n.safeString(`${e}symbol-code-point`);'none'!=(g=n.safeColorOrNone(`${e}symbol-stroke-color`))&&(a.strokeStyle=g),'none'!=(y=n.safeColorOrNone(`${e}symbol-fill-color`))&&(a.fillStyle=y);let t=n.getSymbolSize(e);drawCodePoint(a,r.canvasX,r.canvasY,t,o,b,s,i)}else;}}function drawCircle(a,e,n,r,o,s,t){a.beginPath(),a.arc(e,n,r*o,0,2*Math.PI,!1),a.closePath(),s&&a.stroke(),t&&a.fill()}function drawPolygon(a,e,n,r,o,s,t,i){if(!(r<3)){var l=[],c=360/r,d=270;for(let a=0;a<r;a++){var v=d*degreesToRadians;l.push({x:Math.cos(v)*o*s,y:Math.sin(v)*o*s}),d+=c}a.beginPath(),a.moveTo(e+l[0].x,n+l[0].y);for(let o=1;o<r;o++)a.lineTo(e+l[o].x,n+l[o].y);a.closePath(),t&&(a.lineJoin='round',a.stroke()),i&&a.fill()}}function drawStar(a,e,n,r,o,s,t,i,l){if(!(r<2)){var c=2*r,d=[],v=360/c,u=270;for(let a=0;a<c;a++){var f=u*degreesToRadians;a%2==0?d.push({x:Math.cos(f)*o*t,y:Math.sin(f)*o*t}):d.push({x:Math.cos(f)*s*t,y:Math.sin(f)*s*t}),u+=v}a.beginPath(),a.moveTo(e+d[0].x,n+d[0].y);for(let r=1;r<c;r++)a.lineTo(e+d[r].x,n+d[r].y);a.closePath(),i&&(a.lineJoin='miter',a.stroke()),l&&a.fill()}}function drawOneLine(a,e,n,r,o,s){var t=s*degreesToRadians,i=Math.cos(t)*r*o,l=Math.sin(t)*r*o,c=(s+180)*degreesToRadians,d=Math.cos(c)*r*o,v=Math.sin(c)*r*o;a.beginPath(),a.moveTo(e+i,n+l),a.lineTo(e+d,n+v),a.lineCap='square',a.stroke()}function drawCodePoint(a,e,n,r,o,s,t,i){let l=Math.round(2+r*o*2);a.font=`${l}px sans-serif`,a.textAlign='center',a.textBaseline='middle',t&&a.strokeText(s,e,n),i&&a.fillText(s,e,n)}