/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import expect from'../dev/expect.js';export default class CollisionMatrix{constructor(t,a,e,i){expect(t,'Catalog'),expect(a,'HTMLCanvasElement'),expect(e,'Number'),expect(i,'Number'),this.catalog=t,this.canvas=a,this.width=e,this.height=i,this.imageData=null,this.initialize()}initialize(){var t=new Uint8ClampedArray(this.width*this.height*4);this.imageData=new ImageData(t,this.width,this.height,{colorSpace:'srgb'})}reserveSymbolBoundingBox(t){expect(t,'BoundingBox');var a=Math.round(t.left),e=Math.round(t.top),i=Math.round(t.width),h=Math.round(t.height);this.reservePixels(a,e,i,h)}reserveLabelLocation(t){expect(t,['LabelLocation','LabelRect']);var a=Math.round(t.x),e=Math.round(t.y),i=Math.round(t.width),h=Math.round(t.height);return 1==this.hasNoConflicts(a,e,i,h)&&(this.reservePixels(a,e,i,h),!0)}hasNoConflicts(t,a,e,i){var h=Math.min(t+e,this.width),r=a+i;for(let e=t;e<h;e++)for(let t=a;t<r;t++){let a=4*(t*this.width+e);if(0!=this.imageData.data[a+0])return!1}return!0}reservePixels(t,a,e,i){var h=Math.min(t+e,this.width),r=a+i;for(let e=t;e<h;e++)for(let t=a;t<r;t++){let a=4*(t*this.width+e);this.imageData.data[a+0]=255,this.imageData.data[a+1]=0,this.imageData.data[a+2]=0,this.imageData.data[a+3]=0}}drawReservedPixels(t){var a=t.width,e=t.height,i=this.canvas.getContext('2d'),h=i.getImageData(0,0,a,e),r=document.createElement('canvas');r.width=a,r.height=e;var s=r.getContext('2d');s.putImageData(h,0,0);for(let t=0;t<this.width;t++)for(let a=0;a<this.height;a++){let e=4*(a*this.width+t);0!=this.imageData.data[e]&&s.putImageData(this.imageData,0,0,t,a,1,1)}var o=s.getImageData(0,0,a,e);i.putImageData(o,0,0)}}