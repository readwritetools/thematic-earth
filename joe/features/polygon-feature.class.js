/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import BaseFeature from'./base-feature.class.js';import*as st from'../spherical-earth/spherical-trigonometry.js';import*as PolygonGraphics from'../graphics/polygon-graphics.js';import BoundingBox from'../graphics/bounding-box.class.js';import LabelSlot from'../labels/label-slot.class.js';import FT from'../enum/feature-type.enum.js';import RS from'../enum/rendering-state.enum.js';import expect from'../dev/expect.js';export default class PolygonFeature extends BaseFeature{constructor(){super(),this.outerRing=[],this.innerRings=[],this.isFullyEnclosing=!1}get featureType(){return FT.POLYGON}addPoint(e){expect(e,'ProjectedPoint'),this.outerRing.push(e)}computeFeatureStyle(e,n,t,a,i,s){if(expect(e,'RenderClock'),expect(n,'Visualizer'),expect(t,'String'),expect(a,'String'),expect(i,'Number'),expect(s,'Number'),0==this.featureIsOnNearSide(e.renderingState))return;if(0==this.featureIsOnCanvas(e.renderingState))return;let r=n.computeStyle('polygon',t,a,this.isSelected,this.featureName,this.kvPairs,i);expect(r,'CanvasParams'),this.setCanvasParamsPerLayerId(s,r)}runCourtesyValidator(e,n,t,a,i){e.runCourtesyValidator(FT.POLYGON,n,t,this.featureName,this.kvPairs,a)}toGeoCoords(e,n){for(var t=0;t<this.outerRing.length;t++)n.toPhiLambda(this.outerRing[t]);for(t=0;t<this.innerRings.length;t++)for(var a=this.innerRings[t],i=0;i<a.outerRing.length;i++){let e=a.outerRing[i];n.toPhiLambda(e)}}toPlane(e,n){expect(e,'RenderClock'),expect(n,'OrthographicProjection'),this.pointsOnNearSide=0,this.pointsOnFarSide=0;for(var t=0;t<this.outerRing.length;t++){let a=this.outerRing[t];if(n.toEastingNorthing(a),a.isOnNearSide)this.pointsOnNearSide++;else if(this.pointsOnFarSide++,e.renderingState==RS.SKETCHING)return}for(t=0;t<this.innerRings.length;t++)for(var a=this.innerRings[t],i=0;i<a.outerRing.length;i++){let t=a.outerRing[i];if(n.toEastingNorthing(t),t.isOnNearSide)this.pointsOnNearSide++;else if(this.pointsOnFarSide++,e.renderingState==RS.SKETCHING)return}}toPixels(e,n){if(expect(e,'RenderClock'),expect(n,'CartesianTransformation'),0!=this.featureIsOnNearSide(e.renderingState)){for(var t=0;t<this.outerRing.length;t++)n.toEarthXY(this.outerRing[t],!0,!0,!0);for(t=0;t<this.innerRings.length;t++)this.innerRings[t].toPixels(e,n)}}toViewportCanvas(e,n){if(expect(e,'RenderClock'),expect(n,'Viewport'),0!=this.featureIsOnNearSide(e.renderingState)){this.pointsOnCanvas=0,this.pointsOffCanvas=0;for(var t={minX:null,maxX:null,minY:null,maxY:null},a=0;a<this.outerRing.length;a++){let i=this.outerRing[a];if(n.toCanvasXY(i),i.isOnNearSide){if(i.isOnCanvas)this.pointsOnCanvas++;else if(this.pointsOffCanvas++,e.renderingState==RS.SKETCHING)return;null==t.minX?(t.minX=i.canvasX,t.maxX=i.canvasX,t.minY=i.canvasY,t.maxY=i.canvasY):(t.minX=Math.min(t.minX,i.canvasX),t.maxX=Math.max(t.maxX,i.canvasX),t.minY=Math.min(t.minY,i.canvasY),t.maxY=Math.max(t.maxY,i.canvasY))}}for(a=0;a<this.innerRings.length;a++)for(var i=this.innerRings[a],s=0;s<i.outerRing.length;s++){let t=i.outerRing[s];if(n.toCanvasXY(t),t.isOnNearSide)if(t.isOnCanvas)this.pointsOnCanvas++;else if(this.pointsOffCanvas++,e.renderingState==RS.SKETCHING)return}0==this.pointsOnCanvas&&this.pointsOffCanvas>=4&&t.minX<0&&t.maxX>n.canvasWidth&&t.minY<0&&t.maxY>n.canvasHeight?this.isFullyEnclosing=!0:this.isFullyEnclosing=!1}}drawFeature(e,n,t){if(expect(e,'RenderClock'),expect(n,'Earth'),expect(t,'Layer'),0==this.featureIsOnNearSide(e.renderingState))return;if(0==this.featureIsOnCanvas(e.renderingState))return;let a=this.getCanvasParamsPerLayerId(t.layerId);if(this.isFullyEnclosing)this.drawCanvasBackgroundOnly(n,a);else{if(0==this.hasSomethingToDraw(a))return;var i=n.carte.translate.a*n.carte.multiplier,s=n.carte.translate.b*n.carte.multiplier,r=n.viewport.centerPoint.x+i,o=n.viewport.centerPoint.y+s,h=n.getVisualizedRadius(),l='night'==this.featureName,u=n.canvas.getContext('2d'),c=n.patternCache;PolygonGraphics.draw(u,c,a,h,r,o,this.outerRing,this.innerRings,l)}e.renderingState==RS.PAINTING&&t.isLabelable()&&a.displayLabels()&&a.wantsLabel()&&''!=a.getLabelText(this.kvPairs)&&n.addToLabelEngineQueue(t.layerId,t.spatialId,this.featureId,FT.POLYGON)}drawCanvasBackgroundOnly(e,n){var t=[];t.push({isOnNearSide:!0,canvasX:0,canvasY:0}),t.push({isOnNearSide:!0,canvasX:0,canvasY:e.viewport.canvasHeight}),t.push({isOnNearSide:!0,canvasX:e.viewport.canvasWidth,canvasY:e.viewport.canvasHeight}),t.push({isOnNearSide:!0,canvasX:e.viewport.canvasWidth,canvasY:0});var a=e.canvas.getContext('2d'),i=e.patternCache;PolygonGraphics.draw(a,i,n,1,0,0,t,[],!1)}isPointerInsidePolygon(e,n){var t=this.outerRing.length,a=!1,i=0;for(let e=0;e<t&&i<3;e++)1==this.outerRing[e].isOnNearSide&&i++;if(i<3)return!1;var s=null;for(let e=0;e<t;e++)if(1==this.outerRing[e].isOnNearSide){s=e;break}var r=s;for(let i=r+1;i<t;i++){if(0==this.outerRing[i].isOnNearSide)continue;let t=r;var o=this.outerRing[i].canvasX,h=this.outerRing[i].canvasY,l=this.outerRing[t].canvasX;if(h>n!=(u=this.outerRing[t].canvasY)>n)e<(l-o)*(n-h)/(u-h)+o&&(a=!a);r=i}var u;o=this.outerRing[s].canvasX,h=this.outerRing[s].canvasY,l=this.outerRing[r].canvasX;h>n!=(u=this.outerRing[r].canvasY)>n&&(e<(l-o)*(n-h)/(u-h)+o&&(a=!a));return a}roughAndReadyPoint(){var e=this.outerRing[0],n=Math.round(this.outerRing.length/2),t=this.outerRing[n];return st.sphericalMidpoint(e.latitude,e.longitude,t.latitude,t.longitude)}getFeatureBoundingBox(e){expect(e,'HTMLCanvasElement');var n={minX:null,maxX:null,minY:null,maxY:null},t=!1,a=!1,i=!1,s=!1;for(let o=0;o<this.outerRing.length;o++){var r=this.outerRing[o];r.isOnNearSide&&(0==r.isOnCanvas&&(r.canvasX<0&&(t=!0),r.canvasX>e.width&&(a=!0),r.canvasY<0&&(i=!0),r.canvasY>e.width&&(s=!0)),1==r.isOnCanvas&&(null==n.minX?(n.minX=r.canvasX,n.maxX=r.canvasX,n.minY=r.canvasY,n.maxY=r.canvasY):(n.minX=Math.min(n.minX,r.canvasX),n.maxX=Math.max(n.maxX,r.canvasX),n.minY=Math.min(n.minY,r.canvasY),n.maxY=Math.max(n.maxY,r.canvasY))))}return t&&(n.minX=0),a&&(n.maxX=e.width),i&&(n.minY=0),s&&(n.maxY=e.height),null==n.minX?1==this.isFullyEnclosing?new BoundingBox(0,e.width,0,e.height):new BoundingBox(0,0,0,0):new BoundingBox(n.minX,n.maxX,n.minY,n.maxY)}getPossibleLabelSlots(e,n,t,a,i){expect(e,'Number'),expect(n,'Number'),expect(t,'Number'),expect(a,'Number'),expect(i,'Number');var s=[];if(this.pointsOnCanvas<4&&0==this.isFullyEnclosing)return s;if(0==i)return s;var r=Math.floor(a/i);if(0==r)return s;var o=a-r*i,h=Math.round(t+o/2+i/2);for(let e=0;e<r;e++){var l=h+i*e;s.push(new LabelSlot(l))}var u=-1,c=null,g=null;for(let t=0;t<=this.outerRing.length;t++){if(t!=this.outerRing.length){if(0==this.outerRing[t].isOnNearSide)continue;if(-1==u){c=clampToCanvas(this.outerRing[t],e,n),u=t;continue}g=clampToCanvas(this.outerRing[t],e,n)}else g=clampToCanvas(this.outerRing[u],e,n);for(let n=0;n<r;n++){l=(v=s[n]).y;c.canvasY<l&&g.canvasY>=l&&v.addIntersection(c.canvasX,g.canvasX,e),c.canvasY>l&&g.canvasY<=l&&v.addIntersection(c.canvasX,g.canvasX,e)}c=g}for(let e=0;e<s.length;e++){var v;1==(v=s[e]).hasIntersections()&&(v.sortIntersections(),v.discardShorterSegments())}for(let e=s.length-1;e>=0;e--)0==s[e].hasIntersections()&&s.splice(e,1);return s}}function clampToCanvas(e,n,t){return e.canvasX<0&&(e.canvasX=0),e.canvasX>n&&(e.canvasX=n),e.canvasY<0&&(e.canvasY=0),e.canvasY>t&&(e.canvasY=t),{canvasX:e.canvasX,canvasY:e.canvasY}}