/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import BaseSpatialFile from'../catalog/base-spatial-file.class.js';import LineFeature from'../features/line-feature.class.js';import ProjectedPoint from'../projection/projected-point.class.js';import expect from'../dev/expect.js';export default class NamedMeridians extends BaseSpatialFile{constructor(e,t,r){for(var i in super(e),this.meridians=[],this.frequency=void 0!==r?r:1,this.frequency<=0&&(this.frequency=1),this.frequency>30&&(this.frequency=30),t)if(t.hasOwnProperty(i)){var a=new LineFeature;a.featureName=i;var s=t[i];if(s<-180||s>180)continue;for(var n=-90;n<=90;n+=this.frequency)a.addPoint(new ProjectedPoint(n,s));this.meridians.push(a),this.addFeatureToLookupMap(a)}this.localPointsNeedGeoCoords=!0,this.localPointsNeedProjection=!0,this.localPointsNeedTransformation=!0,this.localPointsNeedPlacement=!0,this.thematicEarthElement.signal.broadcast('catalog/spatialFileAdded',{spatialFileType:'named-meridians',namedCircles:t,frequency:r}),Object.seal(this)}recomputeStyles(e,t,r,i){expect(e,'RenderClock'),expect(t,'Visualizer'),expect(r,'Layer'),expect(i,'Number'),super.recomputeStyles(e,t,r,(()=>{for(var a=0;a<this.meridians.length;a++)this.meridians[a].computeFeatureStyle(e,t,r.tessClassname,r.tessIdentifier,a,i)}))}runCourtesyValidator(e,t,r){expect(e,'Visualizer'),expect(t,'Layer'),expect(r,'Number'),super.runCourtesyValidator((()=>{for(var i=0;i<this.meridians.length;i++)this.meridians[i].runCourtesyValidator(e,t.tessClassname,t.tessIdentifier,i,r)}))}rotation(e,t){expect(e,'RenderClock'),expect(t,'GeocentricCoordinates'),super.rotation(e,t,(()=>{for(var r=0;r<this.meridians.length;r++)this.meridians[r].toGeoCoords(e,t)}))}projection(e,t){expect(e,'RenderClock'),expect(t,'OrthographicProjection'),super.projection(e,t,(()=>{for(var r=0;r<this.meridians.length;r++)this.meridians[r].toPlane(e,t)}))}transformation(e,t){expect(e,'RenderClock'),expect(t,'CartesianTransformation'),super.transformation(e,t,(()=>{for(var r=0;r<this.meridians.length;r++)this.meridians[r].toPixels(e,t)}))}placement(e,t){expect(e,'RenderClock'),expect(t,'Viewport'),super.placement(e,t,(()=>{for(var r=0;r<this.meridians.length;r++)this.meridians[r].toViewportCanvas(e,t)}))}drawLayer(e,t,r){expect(e,'RenderClock'),expect(t,'Earth'),expect(r,'Layer'),super.drawLayer(e,(()=>{for(var i=0;i<this.meridians.length;i++)this.meridians[i].drawFeature(e,t,r)}))}discoverFeatures(e,t,r){for(var i=0;i<this.meridians.length;i++){var a=this.meridians[i];if(a.featureIsVisible(r)&&a.isPointerOnLine(e,t))return a}return null}}