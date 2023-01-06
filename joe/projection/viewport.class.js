/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import expect from'../dev/expect.js';export default class Viewport{constructor(t,e,n){this.thematicEarthElement=t,this.signal=this.thematicEarthElement.signal,this.earth=e,this.centerPoint=n,this.canvasWidth=0,this.canvasHeight=0,this.allPointsNeedPlacement=!0,Object.seal(this)}reflectValues(){this.signal.broadcast('viewport/centerPointX',this.centerPoint.x),this.signal.broadcast('viewport/centerPointY',this.centerPoint.y)}syncCanvasDimensions(t,e){expect(t,'Number'),expect(e,'Number'),this.canvasWidth=t,this.canvasHeight=e}getCanvasWidth(){return this.canvasWidth}getCanvasHeight(){return this.canvasHeight}setCenterPoint(t){var e=parseFloat(t.x),n=parseFloat(t.y);this.centerPoint.x=Math.round(e),this.centerPoint.y=Math.round(n),this.allPointsNeedPlacement=!0,this.signal.broadcast('viewport/centerPointX',this.centerPoint.x),this.signal.broadcast('viewport/centerPointY',this.centerPoint.y)}setCenterPointX(t){var e=parseFloat(t);this.centerPoint.x=Math.round(e),this.allPointsNeedPlacement=!0,this.signal.broadcast('viewport/centerPointX',this.centerPoint.x)}setCenterPointY(t){var e=parseFloat(t);this.centerPoint.y=Math.round(e),this.allPointsNeedPlacement=!0,this.signal.broadcast('viewport/centerPointY',this.centerPoint.y)}getCenterPoint(){return this.centerPoint}getCenterPointX(){return this.centerPoint.x}getCenterPointY(){return this.centerPoint.y}toCanvasXY(t){if(0==t.isOnNearSide)return t.canvasX=null,t.canvasY=null,void(t.isOnCanvas=!1);t.canvasX=t.earthX+this.centerPoint.x,t.canvasY=t.earthY+this.centerPoint.y,t.canvasX<0||t.canvasX>this.canvasWidth||t.canvasY<0||t.canvasY>this.canvasHeight?t.isOnCanvas=!1:t.isOnCanvas=!0}inverseViewport(t){t.earthX=t.canvasX-this.centerPoint.x,t.earthY=t.canvasY-this.centerPoint.y}}