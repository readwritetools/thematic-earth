/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import TessDefaults from'../tess/tess-defaults.js';import*as TessValidator from'../tess/tess-validator.js';import expect from'../dev/expect.js';export default class CanvasParams{constructor(){}isVisible(){return'hidden'!=this.visibility}getTransparency(){let s=this.safeNumber('transparency');return s>1&&(s=1),s<0&&(s=0),s}determineAllScalingCoefficients(s){expect(s,'Number');var t=this.safeNumber('map-basis'),e=this.safeNumberWithFallback('map-labels-low'),r=this.safeNumberWithFallback('map-labels-high');this['scale-labels-coefficient']=this.determineOneScalingCoefficient(s,t,e,r),e=this.safeNumberWithFallback('map-strokes-low'),r=this.safeNumberWithFallback('map-strokes-high'),this['scale-strokes-coefficient']=this.determineOneScalingCoefficient(s,t,e,r),e=this.safeNumberWithFallback('map-symbols-low'),r=this.safeNumberWithFallback('map-symbols-high'),this['scale-symbols-coefficient']=this.determineOneScalingCoefficient(s,t,e,r)}determineOneScalingCoefficient(s,t,e,r){var h=t/Math.min(Math.max(s,e),r);isNaN(h)&&(h=1);var a=h.toFixed(3);return Number(a)}scaleLabelsCoefficient(){return this.safeNumber('scale-labels-coefficient')}scaleStrokesCoefficient(){return this.safeNumber('scale-strokes-coefficient')}scaleSymbolsCoefficient(){return this.safeNumber('scale-symbols-coefficient')}determineAllDisplayThresholds(s){expect(s,'Number');var t=this.safeNumberWithFallback('map-labels-begin'),e=this.safeNumberWithFallback('map-labels-end');this['display-labels-threshold']=this.determineOneDisplayThreshold(s,t,e),t=this.safeNumberWithFallback('map-strokes-begin'),e=this.safeNumberWithFallback('map-strokes-end'),this['display-strokes-threshold']=this.determineOneDisplayThreshold(s,t,e),t=this.safeNumberWithFallback('map-symbols-begin'),e=this.safeNumberWithFallback('map-symbols-end'),this['display-symbols-threshold']=this.determineOneDisplayThreshold(s,t,e)}determineOneDisplayThreshold(s,t,e){return s<t?'below':s<=e?'between':'above'}displayLabels(){return'between'==this.safeDisplayThreshold('display-labels-threshold')}displayStrokes(){return'between'==this.safeDisplayThreshold('display-strokes-threshold')}displaySymbols(){return'between'==this.safeDisplayThreshold('display-symbols-threshold')}symbolHasStroke(){return this.safeNumber('symbol-stroke-width')>0}hasStroke(){return this.safeNumber('stroke-width')>0}hasOverStroke(){return this.safeNumber('over-stroke-width')>0}hasBrushSymbolStroke(){return this.safeNumber('sb-symbol-stroke-width')>0}hasBrushHatchStroke(){return this.safeNumber('sb-hatch-stroke-width')>0}hasBrushCrosshatchStroke(){return this.safeNumber('sb-crosshatch-stroke-width')>0}hasPatternSymbolStroke(){return this.safeNumber('fp-symbol-stroke-width')>0}hasPatternHatchStroke(){return this.safeNumber('fp-hatch-stroke-width')>0}hasPatternCrosshatchStroke(){return this.safeNumber('fp-crosshatch-stroke-width')>0}hasLabelStroke(){return this.safeNumber('label-stroke-width')>0}symbolHasStrokeColor(){return'none'!=this.safeString('symbol-stroke-color')}symbolHasFillColor(){return'none'!=this.safeString('symbol-fill-color')}hasStrokeColor(){return'none'!=this.safeString('stroke-color')}hasOverStrokeColor(){return'none'!=this.safeString('over-stroke-color')}hasBrushSymbolStrokeColor(){return'none'!=this.safeString('sb-symbol-stroke-color')}hasBrushSymbolFillColor(){return'none'!=this.safeString('sb-symbol-fill-color')}hasBrushHatchStrokeColor(){return'none'!=this.safeString('sb-hatch-stroke-color')}hasBrushCrosshatchStrokeColor(){return'none'!=this.safeString('sb-crosshatch-stroke-color')}hasFillColor(){return'none'!=this.safeString('fill-color')}hasPatternSymbolStrokeColor(){return'none'!=this.safeString('fp-symbol-stroke-color')}hasPatternSymbolFillColor(){return'none'!=this.safeString('fp-symbol-fill-color')}hasPatternHatchStrokeColor(){return'none'!=this.safeString('fp-hatch-stroke-color')}hasPatternCrosshatchStrokeColor(){return'none'!=this.safeString('fp-crosshatch-stroke-color')}hasLabelStrokeColor(){return'none'!=this.safeString('label-stroke-color')}hasLabelFillColor(){return'none'!=this.safeString('label-fill-color')}hasFillGradient(){return'none'!=this.safeString('fill-gradient')}wantsSymbolStroke(){let s=this.symbolHasStroke(),t=this.symbolHasStrokeColor();return s&&t}wantsSymbolFill(){return this.symbolHasFillColor()}wantsStroke(){let s=this.hasStroke(),t=this.hasStrokeColor();return s&&t}wantsOverStroke(){let s=this.hasOverStroke(),t=this.hasOverStrokeColor();return s&&t}wantsSymbolBrush(){let s=this.hasSymbolBrush(),t=this.hasBrushSymbolStroke(),e=this.hasBrushSymbolStrokeColor(),r=this.hasBrushSymbolFillColor();return s&&t&&e||s&&r}wantsHatchBrush(){let s=this.hasHatchBrush(),t=this.hasBrushHatchStroke(),e=this.hasBrushHatchStrokeColor();return s&&t&&e}wantsCrosshatchBrush(){let s=this.hasCrosshatchBrush(),t=this.hasBrushCrosshatchStroke(),e=this.hasBrushCrosshatchStrokeColor();return s&&t&&e}wantsFill(){let s=this.hasFillColor(),t=this.hasFillGradient();return s||t}wantsSymbolPattern(){let s=this.hasSymbolPattern(),t=this.hasPatternSymbolStroke(),e=this.hasPatternSymbolStrokeColor(),r=this.hasPatternSymbolFillColor();return s&&t&&e||s&&r}wantsHatchPattern(){let s=this.hasHatchPattern(),t=this.hasPatternHatchStroke(),e=this.hasPatternHatchStrokeColor();return s&&t&&e}wantsCrosshatchPattern(){let s=this.hasCrosshatchPattern(),t=this.hasPatternCrosshatchStroke(),e=this.hasPatternCrosshatchStrokeColor();return s&&t&&e}wantsLabel(){let s=this.hasLabelStroke(),t=this.hasLabelStrokeColor(),e=this.hasLabelFillColor();return s&&t||e}hasSymbolBrush(){return!!this.safeArray('stroke-brush').includes('symbol')}hasHatchBrush(){return!!this.safeArray('stroke-brush').includes('hatch')}hasCrosshatchBrush(){return!!this.safeArray('stroke-brush').includes('crosshatch')}hasSymbolPattern(){return!!this.safeArray('fill-pattern').includes('symbol')}hasHatchPattern(){return!!this.safeArray('fill-pattern').includes('hatch')}hasCrosshatchPattern(){return!!this.safeArray('fill-pattern').includes('crosshatch')}makeBrushKey(s,t,e){expect(s,'String'),expect(t,'Number'),expect(e,'Number');var r=[];switch(r.push('brush'),r.push(s),r.push(t),r.push(e),s){case'hatch':r.push(this['sb-hatch-stroke-type']),r.push(this['sb-hatch-stroke-spacing']),r.push(this['sb-hatch-stroke-direction']),r.push(this['sb-hatch-stroke-width']),r.push(this['sb-hatch-stroke-color']),r.push(this['sb-hatch-background-color']);break;case'crosshatch':r.push(this['sb-crosshatch-stroke-type']),r.push(this['sb-crosshatch-stroke-spacing']),r.push(this['sb-crosshatch-stroke-direction']),r.push(this['sb-crosshatch-stroke-width']),r.push(this['sb-crosshatch-stroke-color']),r.push(this['sb-crosshatch-background-color']);break;default:r.push(this['sb-symbol-type']),r.push(this['sb-symbol-spacing']),r.push(this['sb-symbol-repeat']),r.push(this['sb-symbol-stroke-width']),r.push(this['sb-symbol-stroke-color']),r.push(this['sb-symbol-fill-color']),r.push(this['sb-symbol-background-color']),r.push(this['sb-symbol-size']),r.push(this['sb-symbol-inner-size']),r.push(this['sb-symbol-node-count']),r.push(this['sb-symbol-code-point']),r.push(this['sb-symbol-thickness'])}return r.join('|')}makePatternKey(s,t,e){expect(s,'String'),expect(t,'Number'),expect(e,'Number');var r=[];switch(r.push('pattern'),r.push(s),r.push(t),r.push(e),s){case'hatch':r.push(this['fp-hatch-stroke-type']),r.push(this['fp-hatch-stroke-spacing']),r.push(this['fp-hatch-stroke-direction']),r.push(this['fp-hatch-stroke-width']),r.push(this['fp-hatch-stroke-color']),r.push(this['fp-hatch-background-color']);break;case'crosshatch':r.push(this['fp-crosshatch-stroke-type']),r.push(this['fp-crosshatch-stroke-spacing']),r.push(this['fp-crosshatch-stroke-direction']),r.push(this['fp-crosshatch-stroke-width']),r.push(this['fp-crosshatch-stroke-color']),r.push(this['fp-crosshatch-background-color']);break;default:r.push(this['fp-symbol-type']),r.push(this['fp-symbol-spacing']),r.push(this['fp-symbol-repeat']),r.push(this['fp-symbol-stroke-width']),r.push(this['fp-symbol-stroke-color']),r.push(this['fp-symbol-fill-color']),r.push(this['fp-symbol-background-color']),r.push(this['fp-symbol-size']),r.push(this['fp-symbol-inner-size']),r.push(this['fp-symbol-node-count']),r.push(this['fp-symbol-code-point'])}return r.join('|')}getSymbolSize(s){return expect(s,'String'),this.safeNumber(`${s}symbol-size`)}getSymbolFillRadius(s){expect(s,'String');let t=this.getSymbolSize(s);return'circle'===this.safeString(`${s}symbol-type`)?t:t+1}getSymbolStrokeWidth(s){expect(s,'String');let t=this.safeNumberOrNone(`${s}symbol-stroke-width`);return'none'==t&&(t=0),t}getSymbolOverallDiameter(s){expect(s,'String');let t=this.safeString(`${s}symbol-type`),e=this.getSymbolFillRadius(s),r=this.getSymbolStrokeWidth(s);switch(t){case'crosshair':case'x-mark':return Math.round(2*e);default:return Math.round(2*e+r)}}getHatchStrokeAngle(s,t){switch(expect(s,'String'),expect(t,'String'),this.safeString(`${s}${t}stroke-direction`)){case'horizontal':case'0':default:return 0;case'diagonal':case'45':return 45;case'vertical':case'90':return 90;case'reverse-diagonal':case'135':return 135}}getLabelText(s){expect(s,'Object');var t=this.safeString('label-feature-key');if('none'==t)return'';var e=s[t];return null==e?'':'String'==e.constructor.name?e:e.toString()}getLabelOffset(){var s=this.safeNumberOrAutoOrNone('label-offset');if('auto'==s){return this.getSymbolOverallDiameter('')/2}return'none'==s?0:s}safeNumber(s){var t=this[s]??TessDefaults[s];return t=Number(t),Number.isNaN(t)?0:t}safeNumberOrNone(s){var t=this[s]??TessDefaults[s];return'none'==t?t:(t=Number(t),Number.isNaN(t)?0:t)}safeNumberOrAuto(s){var t=this[s]??TessDefaults[s];return'auto'==t?t:(t=Number(t),Number.isNaN(t)?0:t)}safeNumberOrAutoOrNone(s){var t=this[s]??TessDefaults[s];return'none'==t||'auto'==t?t:(t=Number(t),Number.isNaN(t)?0:t)}safeNumberWithFallback(s){var t=this[s];if(null!=t)return Number(t);var e=TessValidator.fallbackTable[s];return null!=e?this.safeNumberWithFallback(e):(t=TessDefaults[s],t=Number(t),Number.isNaN(t)?0:t)}safeColorOrNone(s){var t=this[s]??TessDefaults[s];return'none'==t?t:0!==t.indexOf('#')?'#000':t}safeString(s){var t=this[s]??TessDefaults[s];return'String'==t.constructor.name?t:t.toString()}safeArray(s){var t=this[s]??TessDefaults[s];return'Array'==t.constructor.name?t:[t]}safeDisplayThreshold(s){var t=this[s]??TessDefaults[s];return'String'==t.constructor.name?t:t.toString()}dump(){var s='';for(property in this)'function'!=typeof this[property]&&(s+=property+'=>'+this[property]+'\n');return s}}