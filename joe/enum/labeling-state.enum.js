/* Copyright (c) 2023 Read Write Tools. Legal use subject to the Thematic Earth Software License Agreement. */
import EnumProxyHandler from'./enum-proxy-handler.class.js';var LabelingState={QUEUEING:0,PENDING:1,WORKING:2,COMPLETE:3};Object.freeze(LabelingState);export default new Proxy(LabelingState,new EnumProxyHandler('LabelingState'));