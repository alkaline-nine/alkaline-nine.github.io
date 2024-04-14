(()=>{var __webpack_modules__={232:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(){this.config={active:!1,renderCycle:0,canvas:{width:640,height:480,renderCycleType:"frame",timer:100,activated:!1},input:{keys:[],callback:function(keys){}}}}},813:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(config,keyinput,layers,canvas){var _this=this;this.config=config,this.keyinput=keyinput,this.layers=layers,this.canvas=canvas,this.startGame=function(){console.log("Gamer: HTML Game Canvas started!"),_this.canvas.width=_this.config.canvas.width,_this.canvas.height=_this.config.canvas.height,_this.config.renderCycle=0,_this.config.active=!0,!0!==_this.config.canvas.activated&&(_this.config.canvas.activated=!0,_this.keepGaming())},this.stopGame=function(){_this.config.active=!1,console.log("Gamer: HTML Game Canvas stopped!")},this.checkInputs=function(){if(null!==_this.config.input.callback){var keys=_this.keyinput.getInputs();keys&&Array.isArray(keys)&&keys.length>0&&_this.config.input.callback(keys)}},this.keepGaming=function(){if(_this.checkInputs(),_this.config.active){var ctx=_this.canvas.getContext("2d");_this.config.renderCycle++,_this.layers.thinkAll(),_this.clearCanvas(ctx),_this.layers.renderAll(ctx)}_this.nextFrame()},this.clearCanvas=function(ctx){ctx.fillStyle="black",ctx.fillRect(0,0,_this.config.canvas.width,_this.config.canvas.height)},this.nextFrame=function(){_this.timerOrFrame()},this.timerOrFrame=function(){"timer"===config.canvas.renderCycleType?window.setTimeout((function(){_this.keepGaming()}),config.canvas.timer):"frame"===config.canvas.renderCycleType&&window.requestAnimationFrame(_this.keepGaming)}}},915:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(config){var _this=this;this.config=config,this.inputs=[],this.setKeys=function(keys){_this.config.input.keys=keys,console.log("KeyInput: setting keys=",JSON.stringify(_this.config.input.keys))},this.setCallback=function(callback){_this.config.input.callback=callback,console.log("KeyInput: setting callback function")},this.handleKeys=function(event){_this.config.input.keys.length>0&&(console.log("KeyInput: checking event for key="+event.keyCode),_this.config.input.keys.some((function(k){return k===event.keyCode}))&&(_this.inputs.push(event.keyCode),event.preventDefault()))},this.getInputs=function(){if(_this.inputs.length>0){var toReturn=_this.inputs;return _this.inputs=[],toReturn}return[]}}},336:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(config){var _this=this;this.config=config,this.data=[],this.thinkAll=function(){var cycleCount=_this.config.renderCycle;for(i=0;i<_this.data.length;i++){var layer=_this.data.at(i);layer&&!0===layer.thinkEnabled&&layer.think(i,cycleCount,layer.data),layer&&!0!==layer.removeMe||(_this.data.splice(i,1),console.log("Removed Layer idx="+i+" totalLayers="+_this.data.length),i--)}},this.renderAll=function(ctx){var cycleCount=_this.config.renderCycle;for(i=0;i<_this.data.length;i++){var layer=_this.data.at(i);layer&&!0===layer.renderEnabled&&layer.render(i,cycleCount,layer.data,ctx)}},this.addLayer=function(layer){var layerToAdd={thinkEnabled:layer.hasOwnProperty("think"),renderEnabled:layer.hasOwnProperty("render"),removeMe:!1,think:layer.think,render:layer.render,data:layer.data||{}};_this.data.push(layerToAdd)},this.removeLayer=function(idx){var toRemove=_this.data.at(idx);toRemove&&(toRemove.removeMe=!0)}}},720:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(seed){var _this=this;this.state=seed||3405691582,this.nextLong=function(){var a=_this.state;return _this.state=_this.xorShift64(a),a},this.xorShift64=function(a){var b=a;return b^=b<<21,b^=b>>35,b^=b<<4},this.random=function(max){var next=_this.nextLong();return Math.abs((next>>32)*max>>32)%max}}},496:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(canvas,config){var _this=this;this.config=config,this.canvas=canvas,this.ctx=this.canvas.getContext("2d"),this.draw=function(opts){switch(_this.ctx.fillStyle=opts.c,opts.type){case"text":_this.drawText(opts);break;case"rect":_this.drawRect(opts);break;case"ellipse":_this.drawEllipse(opts);break;case"path":_this.drawPath(opts)}},this.drawAll=function(optsArray){Array.isArray(optsArray)&&optsArray.forEach((function(o){return _this.draw(o)}))},this.drawText=function(opts){_this.ctx.font=opts.font||"12px serif",_this.ctx.fillText(opts.text,opts.x,opts.y)},this.drawRect=function(opts){_this.ctx.fillRect(opts.x,opts.y,opts.dx,opts.dy)},this.drawEllipse=function(opts){_this.ctx.beginPath(),_this.ctx.ellipse(opts.x+opts.mx,opts.y+opts.my,opts.mx,opts.my,0,0,2*Math.PI),_this.ctx.closePath(),_this.ctx.fill()},this.drawPath=function(opts){_this.ctx.beginPath();var len=Array.isArray(opts.path)?opts.path.length:0;if(len>1){var x=0,y=0,i=0;opts.path.forEach((function(coord){i++,x=coord.x||x,y=coord.y||y,1===i?_this.ctx.moveTo(x,y):_this.ctx.lineTo(x,y),i===len&&(x===opts.path[0].x&&y===opts.path[0].y||(x=opts.path[0].x||0,y=opts.path[0].y||0,_this.ctx.lineTo(x,y)))}))}_this.ctx.closePath(),_this.ctx.fill()}}}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),(()=>{var _configuration_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(232),_marsaglia_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(720),_keyinput_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(915),_layers_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(336),_utils_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(496),_gamer_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(813),renderCanvas=document.getElementById("html_game_canvas"),rendCtx=renderCanvas.getContext("2d");console.log("Found canvas:             ".concat(renderCanvas.innerHTML,"\n\n")),console.log("Found canvas context:     ".concat(rendCtx.canvas.innerHTML,"\n\n"));var gameCanvas={core:{conf:void 0,rando:void 0,input:void 0,layers:void 0,game:void 0,utils:void 0},api:{startGame:function(){return gameCanvas.core.game.startGame()},stopGame:function(){return gameCanvas.core.game.stopGame()},addLayer:function(layer){return gameCanvas.core.layers.addLayer(layer)},removeLayer:function(layerIdx){return gameCanvas.core.layers.removeLayer(layerIdx)},config:function(){return gameCanvas.core.conf.config},random:function(x){return gameCanvas.core.rando.random(x)},keys:function(k){return gameCanvas.core.input.setKeys(k)},inputCallback:function(callback){gameCanvas.core.input.setCallback(callback)},drawUtil:function(opts){gameCanvas.core.utils.draw(opts)}}};!function(){renderCanvas.innerHTML="Initializing and Starting Up!",console.log("Game module init..."),console.log("DOM: Identifying/Creating DOM elems"),console.log("DOM: canvas: ".concat(renderCanvas.innerHTML,"\n\n")),console.log("Configuration: Loading base objects");var config=(gameCanvas.core.conf=new _configuration_js__WEBPACK_IMPORTED_MODULE_0__.Z).config;console.log("Configuration: pre-init config: ".concat(JSON.stringify(config,null,2),"\n\n"));gameCanvas.core.rando=new _marsaglia_js__WEBPACK_IMPORTED_MODULE_1__.Z((new Date).getMilliseconds());console.log("PRNG: initialized marsaglia psuedo random number generator with seed=default"),console.log("KeyInput: Loading keyboard handler");var input=gameCanvas.core.input=new _keyinput_js__WEBPACK_IMPORTED_MODULE_2__.Z(config);console.log("KeyInput: ".concat(JSON.stringify(input.inputs,null,2),"\n\n")),console.log("Layers: Loading layers");var layers=gameCanvas.core.layers=new _layers_js__WEBPACK_IMPORTED_MODULE_3__.Z(config);console.log("Layers: ".concat(JSON.stringify(layers.data,null,2),"\n\n")),console.log("Utils: Loading utils");var utils=gameCanvas.core.utils=new _utils_js__WEBPACK_IMPORTED_MODULE_4__.Z(renderCanvas,config);console.log("Utils: ".concat(JSON.stringify(utils.config,null,2),"\n\n")),console.log("Gamer: Loading game controller");var game=gameCanvas.core.game=new _gamer_js__WEBPACK_IMPORTED_MODULE_5__.Z(config,input,layers,renderCanvas);console.log("Gamer: ".concat(game.canvas.innerHTML,"\n\n"))}(),console.log("Game modules loaded"),window.addEventListener("keydown",(function(event){gameCanvas.core.input.handleKeys(event)})),window.gameCanvas=gameCanvas})()})();