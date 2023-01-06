/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import BaseFeature from'./base-feature.class.js';import*as st from'../spherical-earth/spherical-trigonometry.js';import*as LineGraphics from'../graphics/line-graphics.js';import*as EuclideanGeometry from'../spherical-earth/euclidean-geometry.js';import BoundingBox from'../graphics/bounding-box.class.js';import LabelCurve from'../labels/label-curve.class.js';import FT from'../enum/feature-type.enum.js';import RS from'../enum/rendering-state.enum.js';import expect from'../dev/expect.js';export default class LineFeature extends BaseFeature{constructor(){super(),this.lineSegment=[],this.mouseEpsilon=1}get featureType(){return FT.LINE}addPoint(e){expect(e,'ProjectedPoint'),this.lineSegment.push(e)}computeFeatureStyle(e,t,n,a,i,s){if(expect(e,'RenderClock'),expect(t,'Visualizer'),expect(n,'String'),expect(a,'String'),expect(i,'Number'),expect(s,'Number'),0==this.featureIsOnNearSide(e.renderingState))return;if(0==this.featureIsOnCanvas(e.renderingState))return;let r=t.computeStyle('line',n,a,this.isSelected,this.featureName,this.kvPairs,i);expect(r,'CanvasParams'),this.setCanvasParamsPerLayerId(s,r);let l=Number(r['stroke-width']);isNaN(l)||(this.mouseEpsilon=Math.max(this.mouseEpsilon,l))}runCourtesyValidator(e,t,n,a,i){e.runCourtesyValidator(FT.LINE,t,n,this.featureName,this.kvPairs,a)}toGeoCoords(e,t){for(var n=0;n<this.lineSegment.length;n++)t.toPhiLambda(this.lineSegment[n])}toPlane(e,t){expect(e,'RenderClock'),expect(t,'OrthographicProjection'),this.pointsOnNearSide=0,this.pointsOnFarSide=0;for(var n=0;n<this.lineSegment.length;n++){let a=this.lineSegment[n];if(t.toEastingNorthing(a),a.isOnNearSide)this.pointsOnNearSide++;else if(this.pointsOnFarSide++,e.renderingState==RS.SKETCHING)return}}toPixels(e,t){if(expect(e,'RenderClock'),expect(t,'CartesianTransformation'),0!=this.featureIsOnNearSide(e.renderingState))for(var n=0;n<this.lineSegment.length;n++)t.toEarthXY(this.lineSegment[n],!0,!0,!0)}toViewportCanvas(e,t){if(expect(e,'RenderClock'),expect(t,'Viewport'),0!=this.featureIsOnNearSide(e.renderingState)){this.pointsOnCanvas=0,this.pointsOffCanvas=0;for(var n=0;n<this.lineSegment.length;n++){let e=this.lineSegment[n];t.toCanvasXY(e),e.isOnNearSide&&(e.isOnCanvas?this.pointsOnCanvas++:this.pointsOffCanvas++)}}}drawFeature(e,t,n){if(expect(e,'RenderClock'),expect(t,'Earth'),expect(n,'Layer'),0==this.featureIsOnNearSide(e.renderingState))return;if(0==this.featureIsOnCanvas(e.renderingState))return;let a=this.getCanvasParamsPerLayerId(n.layerId);if(0!=this.hasSomethingToDraw(a)&&0!=a.displayStrokes()){var i=t.canvas.getContext('2d'),s=t.patternCache;LineGraphics.draw(i,s,a,this.lineSegment),e.renderingState==RS.PAINTING&&n.isLabelable()&&a.displayLabels()&&a.wantsLabel()&&''!=a.getLabelText(this.kvPairs)&&t.addToLabelEngineQueue(n.layerId,n.spatialId,this.featureId,FT.LINE)}}isPointerOnLine(e,t){if(this.lineSegment.length<=1)return!1;let n=this.lineSegment[0];for(let a=1;a<this.lineSegment.length;a++){let i=this.lineSegment[a];if(n.isOnNearSide&&i.isOnNearSide){let a=this.distance(n.canvasX,n.canvasY,i.canvasX,i.canvasY),s=this.distance(n.canvasX,n.canvasY,e,t),r=this.distance(i.canvasX,i.canvasY,e,t);if(Math.abs(a-(s+r))<this.mouseEpsilon)return!0}n=i}return!1}distance(e,t,n,a){return Math.sqrt(Math.pow(e-n,2)+Math.pow(t-a,2))}roughAndReadyPoint(){var e=this.lineSegment[0],t=Math.round(this.lineSegment.length/2),n=this.lineSegment[t];return st.sphericalMidpoint(e.latitude,e.longitude,n.latitude,n.longitude)}getFeatureBoundingBox(){var e={minX:null,maxX:null,minY:null,maxY:null};for(let n=0;n<this.lineSegment.length;n++){var t=this.lineSegment[n];t.isOnCanvas&&(null==e.minX?(e.minX=t.canvasX,e.maxX=t.canvasX,e.minY=t.canvasY,e.maxY=t.canvasY):(e.minX=Math.min(e.minX,t.canvasX),e.maxX=Math.max(e.maxX,t.canvasX),e.minY=Math.min(e.minY,t.canvasY),e.maxY=Math.max(e.maxY,t.canvasY)))}return null==e.minX?new BoundingBox(0,0,0,0):new BoundingBox(e.minX,e.maxX,e.minY,e.maxY)}getPossibleLabelCurves(e){expect(e,'Number');var t=1.5*e,n=t/3,a=2*t/3,i=[],s=null,r=null,l=null,o=null,u=null,h=null,m=0;for(let e=0;e<this.lineSegment.length;e++){var c=this.lineSegment[e];if(c.isOnCanvas)if(null==s)s=c.canvasX,r=c.canvasY;else{var d=this.lineSegment[e-1];(m+=EuclideanGeometry.pointToPointDistance(d.canvasX,d.canvasY,c.canvasX,c.canvasY))>t&&null!=l&&null!=u?(i.push(new LabelCurve(s,r,l,o,u,h,c.canvasX,c.canvasY,m)),s=null,r=null,l=null,o=null,u=null,h=null,m=0):m>a&&null!=l&&null==u?(u=c.canvasX,h=c.canvasY):m>n&&null==l&&(l=c.canvasX,o=c.canvasY)}else s=null,r=null,l=null,o=null,u=null,h=null,m=0}return i}}