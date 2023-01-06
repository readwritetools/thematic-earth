/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import expect from'../dev/expect.js';export default class TessAssignedValue{constructor(e,t,s,a,i,r,c){expect(e,['RangeRestrictedRule','Object']),expect(t,'String'),expect(s,'String'),expect(i,'String'),expect(a,['String','Number','Array']),expect(r,'Number'),expect(c,'Number'),this.minScale=e.minScale,this.maxScale=e.maxScale,this.minMaxScale=TessAssignedValue.formatMinMax(e),this.selector=t,this.tessGrammarName=s,this.value=a,this.filename=i,this.line=r,this.column=c,this.isEnabled=!0,Object.seal(this)}get selectorBase(){var e=this.selector.indexOf('[');return-1==e?this.selector:this.selector.substr(0,e)}get selectorQualifier(){var e=this.selector.indexOf('[');return-1==e?'':this.selector.substr(e)}static formatMinMax(e){return'min'==e.minScale&&'max'==e.maxScale?'':'min'==e.minScale?`to(${e.maxScale})`:'max'==e.maxScale?`from(${e.minScale})`:`from(${e.minScale}) to(${e.maxScale})`}}