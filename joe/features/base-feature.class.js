/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import RS from'../enum/rendering-state.enum.js';import expect from'../dev/expect.js';import terminal from'../dev/terminal.js';export default class BaseFeature{static nextFeatureId=0;constructor(){this.featureId=BaseFeature.nextFeatureId++,this.featureName='',this.kvPairs={},this.isSelected=!1,this.canvasParamsPerLayer=new Map,this.pointsOnNearSide=0,this.pointsOnFarSide=0,this.pointsOnCanvas=0,this.pointsOffCanvas=0}toggleSelectedState(){this.isSelected=!this.isSelected}getCanvasParamsPerLayerId(e){return expect(e,'Number'),this.canvasParamsPerLayer.get(e)}setCanvasParamsPerLayerId(e,t){return expect(e,'Number'),expect(t,'CanvasParams'),this.canvasParamsPerLayer.set(e,t)}computeFeatureStyle(e,t,a,r,s,i){expect(e,'RenderClock'),expect(t,'Visualizer'),expect(a,'String'),expect(r,'String'),expect(s,'Number'),expect(i,'Number'),terminal.logic('Feature subclass must provide a computeFeatureStyle() function')}toGeoCoords(e,t){terminal.logic('Feature subclass must provide a toGeoCoords() function')}toPlane(e,t){terminal.logic('Feature subclass must provide a toPlane() function')}toPixels(e,t){terminal.logic('Feature subclass must provide a toPixels() function')}toViewportCanvas(e,t){terminal.logic('Feature subclass must provide a toViewportCanvas() function')}drawFeature(e,t,a){expect(e,'RenderClock'),expect(t,'Earth'),expect(a,'Layer'),terminal.logic('Feature subclass must provide a drawFeature() function')}featureIsOnNearSide(e){return expect(e,'Number'),!(this.pointsOnFarSide>0&&e==RS.SKETCHING)}featureIsOnCanvas(e){return expect(e,'Number'),!(this.pointsOffCanvas>0&&e==RS.SKETCHING)}featureIsVisible(e){expect(e,'Number');var t=this.getCanvasParamsPerLayerId(e);return null!=t&&!!t.isVisible()}hasSomethingToDraw(e){return expect(e,['CanvasParams','undefined']),null!=e&&(!!e.isVisible()&&(0!=this.pointsOnNearSide&&0!=this.pointsOnCanvas))}roughAndReadyPoint(){return{latitude:0,longitude:0}}}