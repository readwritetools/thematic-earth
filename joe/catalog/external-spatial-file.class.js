/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import BaseSpatialFile from'../catalog/base-spatial-file.class.js';import RS from'../enum/rendering-state.enum.js';import PS from'../enum/projection-stage.enum.js';import FT from'../enum/feature-type.enum.js';import expect from'../dev/expect.js';export default class ExternalSpatialFile extends BaseSpatialFile{constructor(e){super(e),this.featurePolygons=[],this.featureLines=[],this.featurePoints=[],this.replaceAppend='',this.url='',this.featureKey='',this.polygonStopLength=0,this.lineStopLength=0,this.pointStopLength=0}runCourtesyValidator(e,t,s){expect(e,'Visualizer'),expect(t,'Layer'),expect(s,'Number'),super.runCourtesyValidator((()=>{for(var i=0;i<this.featurePolygons.length;i++)this.featurePolygons[i].runCourtesyValidator(e,t.tessClassname,t.tessIdentifier,i,s);for(i=0;i<this.featureLines.length;i++)this.featureLines[i].runCourtesyValidator(e,t.tessClassname,t.tessIdentifier,i,s);for(i=0;i<this.featurePoints.length;i++)this.featurePoints[i].runCourtesyValidator(e,t.tessClassname,t.tessIdentifier,i,s)}))}rotation(e,t){expect(e,'RenderClock'),expect(t,'GeocentricCoordinates'),super.rotation(e,t,(()=>{this.polygonStopLength=this.featurePolygons.length,this.timeRestrictedLoop(this.featurePolygons,FT.POLYGON,e,PS.ROTATION,(s=>{s.toGeoCoords(e,t)})),this.lineStopLength=this.featureLines.length,this.timeRestrictedLoop(this.featureLines,FT.LINE,e,PS.ROTATION,(s=>{s.toGeoCoords(e,t)})),this.pointStopLength=this.featurePoints.length,this.timeRestrictedLoop(this.featurePoints,FT.POINT,e,PS.ROTATION,(s=>{s.toGeoCoords(e,t)}))}))}projection(e,t){expect(e,'RenderClock'),expect(t,'OrthographicProjection'),super.projection(e,t,(()=>{this.timeRestrictedLoop(this.featurePolygons,FT.POLYGON,e,PS.PROJECTION,(s=>{s.toPlane(e,t)})),this.timeRestrictedLoop(this.featureLines,FT.LINE,e,PS.PROJECTION,(s=>{s.toPlane(e,t)})),this.timeRestrictedLoop(this.featurePoints,FT.POINT,e,PS.PROJECTION,(s=>{s.toPlane(e,t)}))}))}transformation(e,t){expect(e,'RenderClock'),expect(t,'CartesianTransformation'),super.transformation(e,t,(()=>{this.timeRestrictedLoop(this.featurePolygons,FT.POLYGON,e,PS.TRANSFORMATION,(s=>{s.toPixels(e,t)})),this.timeRestrictedLoop(this.featureLines,FT.LINE,e,PS.TRANSFORMATION,(s=>{s.toPixels(e,t)})),this.timeRestrictedLoop(this.featurePoints,FT.POINT,e,PS.TRANSFORMATION,(s=>{s.toPixels(e,t)}))}))}placement(e,t){expect(e,'RenderClock'),expect(t,'Viewport'),super.placement(e,t,(()=>{this.timeRestrictedLoop(this.featurePolygons,FT.POLYGON,e,PS.PLACEMENT,(s=>{s.toViewportCanvas(e,t)})),this.timeRestrictedLoop(this.featureLines,FT.LINE,e,PS.PLACEMENT,(s=>{s.toViewportCanvas(e,t)})),this.timeRestrictedLoop(this.featurePoints,FT.POINT,e,PS.PLACEMENT,(s=>{s.toViewportCanvas(e,t)}))}))}recomputeStyles(e,t,s,i){expect(e,'RenderClock'),expect(t,'Visualizer'),expect(s,'Layer'),expect(i,'Number'),super.recomputeStyles(e,t,s,(()=>{this.timeRestrictedLoop(this.featurePolygons,FT.POLYGON,e,PS.STYLING,((r,o)=>{r.computeFeatureStyle(e,t,s.tessClassname,s.tessIdentifier,o,i)})),this.timeRestrictedLoop(this.featureLines,FT.LINE,e,PS.STYLING,((r,o)=>{r.computeFeatureStyle(e,t,s.tessClassname,s.tessIdentifier,o,i)})),this.timeRestrictedLoop(this.featurePoints,FT.POINT,e,PS.STYLING,((r,o)=>{r.computeFeatureStyle(e,t,s.tessClassname,s.tessIdentifier,o,i)}))}))}drawLayer(e,t,s){expect(e,'RenderClock'),expect(t,'Earth'),expect(s,'Layer'),super.drawLayer(e,(()=>{this.timeRestrictedLoop(this.featurePolygons,FT.POLYGON,e,PS.DRAWING,(i=>{i.drawFeature(e,t,s)})),this.timeRestrictedLoop(this.featureLines,FT.LINE,e,PS.DRAWING,(i=>{i.drawFeature(e,t,s)})),this.timeRestrictedLoop(this.featurePoints,FT.POINT,e,PS.DRAWING,(i=>{i.drawFeature(e,t,s)}))}))}timeRestrictedLoop(e,t,s,i,r){expect(e,'Array'),expect(t,'String'),expect(s,'RenderClock'),expect(i,'Number'),expect(r,'Function');let o=performance.now(),n=o+s.getTimeAllotment(i);var a=0;switch(t){case FT.POINT:a=this.pointStopLength;break;case FT.LINE:a=this.lineStopLength;break;case FT.POLYGON:a=this.polygonStopLength;break;default:terminal(`unexpected featureType ${t}`)}for(var p=0;p<e.length&&!(s.renderingState==RS.SKETCHING&&p>=a)&&!(performance.now()>n);p++){r(e[p],p)}switch(t){case FT.POINT:this.pointStopLength=p;break;case FT.LINE:this.lineStopLength=p;break;case FT.POLYGON:this.polygonStopLength=p;break;default:terminal(`unexpected featureType ${t}`)}let u=performance.now();s.consumeRenderTime(u-o)}discoverFeatures(e,t,s){var i=this.discoverPolygon(e,t,s);return null==i&&(i=this.discoverLine(e,t,s)),null==i&&(i=this.discoverPoint(e,t,s)),i}discoverPolygon(e,t,s){for(var i=0;i<this.featurePolygons.length;i++){var r=this.featurePolygons[i];if(r.featureIsVisible(s)&&r.isPointerInsidePolygon(e,t))return r}return null}discoverLine(e,t,s){for(var i=0;i<this.featureLines.length;i++){var r=this.featureLines[i];if(r.featureIsVisible(s)&&r.isPointerOnLine(e,t))return r}return null}discoverPoint(e,t,s){for(var i=0;i<this.featurePoints.length;i++){var r=this.featurePoints[i];if(r.featureIsVisible(s)&&r.isPointerAtPoint(e,t))return r}return null}}