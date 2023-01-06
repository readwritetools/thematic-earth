/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import MenuConfig from'../menu/menu-config.js';import*as CB from'../menu/menu-callbacks.js';import*as MapScale from'../projection/map-scale.js';import expect from'../dev/expect.js';import terminal from'../dev/terminal.js';import'../../rwt-dockable-panels/rwt-dockable-panels.js';export default class Menu{constructor(e){this.thematicEarthElement=e,this.signal=this.thematicEarthElement.signal,this.rwtDockablePanels=null,this.hasPanels=!0,this.shortcutKey='F1',this.legendPanel=null,this.astronomyPanel=null,this.layersPanel=null,this.distancePanel=null,this.snapshotPanel=null,this.metadataPanel=null,this.signalsPanel=null,this.symbolSpecifierPanel=null,Object.seal(this)}async initialize(){this.initializeCSS(),this.instantiateComponent(),await this.rwtDockablePanels.waitOnLoading().then((async()=>{var e=this.thematicEarthElement.getAttribute('panels');if(e){await this.configureDockablePanels(e),this.rwtDockablePanels.setTitlebar(MenuConfig.toolbar.titlebar);var t='closed';this.thematicEarthElement.hasAttribute('menu-state')&&(t=this.thematicEarthElement.getAttribute('menu-state')),'open'==t?this.rwtDockablePanels.openToolbar():this.rwtDockablePanels.closeToolbar(),this.thematicEarthElement.hasAttribute('shortcut')&&(this.shortcutKey=this.thematicEarthElement.getAttribute('shortcut'),this.rwtDockablePanels.shortcutKey=this.shortcutKey),1==this.hasPanels&&(this.rwtDockablePanels.style.display='block')}else this.hasPanels=!1}))}hasPanel(e){return this.rwtDockablePanels.hasPanel(e)}initializeCSS(){var e=document.createElement('style');e.innerHTML='\n\t\trwt-dockable-panels {\n\t\t    --top:  3px;\n\t\t    --left: 3px;\n\t\t    --bottom:  3px;\n\t\t    --right: 3px;\n\t\t    --width: 270px;\n\t\t    --height: calc(100% - 10px);\n\t\t\t--pure-white: #fff;\n\t\t\t--surfie-green: #107187;\n\t\t\t--coral-atoll: #0E6073;\n\t\t\t--tiber: #093640;\n\t\t\t--eden: #0D4A56;\n\t\t\t--color: var(--menu-color, var(--pure-white));\n\t\t\t--border-color: var(--menu-border-color, var(--pure-white));\n\t\t\t--background-color1: var(--menu-background-color1, var(--surfie-green));\n\t\t\t--background-color2: var(--menu-background-color2, var(--coral-atoll));\n\t\t\t--background-color3: var(--menu-background-color3, var(--tiber));\n\t\t\t--background-color4: var(--menu-background-color4, var(--eden));\n\t\t}',this.thematicEarthElement.shadowRoot.appendChild(e)}instantiateComponent(){this.rwtDockablePanels=document.createElement('rwt-dockable-panels'),this.rwtDockablePanels.setAttribute('id','dockable-panels'),this.rwtDockablePanels.setAttribute('role','contentinfo'),this.rwtDockablePanels.setAttribute('state','closed'),this.rwtDockablePanels.setAttribute('embedded','embedded'),this.rwtDockablePanels.style.display='none';var e='top-right';this.thematicEarthElement.hasAttribute('menu-corner')&&(e=this.thematicEarthElement.getAttribute('menu-corner')),this.rwtDockablePanels.setAttribute('corner',e),this.thematicEarthElement.shadowRoot.appendChild(this.rwtDockablePanels)}async configureDockablePanels(e){expect(e,'String');var t=e.split(' ');if(t.includes('none'))this.hasPanels=!1;else for(let e=0;e<t.length;e++){var a=t[e];if(''!=a.trim())if(this.rwtDockablePanels.hasPanel(a))terminal.trace(`Panel '${a}' specified twice, skipping duplicate . . .`);else{var s=this.getPanelConfigById(a);null!=s?(s.options.tabIndex=103+3*e,this.rwtDockablePanels.appendPanel(a,s.options,s.panelLines),await this.panelSetup(a),this.hasPanels=!0):terminal.warning(`No panel configuration defined for '${a}'`)}}}async panelSetup(e){switch(expect(e,'String'),e){case'legend':var t=await import('../panels/legend-panel.class.js');this.legendPanel=new t.default(this.thematicEarthElement);break;case'season':case'time-of-day':case'equation-of-time':case'solar-events':case'geocentric-coords':case'topocentric-coords':if(null==this.astronomyPanel){var a=await import('../panels/astronomy-panel.class.js');this.astronomyPanel=new a.default(this.thematicEarthElement)}break;case'layers':var s=await import('../panels/layers-panel.class.js');this.layersPanel=new s.default(this.thematicEarthElement);break;case'distance':var n=await import('../panels/distance-panel.class.js');this.distancePanel=new n.default(this.thematicEarthElement);break;case'snapshot':var i=await import('../panels/snapshot-panel.class.js');this.snapshotPanel=new i.default(this.thematicEarthElement);break;case'metadata':var r=await import('../panels/metadata-panel.class.js');this.metadataPanel=new r.default(this.thematicEarthElement),await this.metadataPanel.fetchComponentVersion();break;case'symbol-specifier':var l=await import('../panels/symbol-specifier-panel.class.js');this.symbolSpecifierPanel=new l.default(this.thematicEarthElement),this.rwtDockablePanels.presetDetachedWidth('symbol-specifier','max(25vw, 300px)');break;case'signals':var o=await import('../panels/signals-panel.class.js');this.signalsPanel=new o.default(this.thematicEarthElement),this.rwtDockablePanels.presetDetachedWidth('signals','max(40vw, 300px)')}this.registerBroadcasters(e),this.registerReceivers(e)}getPanelConfigById(e){expect(e,'String');for(let t=0;t<MenuConfig.panels.length;t++)if(MenuConfig.panels[t].options.id==e)return MenuConfig.panels[t];return null}registerBroadcasters(e){switch(e){case'interaction':case'locate':case'discover':case'identify':case'select':return;case'legend':return void this.legendPanel.registerBroadcasters();case'season':case'time-of-day':case'equation-of-time':case'solar-events':case'geocentric-coords':case'topocentric-coords':return void this.astronomyPanel.registerBroadcasters(e);case'point-of-reference':return void this.pointOfReferencePanelBroadcasters();case'map-scale':return void this.mapScalePanelBroadcasters();case'space':return void this.spacePanelBroadcasters();case'canvas':return void this.canvasPanelBroadcasters();case'layers':return void this.layersPanel.registerBroadcasters();case'distance':return void this.distancePanel.registerBroadcasters();case'time-lapse':return void this.timeLapsePanelBroadcasters();case'snapshot':return void this.snapshotPanel.registerBroadcasters();case'metadata':return void this.metadataPanel.registerBroadcasters();case'symbol-specifier':return void this.symbolSpecifierPanel.registerBroadcasters();case'signals':return void this.signalsPanel.registerBroadcasters();default:terminal.logic(`unexpected panel '${e}' when registering broadcasters`)}}pointOfReferencePanelBroadcasters(){var e=this.rwtDockablePanels.shadowRoot.getElementById('named-longitude');e.addEventListener('change',(()=>{var t=e.value;this.signal.broadcast('menu/tangentLongitude',t)}));var t=this.rwtDockablePanels.shadowRoot.getElementById('longitude-pov');t.addEventListener('change',(()=>{var e=CB.fromUserLongitude(t.value);this.signal.broadcast('menu/tangentLongitude',e)}));var a=this.rwtDockablePanels.shadowRoot.getElementById('longitude-pov-slider');a.addEventListener('input',(()=>{var e=a.value;this.signal.broadcast('menu/tangentLongitude',e)}));var s=this.rwtDockablePanels.shadowRoot.getElementById('named-latitude');s.addEventListener('change',(()=>{var e=s.value;this.signal.broadcast('menu/tangentLatitude',e)}));var n=this.rwtDockablePanels.shadowRoot.getElementById('latitude-pov');n.addEventListener('change',(()=>{var e=CB.fromUserLatitude(n.value);this.signal.broadcast('menu/tangentLatitude',e)}));var i=this.rwtDockablePanels.shadowRoot.getElementById('latitude-pov-slider');i.addEventListener('input',(()=>{var e=i.value;this.signal.broadcast('menu/tangentLatitude',e)}))}mapScalePanelBroadcasters(){var e=this.rwtDockablePanels.shadowRoot.getElementById('meters-per-pixel');e.addEventListener('change',(()=>{this.signal.broadcast('menu/mapScale',e.value)})),this.rwtDockablePanels.shadowRoot.getElementById('meters-per-pixel-slider').addEventListener('input',(()=>{this.signal.broadcast('menu/mapScale',e.value)}))}spacePanelBroadcasters(){var e=this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-x');e.addEventListener('change',(()=>{this.signal.broadcast('menu/translationEastWest',e.value)}));var t=this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-x-slider');t.addEventListener('input',(()=>{this.signal.broadcast('menu/translationEastWest',t.value)}));var a=this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-y');a.addEventListener('change',(()=>{this.signal.broadcast('menu/translationNorthSouth',a.value)}));var s=this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-y-slider');s.addEventListener('input',(()=>{this.signal.broadcast('menu/translationNorthSouth',s.value)}))}canvasPanelBroadcasters(){var e=this.rwtDockablePanels.shadowRoot.getElementById('adjust-px-x');e.addEventListener('change',(()=>{this.signal.broadcast('menu/centerPointX',e.value)}));var t=this.rwtDockablePanels.shadowRoot.getElementById('adjust-px-x-slider');t.addEventListener('input',(()=>{this.signal.broadcast('menu/centerPointX',t.value)}));var a=this.rwtDockablePanels.shadowRoot.getElementById('adjust-px-y');a.addEventListener('change',(()=>{this.signal.broadcast('menu/centerPointY',a.value)}));var s=this.rwtDockablePanels.shadowRoot.getElementById('adjust-px-y-slider');s.addEventListener('input',(()=>{this.signal.broadcast('menu/centerPointY',s.value)}))}timeLapsePanelBroadcasters(){var e=this.rwtDockablePanels.shadowRoot.getElementById('rotation-time-lapse');e.addEventListener('change',(()=>{var t=e.value;this.signal.broadcast('menu/rotationTimeLapse',t)}));var t=this.rwtDockablePanels.shadowRoot.getElementById('rotation-increment');t.addEventListener('change',(()=>{var e=t.value;this.signal.broadcast('menu/rotationIncrement',e)}))}registerReceivers(e){switch(e){case'interaction':return;case'legend':return void this.legendPanel.registerReceivers();case'season':case'time-of-day':case'equation-of-time':case'solar-events':case'geocentric-coords':case'topocentric-coords':return void this.astronomyPanel.registerReceivers(e);case'point-of-reference':return void this.pointOfReferenceReceivers();case'map-scale':return void this.mapScaleReceivers();case'space':return void this.spaceReceivers();case'canvas':return void this.canvasReceivers();case'layers':return void this.layersPanel.registerReceivers();case'locate':return void this.locateReceivers();case'discover':return void this.discoverReceivers();case'identify':return void this.identifyReceivers();case'select':return void this.selectReceivers();case'distance':return void this.distancePanel.registerReceivers();case'time-lapse':return void this.timeLapseReceivers();case'snapshot':return void this.snapshotPanel.registerReceivers();case'metadata':return void this.metadataPanel.registerReceivers();case'symbol-specifier':return void this.symbolSpecifierPanel.registerReceivers();case'signals':return void this.signalsPanel.registerReceivers();default:terminal.logic(`unexpected panel '${e}' when registering receivers`)}}pointOfReferenceReceivers(){this.signal.listen('ortho/tangentLongitude',(e=>{this.rwtDockablePanels.shadowRoot.getElementById('longitude-pov').value=CB.toUserLongitude(e),this.rwtDockablePanels.shadowRoot.getElementById('longitude-pov-slider').value=CB.twoDigits(e),this.rwtDockablePanels.shadowRoot.getElementById('named-longitude').value=e})),this.signal.listen('ortho/tangentLatitude',(e=>{this.rwtDockablePanels.shadowRoot.getElementById('latitude-pov').value=CB.toUserLatitude(e),this.rwtDockablePanels.shadowRoot.getElementById('latitude-pov-slider').value=CB.twoDigits(e),this.rwtDockablePanels.shadowRoot.getElementById('named-latitude').value=e}))}mapScaleReceivers(){this.signal.listen('carte/mapScale',(e=>{var t=parseFloat(e);this.rwtDockablePanels.shadowRoot.getElementById('meters-per-pixel').value=t,this.rwtDockablePanels.shadowRoot.getElementById('meters-per-pixel-slider').value=MapScale.mapScaleToSlider(t);var a=this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-x-slider'),s=this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-y-slider'),n=this.thematicEarthElement.canvas.width,i=this.thematicEarthElement.canvas.height,r=this.thematicEarthElement.earth.getVisualizedRadius(),l=Math.round(t*(n+r)/2),o=Math.round(t*(i+r)/2),c=Math.round(2*l/100),d=Math.round(2*o/100);null!=a&&null!=s&&(a.setAttribute('min',-1*l),a.setAttribute('max',l),a.setAttribute('step',c),s.setAttribute('min',-1*o),s.setAttribute('max',o),s.setAttribute('step',d))}))}spaceReceivers(){this.signal.listen('carte/translationEastWest',(e=>{var t=parseInt(e);this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-x').value=t,this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-x-slider').value=t})),this.signal.listen('carte/translationNorthSouth',(e=>{var t=parseInt(e);this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-y').value=t,this.rwtDockablePanels.shadowRoot.getElementById('adjust-km-y-slider').value=t}))}canvasReceivers(){this.signal.listen('viewport/centerPointX',(e=>{var t=parseInt(e);this.rwtDockablePanels.shadowRoot.getElementById('adjust-px-x').value=t,this.rwtDockablePanels.shadowRoot.getElementById('adjust-px-x-slider').value=t})),this.signal.listen('viewport/centerPointY',(e=>{var t=parseInt(e);this.rwtDockablePanels.shadowRoot.getElementById('adjust-px-y').value=t,this.rwtDockablePanels.shadowRoot.getElementById('adjust-px-y-slider').value=t}))}locateReceivers(){this.signal.listen('user/latitudeLongitude',(e=>{var t=e;if(null==t.longitude||null==t.latitude||1!=t.isOnEarth)this.rwtDockablePanels.shadowRoot.getElementById('locate-position').innerHTML='';else{var a=Math.abs(t.longitude.toFixed(2)),s=t.longitude<0?a+'° W':a+'° E',n=Math.abs(t.latitude.toFixed(2)),i=`longitude: ${s}<br />latitude: ${t.latitude<0?n+'° S':n+'° N'}`;this.rwtDockablePanels.shadowRoot.getElementById('locate-position').innerHTML=i}}))}discoverReceivers(){this.signal.listen('user/discoveredFeatures',(e=>{var t=e,a=this.rwtDockablePanels.shadowRoot.getElementById('discover-table');if(t.length>0){var s=[];s.push('<tr><th class=\'chef-center\'>Feature</th><th class=\'chef-center\'>Value</th></tr>');for(let e of t)s.push(e.identifyHTML);a.innerHTML=s.join('')}else a.innerHTML='<tr><th class=\'chef-center\'>Hover pointer —➤ Discover features at pointer position</th></tr>'}))}identifyReceivers(){this.signal.listen('user/identifiedFeatures',(e=>{var t=e,a=[];for(let e of t){a.push(`<tr><th class='chef-h3' colspan=2>${e.layerName}</th></tr>`);for(let t in e.featureData){let s=e.featureData[t];if(s&&'Array'==s.constructor.name)for(let e=0;e<s.length;e++)a.push(`<tr><td>${t}[${e}]</td><td>${s[e]}</td></tr>`);else a.push(`<tr><td>${t}</td><td>${s}</td></tr>`)}}this.rwtDockablePanels.shadowRoot.getElementById('identify-table').innerHTML=a.join(''),t.length>0&&(this.rwtDockablePanels.toolbar.isExpanded||this.rwtDockablePanels.detachPanel('identify'),this.rwtDockablePanels.expandPanel('identify'))}))}selectReceivers(){this.signal.listen('user/selectedFeatures',(e=>{var t=this.rwtDockablePanels.shadowRoot.querySelector('#select-table tbody'),a=!1,s=e;for(let e of s){var n=e.featureId;if(1==t.children.length)'TR'==(r=t.children[0]).tagName&&r.hasAttribute('data-instructions')&&(r.remove(),t.innerHTML='<tr><th>Layer</th><th>Feature</th><th>Reorient</th></tr>');var i=!1;for(let e=0;e<t.children.length;e++){if('TR'==(r=t.children[e]).tagName&&r.hasAttribute('data-feature-id')&&r.getAttribute('data-feature-id')==n){i=!0,r.remove();break}}if(0==i){var r;(r=document.createElement('tr')).setAttribute('data-feature-id',n);var l=`reorient to ${CB.toUserLatitude(e.latitude)}, ${CB.toUserLongitude(e.longitude)}`,o=''!=e.featureName?e.featureName:e.featureValue;r.innerHTML=`<td class='chef-center'>${e.layerName}</td><td class='chef-center'>${o}</td><td class='chef-center'><kbd class='chef-kbd' tabindex=0 id=feature-${n} title='${l}'>▶</kbd></td>`,t.append(r),this.rwtDockablePanels.shadowRoot.getElementById(`feature-${n}`).addEventListener('click',(t=>{this.thematicEarthElement.setTangentLatitude(e.latitude),this.thematicEarthElement.setTangentLongitude(e.longitude)})),a=!0}}1==t.children.length&&(t.innerHTML='<tr data-instructions=true><th class=\'chef-center\'>&lt;Ctrl&gt; \'n Click —➤ Highlight underlying features</th></tr>'),1==a&&(this.rwtDockablePanels.toolbar.isExpanded||this.rwtDockablePanels.detachPanel('select'),this.rwtDockablePanels.expandPanel('select'))}))}timeLapseReceivers(){this.signal.listen('animation/animateLongitude',(e=>{this.rwtDockablePanels.shadowRoot.getElementById('rotation-time-lapse').value=e.rotationTimeLapse,this.rwtDockablePanels.shadowRoot.getElementById('rotation-increment').value=e.rotationIncrement}))}}