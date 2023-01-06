/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import*as TessValidator from'../tess/tess-validator.js';import*as TessGrammar from'../tess/tess-grammar.js';import TessAssignedValue from'../tess/tess-assigned-value.class.js';import expect from'../dev/expect.js';export default class SymbolSpecifiers{constructor(e){this.visual=e,this.symbolOverrides=new Map,this.mruFeature=null,this.mruLayer=null,this.mruGrammarName=null}getAllOverridesForFeature(e,a){expect(e,['GeneralFeature','GreatCircleFeature','HemisphereFeature','LabelFeature','LineFeature','PointFeature','PolygonFeature']),expect(a,'Layer');var r=new Map;this.visual.getAllOverridesForFeature(r,e,a),this.appendReadOnlyValues(r,e,a);var s=[...r];return s.sort(((e,a)=>{let r=TessGrammar.displayOrder[e[0]],s=TessGrammar.displayOrder[a[0]];return r<s?-1:r>s?1:0})),this.symbolOverrides=new Map(s),this.mruFeature=e,this.mruLayer=a,this.symbolOverrides}appendReadOnlyValues(e,a,r){var s=a.getCanvasParamsPerLayerId(r.layerId);this.oneReadOnlyValue('scale-labels-coefficient',e,s),this.oneReadOnlyValue('scale-strokes-coefficient',e,s),this.oneReadOnlyValue('scale-symbols-coefficient',e,s),this.oneReadOnlyValue('display-labels-threshold',e,s),this.oneReadOnlyValue('display-strokes-threshold',e,s),this.oneReadOnlyValue('display-symbols-threshold',e,s)}oneReadOnlyValue(e,a,r){expect(e,'String'),expect(a,'Map'),expect(r,'CanvasParams');var s=r[e],t=new TessAssignedValue({minScale:'min',maxScale:'max'},'feature',e,s,'(calculated)',0,0),l=[];l.push(t),a.set(e,l)}getAllRangeRestrictionsOfFeature(e,a){return expect(e,['GeneralFeature','GreatCircleFeature','HemisphereFeature','LabelFeature','LineFeature','PointFeature','PolygonFeature']),expect(a,'Layer'),this.visual.getAllRangeRestrictionsOfFeature(e,a)}getAllSelectorsOfFeature(e,a){return expect(e,['GeneralFeature','GreatCircleFeature','HemisphereFeature','LabelFeature','LineFeature','PointFeature','PolygonFeature']),expect(a,'Layer'),this.visual.getAllSelectorsOfFeature(e,a)}}