/* Copyright (c) 2022 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import*as TessValidator from'../tess/tess-validator.js';import*as TessGrammar from'../tess/tess-grammar.js';import expect from'../dev/expect.js';import terminal from'../dev/terminal.js';class TessDeclarations extends Map{}export default class RangeRestrictedRule{constructor(e,t){this.minScale=e,this.maxScale=t,this.selectorDeclarations=new Map}createNewDeclarations(e){var t=new TessDeclarations;return this.selectorDeclarations.set(e,t),t}selectorExists(e){return this.selectorDeclarations.has(e)}getDeclarationsBySelector(e){return this.selectorDeclarations.get(e)}selectorDeclarationsToCanvasParams(e,t,r,a,s,i,l,o){var c=t,n='.'+r,h='#'+a,u=`["${i}"]`;if(this.assignPropertyValues(e,'feature',o),this.assignPropertyValues(e,c,o),''!=r&&this.assignPropertyValues(e,n,o),''!=r&&''!=i&&this.assignPropertyValues(e,n+u,o),null!=l)for(var f in l){var p=l[f];if(''!=r){var v=`${n}[${f}="${p}"]`;this.assignPropertyValues(e,v,o)}}if(''!=a&&this.assignPropertyValues(e,h,o),''!=a&&''!=i&&this.assignPropertyValues(e,h+u,o),null!=l)for(var f in l){p=l[f];if(''!=a){var d=`${h}[${f}="${p}"]`;this.assignPropertyValues(e,d,o)}}if(''!=i&&this.assignPropertyValues(e,u,o),s){var D='["selected"]';this.assignPropertyValues(e,c+D,o),this.assignPropertyValues(e,n+D,o),this.assignPropertyValues(e,h+D,o)}}overlayCanvasParams(e,t,r){var a='.'+t,s='#'+r;''!=t&&this.assignPropertyValues(e,a,0),''!=r&&this.assignPropertyValues(e,s,0)}assignPropertyValues(e,t,r){var a=this.selectorDeclarations.get(t);if(null!=a)for(let[t,l]of a.entries())if(0!=l.isEnabled){var s=l.value;if(Array.isArray(s))if('stroke-brush'==t||'fill-pattern'==t)e[t]=s;else if('fill-color'==t){var i=s[r%s.length];e[t]=i}else terminal.logic(`Unexpected array with ${t}: ${JSON.stringify(s)}`);else e[t]=s}}runCourtesyValidator(e,t,r,a,s,i){var l=e,o='.'+t,c='#'+r,n=`["${a}"]`;if(this.courtesyValidator('feature',e,t,r,a),this.courtesyValidator(l,e,t,r,a),''!=t&&this.courtesyValidator(o,e,t,r,a),''!=r&&this.courtesyValidator(c,e,t,r,a),''!=a&&this.courtesyValidator(n,e,t,r,a),''!=t&&''!=a&&this.courtesyValidator(o+n,e,t,r,a),''!=r&&''!=a&&this.courtesyValidator(c+n,e,t,r,a),null!=s)for(var h in s){var u=s[h];if(''!=t){var f=`${o}[${h}="${u}"]`;this.courtesyValidator(f,e,t,r,a)}if(''!=r){var p=`${c}[${h}="${u}"]`;this.courtesyValidator(p,e,t,r,a)}}}courtesyValidator(e,t,r,a,s){expect(t,'String');var i=this.selectorDeclarations.get(e);if(null!=i)for(let[r,a]of i.entries())1==TessValidator.checkPropertyName(e,t,r)&&TessValidator.checkPropertyValue(e,r,a.value)}getAllOverridesForFeature(e,t,r,a,s,i,l){expect(e,'Map');var o=t,c='.'+r,n='#'+a,h=`["${i}"]`;if(s){var u='["selected"]';this.getSelectorDeclarations(e,n+u),this.getSelectorDeclarations(e,c+u),this.getSelectorDeclarations(e,o+u)}if(''!=i&&this.getSelectorDeclarations(e,h),null!=l)for(var f in l){var p=l[f];if(''!=a){var v=`${n}[${f}="${p}"]`;this.getSelectorDeclarations(e,v)}}if(''!=a&&''!=i&&this.getSelectorDeclarations(e,n+h),''!=a&&this.getSelectorDeclarations(e,n),null!=l)for(var f in l){p=l[f];if(''!=r){var d=`${c}[${f}="${p}"]`;this.getSelectorDeclarations(e,d)}}''!=r&&''!=i&&this.getSelectorDeclarations(e,c+h),''!=r&&this.getSelectorDeclarations(e,c),this.getSelectorDeclarations(e,o),this.getSelectorDeclarations(e,'feature')}getSelectorDeclarations(e,t){expect(e,'Map');var r=this.selectorDeclarations.get(t);if(null!=r)for(let[t,s]of r.entries()){var a=[];e.has(t)?a=e.get(t):e.set(t,a),a.push(s)}}getAllRangeRestrictionsOfFeature(e,t,r,a,s,i){var l=e,o='.'+t,c='#'+r,n=`["${s}"]`;if(a){var h='["selected"]';if(this.hasSelectorDeclarations(c+h))return!0;if(this.hasSelectorDeclarations(o+h))return!0;if(this.hasSelectorDeclarations(l+h))return!0}if(''!=s&&this.hasSelectorDeclarations(n))return!0;if(null!=i)for(var u in i){var f=i[u];if(''!=r){var p=`${c}[${u}="${f}"]`;if(this.hasSelectorDeclarations(p))return!0}}if(''!=r&&''!=s&&this.hasSelectorDeclarations(c+n))return!0;if(''!=r&&this.hasSelectorDeclarations(c))return!0;if(null!=i)for(var u in i){f=i[u];if(''!=t){var v=`${o}[${u}="${f}"]`;if(this.hasSelectorDeclarations(v))return!0}}return!(''==t||''==s||!this.hasSelectorDeclarations(o+n))||(!(''==t||!this.hasSelectorDeclarations(o))||(!!this.hasSelectorDeclarations(l)||!!this.hasSelectorDeclarations('feature')))}hasSelectorDeclarations(e){return null!=this.selectorDeclarations.get(e)}getAllSelectorsOfFeature(e,t,r,a,s,i,l){expect(e,'Set');var o='feature',c=t,n='.'+r,h='#'+a,u=`["${i}"]`;if(s){var f='["selected"]';this.hasSelectorDeclarations(h)&&e.add(h+f),this.hasSelectorDeclarations(n)&&e.add(n+f),this.hasSelectorDeclarations(c)&&e.add(c)}if(''!=i&&this.hasSelectorDeclarations(u)&&e.add(u),null!=l)for(var p in l){var v=l[p];if(''!=a){var d=`${h}[${p}="${v}"]`;this.hasSelectorDeclarations(d)&&e.add(h)}}if(''!=a&&''!=i&&this.hasSelectorDeclarations(h+u)&&e.add(h),''!=a&&this.hasSelectorDeclarations(h)&&e.add(h),null!=l)for(var p in l){v=l[p];if(''!=r){var D=`${n}[${p}="${v}"]`;this.hasSelectorDeclarations(D)&&e.add(n)}}''!=r&&''!=i&&this.hasSelectorDeclarations(n+u)&&e.add(n),''!=r&&this.hasSelectorDeclarations(n)&&e.add(n),this.hasSelectorDeclarations(c)&&e.add(c),this.hasSelectorDeclarations(o)&&e.add(o)}exportTess(e,t,r,a,s){expect(e,'Number'),expect(t,'Array'),expect(r,'Boolean'),expect(a,'String'),expect(s,'Boolean');var i=!0,l=' '.repeat(4*e),o=1==r?l:'',c=[];for(let[h,u]of this.selectorDeclarations.entries()){var n=this.exportOneSelector(e+1,t,r,a,s,u);''!=n.trim()&&(1==i?i=!1:0==r&&c.push('\n'),c.push(`${l}${h} {`),c.push(n),c.push(`${o}}`))}return 1==r?c.join('\n'):c.join('')}exportOneSelector(e,t,r,a,s,i){expect(i,'TessDeclarations');var l=null;l='alphabetical'==a?this.sortAlphabetical(i):'category'==a?this.sortCategory(i):i;var o=' '.repeat(4*e),c=1==r?o:' ',n=[];for(let[e,r]of l.entries())0!=t.includes(r.filename)&&(1==r.isEnabled?n.push(`${c}${e}: ${r.value};`):1==s&&n.push(`${c}/* ${e}: ${r.value}; */`));return 1==r?n.join('\n'):n.join('')+' '}sortAlphabetical(e){expect(e,'TessDeclarations');var t=[...e];return t.sort(((e,t)=>e[0]<t[0]?-1:e[0]>t[0]?1:0)),new Map(t)}sortCategory(e){expect(e,'TessDeclarations');var t=[...e];return t.sort(((e,t)=>{let r=TessGrammar.displayOrder[e[0]],a=TessGrammar.displayOrder[t[0]];return r<a?-1:r>a?1:0})),new Map(t)}}