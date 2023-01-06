/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import*as Color from'../graphics/color.js';import*as LineGraphics from'../graphics/line-graphics.js';import expect from'../dev/expect.js';export function draw(e,t,a,r,n,o,l,i,s){if(expect(e,'CanvasRenderingContext2D'),expect(t,['PatternCache','null']),expect(a,'CanvasParams'),expect(r,'Number'),expect(n,'Number'),expect(o,'Number'),expect(l,'Array'),expect(i,'Array'),expect(s,'Boolean'),!a.isVisible())return;let c=a.wantsFill(),p=a.wantsSymbolPattern(),h=a.wantsHatchPattern(),f=a.wantsCrosshatchPattern(),u=a.wantsSymbolBrush(),g=a.wantsHatchBrush(),d=a.wantsCrosshatchBrush(),v=a.wantsStroke()&&a.displayStrokes(),m=a.wantsOverStroke()&&a.displayStrokes();if(1==(c||p||h||f||u||g||d||v||m)){var b=a.scaleStrokesCoefficient();if(definePath(e,r,n,o,l,i,!1,s),e.globalAlpha=a.getTransparency(),p||h||f||u||g||d)var x=a.scaleSymbolsCoefficient();if(u||g||d){let r=a.safeArray('stroke-brush');expect(r,'Array');for(let n=0;n<r.length;n++){let o=r[n];'outside'==a.safeString(`sb-${o}-stroke-alignment`)&&LineGraphics.applyBrush(e,o,t,a,b,x)}}if(v&&LineGraphics.applyStroke(e,a,b,'stroke-width','stroke-color','stroke-type'),c&&applyFillAndGradient(e,a,l),p||h||f){let r=a.safeArray('fill-pattern');expect(r,'Array');for(let n=0;n<r.length;n++)applyPattern(e,r[n],t,a,b,x)}if(u||g||d){let r=a.safeArray('stroke-brush');expect(r,'Array');for(let n=0;n<r.length;n++){let o=r[n],l=a.safeString(`sb-${o}-stroke-alignment`);'inside'==l?(e.save(),e.clip(),LineGraphics.applyBrush(e,o,t,a,b,x),e.restore()):'overline'==l&&LineGraphics.applyBrush(e,o,t,a,b,x)}}m&&LineGraphics.applyStroke(e,a,b,'over-stroke-width','over-stroke-color','over-stroke-type')}}function definePath(e,t,a,r,n,o,l,i){expect(e,'CanvasRenderingContext2D'),expect(t,'Number'),expect(a,'Number'),expect(r,'Number'),expect(n,'Array'),expect(o,'Array'),expect(l,'Boolean'),expect(i,'Boolean'),e.beginPath(),drawRing(e,t,a,r,n,o,!1,i);for(var s=0;s<o.length;s++){var c=o[s];expect(c,'PolygonFeature'),drawRing(e,t,a,r,c.outerRing,c.innerRings,!0,i)}e.closePath()}function drawRing(e,t,a,r,n,o,l,i){for(var s=!1,c=!1,p=!0,h=null,f=null,u=null,g=0;g<n.length;g++){var d=n[g],v=n[g-1];if(c=d.isOnNearSide,1==p)1==c&&(e.moveTo(d.canvasX,d.canvasY),g>0&&(h=d.projectedTheta),p=!1);else if(1==c&&1==s)e.lineTo(d.canvasX,d.canvasY);else if(0==c&&1==s){f=v.projectedTheta;let n=a+t*Math.cos(f),o=r+t*Math.sin(f);e.lineTo(n,o)}else if(1==c&&0==s){if(f!=(u=d.projectedTheta)){var m=f,b=u;1==i?e.arc(a,r,t,m,b,!0):drawConnectingArc(e,a,r,t,m,b,l);let n=a+t*Math.cos(u),o=r+t*Math.sin(u);e.lineTo(n,o)}f=null,u=null}s=d.isOnNearSide}if(null!=f&&null!=h){if(f!=h){m=f,b=h;1==i?e.arc(a,r,t,m,b,!0):drawConnectingArc(e,a,r,t,m,b,l);let n=a+t*Math.cos(h),o=r+t*Math.sin(h);e.lineTo(n,o)}f=null,h=null}}function drawConnectingArc(e,t,a,r,n,o,l){1!=l&&(Math.abs(o-n)>Math.PI?n>o?e.arc(t,a,r,n,o,!1):e.arc(t,a,r,n,o,!0):n<o?e.arc(t,a,r,n,o,!1):e.arc(t,a,r,n,o,!0))}function applyFillAndGradient(e,t,a){var r=t.safeColorOrNone('fill-color');if('none'!=r){if('none'!=t.safeString('fill-gradient')){var n=determineFeatureBoundingBox(a),o=t.getTransparency();applyGradient(e,n,t,Color.computeColorPlusTransparency(r,o))}else e.fillStyle=r;let l=t.safeString('fill-composition');e.globalCompositeOperation=l,e.fill(),e.globalCompositeOperation='source-over'}}function determineFeatureBoundingBox(e){for(var t=null,a=null,r=null,n=null,o=!0,l=0;l<e.length;l++){var i=e[l];i.isOnNearSide&&(1==o?(t=i.canvasX,a=i.canvasY,r=i.canvasX,n=i.canvasY,o=!1):(t=Math.min(t,i.canvasX),a=Math.min(a,i.canvasY),r=Math.max(r,i.canvasX),n=Math.max(n,i.canvasY)))}return{left:t,top:a,right:r,bottom:n}}function applyGradient(e,t,a,r){if(expect(e,'CanvasRenderingContext2D'),expect(t,'Object'),expect(a,'CanvasParams'),expect(r,'String'),t.top!=t.bottom&&t.left!=t.right){var n,o,l,i,s,c,p,h=t.right-t.left,f=t.bottom-t.top,u=h/2,g=f/2;switch(a.safeString('fill-gradient')){case'radial':var d=t.left+u,v=t.top+g,m=Math.sqrt(Math.pow(h,2)+Math.pow(f,2));s=.01*m,c=.4*m,p=e.createRadialGradient(d,v,s,d,v,c);break;case'horizontal':n=t.left,o=t.right,l=i=(t.bottom-t.top)/2,p=e.createLinearGradient(n,l,o,l);break;case'vertical':n=o=(t.right-t.left)/2,l=t.top,i=t.bottom,p=e.createLinearGradient(n,l,n,i);break;default:n=t.left,l=t.top,o=t.right,i=t.bottom,p=e.createLinearGradient(n,l,o,i)}p.addColorStop(0,r),p.addColorStop(1,determineGradientColorStop(r,a)),e.fillStyle=p}}function determineGradientColorStop(e,t){expect(e,'String');var{red:a,green:r,blue:n,alpha:o}=Color.rgb2Decimal(e),{hue:l,saturation:i,brightness:s}=Color.rgbDecimal2hsv(a,r,n),c=t.safeNumberOrAutoOrNone('fg-saturation'),p=t.safeNumberOrAutoOrNone('fg-brightness'),h=t.safeNumberOrAutoOrNone('fg-transparency');'none'!=p&&(s=Color.scaleSaturationBrightness(p,s)),'none'!=c&&(i=Color.scaleSaturationBrightness(c,i)),'none'!=h&&(o=Color.scaleTransparency(h,o)),'none'==p&&'none'==c&&'none'==h&&(s=Color.scaleSaturationBrightness('auto',s));var{red:a,green:r,blue:n}=Color.hsv2rgbDecimal(l,i,s);return Color.rgbaDecimal2rbgaHex(a,r,n,o)}function applyPattern(e,t,a,r,n,o){if(expect(e,'CanvasRenderingContext2D'),expect(t,'String'),expect(a,['PatternCache','null']),expect(r,'CanvasParams'),expect(n,'Number'),null!=a&&'none'!=t&&('symbol'==t||'hatch'==t||'crosshatch'==t)){var l=Math.ceil(n);if(0!=l){var i=Math.ceil(o);if(0!=i){var s=r.makePatternKey(t,l,i);if(a.has(s))e.fillStyle=a.get(s),e.fill();else{var c=a.buildDOMCanvasPattern(e,s,'pattern',t,r,l,i);null!=c&&(e.fillStyle=c,e.fill())}}}}}