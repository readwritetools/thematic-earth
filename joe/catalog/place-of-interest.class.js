/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import BaseSpatialFile from'../catalog/base-spatial-file.class.js';import PointFeature from'../features/point-feature.class.js';import expect from'../dev/expect.js';export default class PlaceOfInterest extends BaseSpatialFile{constructor(e,t,i,a,r){super(e,t,i,a,r),this.pointFeature=new PointFeature,this.pointFeature.featureName='place-of-interest',this.addFeatureToLookupMap(this.pointFeature),this.registerEventListeners(),this.localPointsNeedGeoCoords=!0,this.localPointsNeedProjection=!0,this.localPointsNeedTransformation=!0,this.localPointsNeedPlacement=!0,this.thematicEarthElement.signal.broadcast('catalog/spatialFileAdded',{spatialFileType:'place-of-interest'}),Object.seal(this)}registerEventListeners(){this.thematicEarthElement.signal.listen('earthPosition/placeOfInterest',(e=>{var t=e;this.pointFeature.discretePoint.setLatitude(t.latitude),this.pointFeature.discretePoint.setLongitude(t.longitude),this.localPointsNeedProjection=!0,this.localPointsNeedTransformation=!0,this.localPointsNeedPlacement=!0,this.thematicEarthElement.invalidateCanvas()}))}recomputeStyles(e,t,i,a){expect(e,'RenderClock'),expect(t,'Visualizer'),expect(i,'Layer'),expect(a,'Number'),super.recomputeStyles(e,t,i,(()=>{this.pointFeature.computeFeatureStyle(e,t,i.tessClassname,i.tessIdentifier,0,a)}))}runCourtesyValidator(e,t,i){expect(e,'Visualizer'),expect(t,'Layer'),expect(i,'Number'),super.runCourtesyValidator((()=>{this.pointFeature.runCourtesyValidator(e,t.tessClassname,t.tessIdentifier,0,i)}))}rotation(e,t){expect(e,'RenderClock'),expect(t,'GeocentricCoordinates'),super.rotation(e,t,(()=>{this.pointFeature.toGeoCoords(e,t)}))}projection(e,t){expect(e,'RenderClock'),expect(t,'OrthographicProjection'),super.projection(e,t,(()=>{this.pointFeature.toPlane(e,t)}))}transformation(e,t){expect(e,'RenderClock'),expect(t,'CartesianTransformation'),super.transformation(e,t,(()=>{this.pointFeature.toPixels(e,t)}))}placement(e,t){expect(e,'RenderClock'),expect(t,'Viewport'),super.placement(e,t,(()=>{this.pointFeature.toViewportCanvas(e,t)}))}drawLayer(e,t,i){expect(e,'RenderClock'),expect(t,'Earth'),expect(i,'Layer'),super.drawLayer(e,(()=>{this.pointFeature.drawFeature(e,t,i)}))}discoverFeatures(e,t,i){return this.pointFeature.featureIsVisible(i)&&this.pointFeature.isPointerAtPoint(e,t)?this.pointFeature:null}}