/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import Earth from'./joe/earth.class.js';import Menu from'./joe/menu/menu.class.js';import UserInterface from'./joe/interaction/user-interface.class.js';import Signal from'./joe/events/signal.class.js';import PackageHandler from'./joe/packages/package-handler.class.js';import Layer from'./joe/layers/layer.class.js';import Animation from'./joe/render/animation.class.js';import expect from'./joe/dev/expect.js';import terminal from'./joe/dev/terminal.js';const Static={componentName:'thematic-earth',elementInstance:1,componentPath:'/',tessURL:'joe/tess/thematic-earth.tess',zOrder:1};Object.seal(Static);export default class ThematicEarthElement extends HTMLElement{constructor(){super(),this.instance=Static.elementInstance++,this.isComponentLoaded=!1,this.canvas=null,this.menu=null,this.earth=null,this.userInterface=null,this.signal=null,this.packageHandler=null,this.explicitMapScale=!1,this.explicitCenterPoint=!1,this.resizeObserver=null,Object.seal(this)}async connectedCallback(){if(this.isConnected)try{this.determineComponentPath(),this.attachShadow({mode:'open'}),this.createSignal(),this.createCanvas(),this.createEarth(),await this.addDockablePanels(),this.createUserInterface(),this.registerMenuListeners(),this.registerUserListeners(),this.registerVisualizationListeners(),this.registerEarthPositionListeners(),this.registerResizeListener(),this.resizeCanvas(),this.setupAnimations(),this.addTessFile(`${Static.componentPath}${Static.tessURL}`),this.initializeEarthValues(),await this.setupPackageHandler(),this.sendComponentLoaded(),this.reflectValues(),this.validate()}catch(e){terminal.caught(e)}}determineComponentPath(){Static.componentPath=new URL(import.meta.url).pathname;var e=Static.componentPath.lastIndexOf('/');-1!=e&&(Static.componentPath=Static.componentPath.substr(0,e+1))}createSignal(){this.signal=new Signal(this)}createCanvas(){this.canvas=document.createElement('canvas'),this.canvas.style.position='absolute',this.canvas.style.touchAction='none',this.canvas.width=100,this.canvas.height=100,this.canvas.tabIndex=0,this.shadowRoot.appendChild(this.canvas),this.canvas.getContext('2d',{desynchronized:!0,alpha:!0})}createEarth(){this.earth=new Earth(this)}createUserInterface(){this.userInterface=new UserInterface(this)}async fetchComponentVersion(){try{var e=await fetch(`${Static.componentPath}package.json`,{method:'GET',cache:'no-cache',headers:{'content-type':'application/json'}});if(200==e.status){var t=await e.json();return'version'in t?t.version:'no version available'}}catch(e){return terminal.caught(e),'unable to get version'}}runCourtesyValidator(){'BackCompat'==document.compatMode&&terminal.error('This doocument is in the now obsolete Quirks Mode. Consider adding "<!DOCTYPE html>" as the first line in the document to activate standards mode.'),this.signal.broadcast('api/runCourtesyValidator',null)}async addDockablePanels(){this.style.position='relative',this.menu=new Menu(this),await this.menu.initialize()}registerResizeListener(){this.resizeObserver=new ResizeObserver(this.resizeCanvas.bind(this)),this.resizeObserver.observe(this)}initializeEarthValues(){var e=new Date;this.earth.earthPosition.changeUTC(e);var t=e.getTimezoneOffset()/60*-1;this.earth.changeTimezoneOffset(t);var a=this.getAttribute('geolocation')??'off',i=!1;if('on'==a&&(i=this.setInitialGeolocation(a)),'off'!=a&&0!=i||(this.earth.setTangentLongitude(0),this.earth.setTangentLatitude(0)),'timezone'==a){var s=15*t;this.earth.setTangentLongitude(s),this.earth.setTangentLatitude(0)}this.setPlaceOfInterest(this.earth.getTangentLongitude(),this.earth.getTangentLatitude()),this.earth.recalculateLongitudeDependants(),this.earth.recalculateLatitudeDependants()}setInitialGeolocation(e){expect(e,'String');var t=!1;return'on'==e&&geolocation in navigator&&navigator.geolocation.getCurrentPosition((e=>{this.earth.setTangentLongitude(e.coords.longitude),this.earth.setTangentLatitude(e.coords.latitude),t=!0}),(e=>{t=!1})),t}async setupPackageHandler(){this.packageHandler=new PackageHandler(this);var e=this.getAttribute('package');null!=e&&''!=e&&await this.addPackage(e)}sendComponentLoaded(){this.isComponentLoaded=!0,this.dispatchEvent(new Event('component/loaded',{bubbles:!0}))}waitOnLoading(){return new Promise((e=>{1==this.isComponentLoaded?e():this.addEventListener('component/loaded',e)}))}reflectValues(){this.earth.reflectValues(this.menu)}resizeCanvas(){if(this.canvas.width=this.offsetWidth,this.canvas.height=this.offsetHeight,this.earth.viewport.syncCanvasDimensions(this.canvas.width,this.canvas.height),this.signal.broadcast('canvas/resized',{width:this.canvas.width,height:this.canvas.height}),0==this.explicitCenterPoint){var e=Math.round(this.canvas.width/2),t=Math.round(this.canvas.height/2);this.earth.setCenterPoint({x:e,y:t})}if(0==this.explicitMapScale){var a=Math.min(this.canvas.width,this.canvas.height)/2-10,i=this.menu.rwtDockablePanels.shadowRoot.getElementById('adjust-px-x-slider'),s=this.menu.rwtDockablePanels.shadowRoot.getElementById('adjust-px-y-slider');null!=i&&null!=s&&(i.setAttribute('min',(-1*a).toFixed(0)),i.setAttribute('max',(this.canvas.width+a).toFixed(0)),i.value=e,s.setAttribute('min',(-1*a).toFixed(0)),s.setAttribute('max',(this.canvas.height+a).toFixed(0)),s.value=t),this.earth.setMapScale(this.earth.getEarthRadius()/a)}this.invalidateCanvas()}invalidateCanvas(){null!=this.earth&&this.earth.invalidateCanvas()}setMenuTitlebar(e){this.menu.rwtDockablePanels.setTitlebar(e)}addMapCitation(e){this.menu.hasPanel('metadata')&&this.menu.metadataPanel.addMapCitation(e)}addMetadata(e){this.menu.hasPanel('metadata')&&this.menu.metadataPanel.addMetadata(e)}hideSoftwareVersion(){this.menu.hasPanel('metadata')&&this.menu.metadataPanel.hideSoftwareVersion()}hideSoftwareLicense(){this.menu.hasPanel('metadata')&&this.menu.metadataPanel.hideSoftwareLicense()}async addMapItem(e){expect(e,'Object');var t=null,a=null;if(null==e)return{spatialDataId:t,layerId:a};e.zOrder=e.zOrder??Static.zOrder++;var i=e.data??e,s=e.layer??e,n=e.legend??e;return null==(t=await this.addSpatialData(i))||(s.tessClassname=s.tessClassname??this.getDefaultClassname(i.spatialDataType),a=this.addLayer(t,s),null!=n.legendSymbol&&(n.layerId=a,this.addLegend(n))),{spatialDataId:t,layerId:a}}getDefaultClassname(e){switch(expect(e,'String'),e){case'space':case'sphere':case'night':case'crosshairs':case'graticule':case'named-meridians':case'named-parallels':case'great-circles':case'place-of-interest':return e;case'topojson':case'gcs':return'';default:return terminal.abnormal(`Unrecognized spatialDataType ${e}`),''}}async addSpatialData(e){if(expect(e,'Object'),!e||!e.spatialDataType)return terminal.warning('missing spatialDataType in call to addSpatialData'),null;var t=null;switch(e.spatialDataType){case'space':var a=await import('./joe/catalog/space.class.js');t=this.addBuiltinObject(new a.default(this));break;case'sphere':var i=await import('./joe/catalog/sphere.class.js');t=this.addBuiltinObject(new i.default(this));break;case'night':var s=await import('./joe/catalog/night.class.js');t=this.addBuiltinObject(new s.default(this));break;case'crosshairs':var n=null==e.parallelFrequency?10:e.parallelFrequency,r=null==e.meridianFrequency?10:e.meridianFrequency,l=await import('./joe/catalog/crosshairs.class.js');t=this.addBuiltinObject(new l.default(this,n,r));break;case'graticule':n=null==e.parallelFrequency?10:e.parallelFrequency,r=null==e.meridianFrequency?10:e.meridianFrequency;var h=null!=e.drawToPoles&&e.drawToPoles,o=await import('./joe/catalog/graticule.class.js');t=this.addBuiltinObject(new o.default(this,n,r,h));break;case'named-meridians':var c=e.namedMeridians??{},d=e.frequency??1,u=await import('./joe/catalog/named-meridians.class.js');t=this.addBuiltinObject(new u.default(this,c,d));break;case'named-parallels':var m=e.namedParallels??{},p=(d=e.frequency??1,await import('./joe/catalog/named-parallels.class.js'));t=this.addBuiltinObject(new p.default(this,m,d));break;case'great-circles':var g=e.routes??[],v=await import('./joe/catalog/great-circles.class.js');t=this.addBuiltinObject(new v.default(this,g));break;case'place-of-interest':var f=await import('./joe/catalog/place-of-interest.class.js');t=this.addBuiltinObject(new f.default(this));break;case'topojson':var w=new((await import('./joe/catalog/topojson-spatial-file.class.js')).default)(this);t=await this.retreiveSpatialDataFile(w,e);break;case'gcs':var y=new((await import('./joe/catalog/gcs-spatial-file.class.js')).default)(this);t=await this.retreiveSpatialDataFile(y,e);break;default:terminal.warning(`Unrecognized spatialDataType ${e.spatialDataType}`)}return t}addBuiltinObject(e){expect(e,['Space','Sphere','Night','Crosshairs','Graticule','NamedMeridians','NamedParallels','GreatCircles','PlaceOfInterest','TopojsonSpatialFile','GcsSpatialFile']);var t=this.earth.addSpatialData(e);return this.invalidateCanvas(),t}async retreiveSpatialDataFile(e,t){expect(e,['TopojsonSpatialFile','GcsSpatialFile']),expect(t,'Object');var a=t.url??'',i=this.earth.addSpatialData(e);return await e.retrieveData('replace',a,t),this.invalidateCanvas(),i}addLayer(e,t){if(expect(e,['Number','null']),expect(t,'Object'),null!=e){if(null!=this.earth.getSpatialFile(e)){var a=t.zOrder??Static.zOrder++,i=t.layerName??'',s=t.tessIdentifier??'',n=t.tessClassname??'',r=t.featureKey??'',l=t.identifiable??'disallow',h=t.identifyCallback??null,o=t.selectable??'disallow',c=t.wantsLabels??'disallow',d=new Layer(this,e,a,i,s,n,r,l,h,o,c);return this.earth.addLayer(d)}terminal.warning(`Can't add the layer named "${t.layerName}" because the spatialDataId ${e} to be associated with it hasn't been defined`)}else terminal.warning(`Can't add the layer named "${t.layerName}" because no spatialDataId has been provided`)}addLegend(e){expect(e,'Object'),e.zOrder=e.zOrder??Static.zOrder++,this.signal.broadcast('api/addLegendItem',e)}async addTessFile(e){return expect(e,'String'),await this.earth.addTessFile(e)}addTessDeclarations(e,t){expect(e,'String'),expect(t,'String'),this.earth.addTessDeclarations(e,t)}getSpatialFile(e){return expect(e,'Number'),this.earth.getSpatialFile(e)}getLayer(e){return expect(e,'Number'),this.earth.getLayer(e)}getLegend(e){expect(e,'String');var t=this.menu.legendPanel;if(expect(t,['LegendPanel','null']),null==t)return null;for(let a of t.legendCanvas.slices.values())if(a.legendText==e)return a;return null}async addPackage(e){expect(e,'String'),await this.packageHandler.retrieveData(e)}setTangentLongitude(e){this.earth.setTangentLongitude(e)}setTangentLatitude(e){this.earth.setTangentLatitude(e)}setTranslationEastWest(e){this.earth.setTranslationEastWest(e)}setTranslationNorthSouth(e){this.earth.setTranslationNorthSouth(e)}setMapScale(e){this.earth.setMapScale(e),this.explicitMapScale=!0}setCenterPoint(e){this.earth.setCenterPoint(e)}setCenterPointX(e){this.earth.setCenterPointX(e)}setCenterPointY(e){this.earth.setCenterPointY(e)}changeTimezoneOffset(e){this.earth.changeTimezoneOffset(e)}setPlaceOfInterest(e,t){this.earth.setPlaceOfInterest(e,t)}animateLongitude(e,t){var a=this.earth.renderLoop.getAnimationByName('time-lapse-animation');a.setTimeLapse(e),a.setIncrement(t),this.signal.broadcast('animation/animateLongitude',{rotationTimeLapse:e,rotationIncrement:t})}registerMenuListeners(){this.signal.listen('menu/seasonDayMonthYearUTC',(e=>{var t=e;this.earth.changeDayMonthYear(t),this.earth.recalculateJulianDateDependants()})),this.signal.listen('menu/seasonSpecialDay',(e=>{this.earth.changeSpecialDay(e),this.earth.recalculateJulianDateDependants()})),this.signal.listen('menu/seasonDayOfYear',(e=>{this.earth.changeDayOfYear(e),this.earth.recalculateJulianDateDependants()})),this.signal.listen('menu/timeOfDayHMS',(e=>{this.earth.changeTimeOfDayHMS(e),this.earth.recalculateJulianDateDependants()})),this.signal.listen('menu/timezoneOffset',(e=>{this.earth.changeTimezoneOffset(e),this.earth.recalculateTimezoneDependants()})),this.signal.listen('menu/tangentLongitude',(e=>{this.earth.setTangentLongitude(e),this.earth.recalculateLongitudeDependants()})),this.signal.listen('menu/tangentLatitude',(e=>{this.earth.setTangentLatitude(e),this.earth.recalculateLatitudeDependants()})),this.signal.listen('menu/rotationTimeLapse',(e=>{var t=e;this.earth.renderLoop.getAnimationByName('time-lapse-animation').setTimeLapse(t)})),this.signal.listen('menu/rotationIncrement',(e=>{var t=e;this.earth.renderLoop.getAnimationByName('time-lapse-animation').setIncrement(t)})),this.signal.listen('menu/mapScale',(e=>{this.earth.setMapScale(e),this.explicitMapScale=!0})),this.signal.listen('menu/translationEastWest',(e=>{this.earth.setTranslationEastWest(e)})),this.signal.listen('menu/translationNorthSouth',(e=>{this.earth.setTranslationNorthSouth(e)})),this.signal.listen('menu/centerPointX',(e=>{this.earth.setCenterPointX(e),this.explicitCenterPoint=!0})),this.signal.listen('menu/centerPointY',(e=>{this.earth.setCenterPointY(e),this.explicitCenterPoint=!0}))}registerUserListeners(){this.signal.listen('user/changeCanvasCoords',(e=>{var t=e;this.earth.changeCanvasCoords(t.x,t.y)})),this.signal.listen('user/requestFeatureIdentification',(e=>{var t=e;this.earth.requestFeatureIdentification(t.x,t.y)})),this.signal.listen('user/requestFeatureSelection',(e=>{var t=e;this.earth.requestFeatureSelection(t.x,t.y)})),this.signal.listen('user/requestSymbolSpecifier',(e=>{var t=e;this.earth.requestSymbolSpecifier(t.x,t.y)})),this.signal.listen('user/setPointA',(e=>{var t=e;this.earth.setPointA(t.x,t.y)})),this.signal.listen('user/setPointB',(e=>{var t=e;this.earth.setPointB(t.x,t.y)})),this.signal.listen('user/changePlaceOfInterest',(e=>{var t=e;this.earth.changePlaceOfInterest(t.x,t.y),this.earth.recalculatePlaceOfInterestDependants()}))}registerVisualizationListeners(){this.signal.listen('visualization/tessRulesAdded',(e=>{this.earth.visual.allFeaturesNeedRestyling=!0,this.invalidateCanvas()})),this.signal.listen('visualization/requestValidation',(e=>{setTimeout((()=>{this.runCourtesyValidator()}),2e3)}))}registerEarthPositionListeners(){this.signal.listen('earthPosition/declination',(e=>{this.earth.reflectDeclination(e),this.earth.recalculateDeclinationDependants()}))}setupAnimations(){var e=this.earth.getTangentLongitude.bind(this.earth),t=this.earth.setTangentLongitude.bind(this.earth),a=new Animation('time-lapse-animation',this.earth,e,t,{deltaPerSecond:0,maxThreshold:180,minThreshold:-180,thresholdWrap:!0});this.earth.renderLoop.addAnimation(a)}async validate(){if(1==this.instance){var e=(n=window.location.hostname).split('.'),t=25;if(e.length>=2){var a=e[e.length-2].charAt(0);(a<'a'||a>'z')&&(a='q'),t=a.charCodeAt(a)-97,t=Math.max(t,0),t=Math.min(t,25)}var i=new Date;i.setUTCMonth(0,1);var s=(Math.floor((Date.now()-i)/864e5)+1)%26,n=window.location.hostname,r=`Unregistered ${Static.componentName} component.`;try{var l=(await import('../../rwt-registration-keys.js')).default;for(let e=0;e<l.length;e++){var h=l[e];if(h.hasOwnProperty('product-key')&&h['product-key']==Static.componentName)return n!=h.registration&&terminal.warning(`${r} See https://readwritetools.com/licensing.blue to learn more.`),void(s==t&&window.setTimeout(this.authenticate.bind(this,h),1e3))}terminal.warning(`${r} rwt-registration-key.js file missing "product-key": "${Static.componentName}"`)}catch(e){terminal.warning(`${r} rwt-registration-key.js missing from website's root directory.`)}}}async authenticate(e){var t=encodeURIComponent(window.location.hostname),a=encodeURIComponent(window.location.href),i=encodeURIComponent(e.registration),s=encodeURIComponent(e['customer-number']),n=encodeURIComponent(e['access-key']),r={method:'POST',mode:'cors',credentials:'omit',cache:'no-cache',headers:{'content-type':'application/x-www-form-urlencoded'},body:`product-name=${Static.componentName}&hostname=${t}&href=${a}&registration=${i}&customer-number=${s}&access-key=${n}`};try{var l=await fetch('https://validation.readwritetools.com/v1/genuine/component',r);if(200==l.status)await l.json()}catch(e){terminal.caught(e)}}}window.customElements.define(Static.componentName,ThematicEarthElement);