/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import*as EuclideanGeometry from'../spherical-earth/euclidean-geometry.js';import expect from'../dev/expect.js';export default class LabelCurve{constructor(t,e,r,s,i,h,a,n,c){expect(t,'Number'),expect(e,'Number'),expect(r,'Number'),expect(s,'Number'),expect(i,'Number'),expect(h,'Number'),expect(a,'Number'),expect(n,'Number'),expect(c,'Number'),this.startX=t,this.startY=e,this.cp1X=r,this.cp1Y=s,this.cp2X=i,this.cp2Y=h,this.endX=a,this.endY=n,this.curveLength=c,Object.seal(this)}getNormalized(){return{startX:0,startY:0,cp1X:this.cp1X-this.startX,cp1Y:this.cp1Y-this.startY,cp2X:this.cp2X-this.startX,cp2Y:this.cp2Y-this.startY,endX:this.endX-this.startX,endY:this.endY-this.startY}}getReversedNormalized(){return{endX:0,endY:0,cp2X:this.cp1X-this.startX,cp2Y:this.cp1Y-this.startY,cp1X:this.cp2X-this.startX,cp1Y:this.cp2Y-this.startY,startX:this.endX-this.startX,startY:this.endY-this.startY}}isAbove(){return this.startX<this.endX}get width(){return this.endX-this.startX}get height(){return this.endY-this.startY}get centerX(){return(this.endX+this.startX)/2}get centerY(){return(this.endY+this.startY)/2}getAngularDirection(){return Math.atan2(this.endY-this.startY,this.endX-this.startX)}getQuadrant(){var t=this.getAngularDirection();return t>Math.PI/2&&t<=Math.PI?'I':t>0&&t<=Math.PI/2?'II':t>-Math.PI/2&&t<=0?'III':t>-Math.PI&&t<=-Math.PI/2?'IV':''}bezierPointAt(t){var e=this.isAbove()?this.getNormalized():this.getReversedNormalized();let r=t*t,s=r*t,i=1-t,h=i*i,a=h*i;return{x:e.startX*a+3*e.cp1X*h*t+3*e.cp2X*i*r+e.endX*s,y:e.startY*a+3*e.cp1Y*h*t+3*e.cp2Y*i*r+e.endY*s}}get totalBezierLength(){var t=0,e=this.bezierPointAt(0);for(let i=1;i<=100;i++){var r=.01*i,s=this.bezierPointAt(r);t+=EuclideanGeometry.pointToPointDistance(s.x,s.y,e.x,e.y),e=s}return t}}