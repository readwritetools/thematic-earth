/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import ProxyBase from'../labels/proxy-base.class.js';import LabelRect from'../labels/label-rect.class.js';import*as LabelGraphics from'../graphics/label-graphics.js';import aver from'../dev/aver.js';import expect from'../dev/expect.js';export default class ProxyLine extends ProxyBase{constructor(e,t,a){super(e,t,a),this.possibleCurves=[],this.chosenCurve=null,Object.seal(this)}disqualificationCriteria(){aver(null!=this.labelBoundingBox),aver(null!=this.featureBoundingBox),0!=this.featureBoundingBox.isValid()?this.labelBoundingBox.width>this.featureBoundingBox.width&&(this.isDisqualified=!0):this.isDisqualified=!0}possiblePlacements(e){aver(null!=this.feature),aver(null!=this.featureBoundingBox),aver(null!=this.labelBoundingBox);var t=this.labelBoundingBox.width;if(this.possibleCurves=this.feature.getPossibleLabelCurves(t),'curved'==this.canvasParams.safeString('label-orientation'))for(let e=this.possibleCurves.length-1;e>=0;e--)0==this.isCurveAcceptable(this.possibleCurves[e])&&this.possibleCurves.splice(e,1);0==this.possibleCurves.length&&(this.isDisqualified=!0)}isCurveAcceptable(e){var t=this.labelBoundingBox.width,a=1/(t-1),s=null,i=null,r=null,l=null;for(let h=0;h<t;h++){var n=h*a;r=e.bezierPointAt(n);if(null!=l){var o=Math.atan2(r.y-l.y,r.x-l.x);null==s?(s=o,i=o):(s=Math.min(s,o),i=Math.max(i,o))}l=r}return!(i-s>Math.PI/6*this.labelText.length)}collisionAdjustment(e,t){if(expect(e,'HTMLCanvasElement'),expect(t,'CollisionMatrix'),0!=this.possibleCurves.length){var a=this.possibleCurves.length,s=flipFlopArray(a);for(let e=0;e<a;e++){var i=s[e],r=this.possibleCurves[i],l=this.getPossibleLabelRect(r);if(1==t.reserveLabelLocation(l))return void(this.chosenCurve=this.possibleCurves[i])}this.isDisqualified=!0}else this.isDisqualified=!0}getPossibleLabelRect(e){expect(e,'LabelCurve');var t=this.labelBoundingBox.width,a=this.labelBoundingBox.height,s=.5*a;if('horizontal'===this.canvasParams.safeString('label-orientation')){var i=e.centerX-t/2,r=e.centerY-a/2;return new LabelRect(i,r,l=t,n=a)}i=Math.min(e.startX,e.endX)-s,r=Math.min(e.startY,e.endY)-s;var l=Math.abs(e.startX-e.endX)+a,n=Math.abs(e.startY-e.endY)+a;return new LabelRect(i,r,l,n)}drawBoundingBox(e){if('show'==this.canvasParams.safeString('label-debug-alt-curves')){aver(null!=this.labelBoundingBox);var t=e.getContext('2d');t.strokeWidth=.5;var a=this.canvasParams.safeString('label-orientation');for(let e=0;e<this.possibleCurves.length;e++){var s=this.possibleCurves[e];switch(s.isAbove()?t.strokeStyle='#f00':t.strokeStyle='#0f0',a){case'horizontal':case'diagonal':this.drawStraightLine(t,s);break;default:this.drawBezierPoints(t,s)}}}}drawSimpleStraightLine(e,t){e.setLineDash([2,2]),e.beginPath(),e.moveTo(t.startX,t.startY),e.lineTo(t.startX+t.width,t.startY+t.height),e.stroke(),e.setLineDash([])}drawStraightLine(e,t){e.save(),e.setLineDash([4,6]),t.isAbove()?(e.translate(t.startX,t.startY),e.beginPath(),e.moveTo(0,0),e.lineTo(t.width,t.height)):(e.translate(t.startX,t.startY),e.beginPath(),e.moveTo(t.width,t.height),e.lineTo(0,0)),e.stroke(),e.restore()}drawBezierCurve(e,t){var a=t.getNormalized();e.save(),t.isAbove()?(e.translate(t.startX,t.startY),e.beginPath(),e.moveTo(a.startX,a.startY),e.bezierCurveTo(a.cp1X,a.cp1Y,a.cp2X,a.cp2Y,a.endX,a.endY)):(e.translate(t.startX,t.startY),e.beginPath(),e.moveTo(a.endX,a.endY),e.bezierCurveTo(a.cp2X,a.cp2Y,a.cp1X,a.cp1Y,a.startX,a.startY)),e.stroke(),e.restore()}drawBezierPoints(e,t){var a=t.getNormalized();e.save(),e.setLineDash([1,1]),1==t.isAbove()?(e.translate(t.startX,t.startY),e.beginPath(),e.moveTo(a.startX,a.startY)):(e.translate(t.startX,t.startY),e.beginPath(),e.moveTo(a.endX,a.endY));for(let a=0;a<1;a+=.1){var{x:s,y:i}=t.bezierPointAt(a);e.lineTo(s,i)}e.stroke(),e.restore()}drawLabel(e){if(expect(e,'HTMLCanvasElement'),''!=this.labelText){var t=this.canvasParams.safeString('label-orientation');if('show'==this.canvasParams.safeString('label-debug-alt-curves'))for(let s=0;s<this.possibleCurves.length;s++){var a=this.possibleCurves[s];switch(t){case'horizontal':this.drawHorizontalText(e,a);break;case'diagonal':this.drawAngledText(e,a);break;default:this.drawLettersOnSpline(e,a)}}else if(null!=this.chosenCurve)switch(t){case'horizontal':this.drawHorizontalText(e,this.chosenCurve);break;case'diagonal':this.drawAngledText(e,this.chosenCurve);break;default:this.drawLettersOnSpline(e,this.chosenCurve)}}}drawHorizontalText(e,t){var a=this.labelBoundingBox.height,s=this.labelBoundingBox.width,i=t.centerX-s/2,r=t.centerY-a/2;LabelGraphics.draw(e,this.canvasParams,i,r,this.labelText,'left','top')}drawAngledText(e,t){var a=e.getContext('2d'),s=t.getAngularDirection(),i=this.labelBoundingBox.height,r='left';a.save(),1==t.isAbove()?(a.translate(t.startX,t.startY),a.rotate(s),LabelGraphics.draw(e,this.canvasParams,0,-1*i,this.labelText,r,'top')):(a.translate(t.endX,t.endY),a.rotate(s+Math.PI),LabelGraphics.draw(e,this.canvasParams,0,0,this.labelText,r,'top')),a.restore()}drawLettersOnSpline(e,t){var a=e.getContext('2d'),s=this.labelText.length,i=(this.labelBoundingBox.height,this.labelBoundingBox.width),r=t.totalBezierLength,l=(r-i)/2,n=l/r,o=i/r,h=[],u=[],v=new Map,b=[],d=[],c=[],g=[],p=0;for(let t=0;t<s;t++)h[t]=this.labelText.charAt(t),u[t]=LabelGraphics.computeTextMetrics(e,this.canvasParams,h[t]).width,p=Math.max(p,u[t]);b[0]=u[0]/2;for(let t=1;t<s;t++){var f=`${h[t-1]}${h[t]}`,x=LabelGraphics.computeTextMetrics(e,this.canvasParams,f).width-u[t-1]-u[t];v.set(f,x);var m=u[t-1]/2,B=u[t]/2;b[t]=b[t-1]+m+x+B}for(let r=0;r<s;r++){d[r]=n+b[r]/i*o,c[r]=t.bezierPointAt(d[r]);var w=t.bezierPointAt(d[r]-.01),P=t.bezierPointAt(d[r]+.01);g[r]=Math.atan2(w.y-P.y,w.x-P.x),a.save(),a.translate(t.startX,t.startY),a.translate(c[r].x,c[r].y),a.rotate(g[r]+Math.PI);LabelGraphics.draw(e,this.canvasParams,0,0,h[r],'center','middle'),a.restore()}}}function flipFlopArray(e){if(expect(e,'Number'),0==e)return[];var t=Math.floor(e/2),a=[],s=[];for(let s=t;s<e;s++)a.push(s);for(let e=t-1;e>=0;e--)s.push(e);var i=[];for(let t=0;t<e;t++){let e=Math.floor(t/2);t%2==0?i.push(a[e]):i.push(s[e])}return i}