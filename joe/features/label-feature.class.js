/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import PointFeature from'./point-feature.class.js';import FT from'../enum/feature-type.enum.js';import RS from'../enum/rendering-state.enum.js';import expect from'../dev/expect.js';export default class LabelFeature extends PointFeature{constructor(){super()}get featureType(){return FT.LABEL}runCourtesyValidator(e,t,r,a,u){e.runCourtesyValidator(FT.LABEL,t,r,this.featureName,this.kvPairs,a)}drawFeature(e,t,r){expect(e,'RenderClock'),expect(t,'Earth'),expect(r,'Layer')}}