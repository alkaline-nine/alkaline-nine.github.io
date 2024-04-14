!function(){console.log("Loading window.fallingBlocks..."),window.fallingBlocks=this,this.gameApi=void 0,this.init=api=>{const conf=this.gameData.conf;this.gameApi=api,this.initControls(api,conf),this.initLayers(api,conf),console.log("...fallingBlocks initialized"),api.startGame()},this.gameData={state:{active:!0,gameOver:!1,keysPressed:[],all:[],locked:[],complete:[],completeCount:0,curr:void 0,next:void 0,lines:0,score:0},conf:{cols:14,rows:20,blockSize:33,headerSize:70,frameBorder:5,timer:40,completeTimer:25,lockedTimer:15,completeColor:"gainsboro",gameOverColor:"darkred",gameColor:"black",lockedColor:"white",headerColor:"midnightblue",headerFont:"16px sans-serif",controlFont:"14px sans-serif",textColor:"white",blockDarkShade:"rgba(0,0,0,0.1)",blockLightShade:"rgba(255,255,255,0.1)",htmlControlSection:void 0,isTouchDevice:!1,userAgent:"UNKNOWN",keys:{keyEnter:13,keyEsc:27,keySpace:32,keyLeft:37,keyUp:38,keyRight:39,keyDown:40,keyI:73},colors:["blue","green","red","magenta","yellow","cyan","darkgrey"],shapes:{line:[[0,-1,0,0,0,1,0,2],[-2,0,-1,0,0,0,1,0],[0,-1,0,0,0,1,0,2],[-2,0,-1,0,0,0,1,0]],square:[[0,0,0,1,1,0,1,1],[0,0,0,1,1,0,1,1],[0,0,0,1,1,0,1,1],[0,0,0,1,1,0,1,1]],left_l:[[0,-1,0,0,0,1,1,1],[-1,1,-1,0,0,0,1,0],[-1,-1,0,-1,0,0,0,1],[-1,0,0,0,1,0,1,-1]],right_l:[[-1,1,0,1,0,0,0,-1],[-1,0,-1,1,0,1,1,1],[1,-1,0,-1,0,0,0,1],[-1,0,0,0,1,0,1,1]],left_z:[[0,-1,0,0,1,0,1,1],[-1,1,0,1,0,0,1,0],[0,-1,0,0,1,0,1,1],[-1,1,0,1,0,0,1,0]],right_z:[[1,-1,1,0,0,0,0,1],[-1,0,0,0,0,1,1,1],[1,-1,1,0,0,0,0,1],[-1,0,0,0,0,1,1,1]],tee:[[0,-1,0,0,0,1,1,0],[-1,0,0,0,1,0,0,1],[0,-1,0,0,0,1,-1,0],[-1,0,0,0,1,0,0,-1]]}}},this.initControls=(api,conf)=>{console.log("Setup keyboard controls for keys = "+JSON.stringify(Object.values(conf.keys))),api.keys(Object.values(conf.keys)),api.inputCallback(this.handleKeypress),console.log("Setup keyboard controls for game canvas engine = "+JSON.stringify(api.config().input.keys)),conf.htmlControlSection=document.getElementById("html_control_section"),conf.htmlControlSection&&(conf.userAgent=navigator.userAgent,this.addControlButton(conf,conf.htmlControlSection,"Pause/Restart",conf.keys.keyEnter,"darkred","white"),this.addControlButton(conf,conf.htmlControlSection,"Move Left",conf.keys.keyLeft,"darkblue","white"),this.addControlButton(conf,conf.htmlControlSection,"Rotate",conf.keys.keySpace,"darkgreen","white"),this.addControlButton(conf,conf.htmlControlSection,"Move Right",conf.keys.keyRight,"darkblue","white"),this.addControlButton(conf,conf.htmlControlSection,"Fast Fall",conf.keys.keyDown,"darkred","white"),this.addControlCheckbox(conf,conf.htmlControlSection,"Touchscreen?",conf.keys.keyI,"black"))},this.addControlButton=(conf,parentDiv,name,key,color,textColor,font)=>{const button=document.createElement("button");button.innerHTML=name,button.style.margin="8px",button.style.height="36px",button.style.font=conf.controlFont,button.style.color=textColor,button.style.background=color,button.addEventListener("touchend",(event=>this.handleTouch(event,conf,name,key))),button.addEventListener("click",(event=>this.handleClick(event,conf,name,key))),parentDiv.appendChild(button),console.log("Setup touch controls for "+name)},this.addControlCheckbox=(conf,parentDiv,name,key,textColor)=>{const checkboxId="checkbox_"+Date.now();console.log("Setup controls for checkbox id="+checkboxId);const checkbox=document.createElement("input");checkbox.type="checkbox",checkbox.name=name,checkbox.id=checkboxId,checkbox.checked=conf.isTouchDevice=this.isTouchUserAgent(conf),checkbox.addEventListener("change",(event=>this.handleTouchCheckbox(event,conf,key)));const checkboxLabel=document.createElement("label");checkboxLabel.htmlFor=checkboxId,checkboxLabel.appendChild(document.createTextNode(name)),parentDiv.appendChild(document.createElement("br")),parentDiv.appendChild(checkboxLabel),parentDiv.appendChild(checkbox),console.log("Setup touch controls for "+name)},this.isTouchUserAgent=conf=>{let agent=conf.userAgent||"UNKNOWN";console.log("DEBUG: navigator userAgent=",agent),agent&&agent.includes("Android")?agent="Android":agent&&agent.includes("iPhone")?agent="iPhone":agent&&agent.includes("iPad")&&(agent="iPad"),conf.userAgent=agent,console.log("DEBUG: parsed userAgent=",agent);return"iPhone"===agent||"iPad"===agent||"Android"===agent},this.handleTouchCheckbox=(event,conf,key)=>{event.target&&event.target.checked?(console.log("setting isTouchDevice true"),conf.isTouchDevice=!0):(console.log("setting isTouchDevice false"),conf.isTouchDevice=!1),event.preventDefault()},this.handleClick=(event,conf,name,key)=>{conf.isTouchDevice?console.log("IGNORING "+name+" click!"):(console.log(name+" click!"),this.handleKeypress([key]),event.preventDefault())},this.handleTouch=(event,conf,name,key)=>{conf.isTouchDevice?(console.log(name+" touch!"),this.handleKeypress([key]),event.preventDefault()):console.log("IGNORING "+name+" touch!")},this.initLayers=(api,conf)=>{const width=api.config().canvas.width=conf.cols*conf.blockSize+2*conf.frameBorder,height=api.config().canvas.height=conf.rows*conf.blockSize+conf.headerSize+2*conf.frameBorder;console.log("Width/Height for game canvas engine = "+width+":"+height);const layer={think:this.thinkLayer,render:this.renderLayer,data:this.gameData};api.addLayer(layer),console.log("Added object to html game canvas engine")},this.resetGameOver=state=>{state.gameOver=!1,state.lines=0,state.score=0,state.curr=void 0,state.next=void 0,state.all=[],state.locked=[],state.complete=[],state.completeCount=0},this.handleKeypress=keys=>{const api=this.gameApi,state=this.gameData.state,conf=this.gameData.conf,keypress=keys.at(0)||-1;keypress===conf.keys.keyEsc?this.handleStartStop(api,state,!0):keypress===conf.keys.keyEnter?this.handleStartStop(api,state,state.active):state.keysPressed.push(keypress)},this.handleStartStop=(api,state,stop)=>{stop?(state.active=!1,api.stopGame()):(state.gameOver&&this.resetGameOver(state),state.active=!0,api.startGame())},this.handleKeypressMovement=(conf,state,keypress)=>{if(state&&state.curr)if(keypress===conf.keys.keyUp||keypress==conf.keys.keySpace){const nextOrientation=state.curr.orientation+1;this.checkShapeBounds(conf,{...state.curr,orientation:nextOrientation},state.all)?console.log("keypress: CANNOT move left, another block or boundary in the way"):state.curr.orientation=nextOrientation}else if(keypress===conf.keys.keyDown)state.curr.timer=0;else if(keypress===conf.keys.keyLeft){const nextPx=state.curr.px-1;this.checkShapeBounds(conf,{...state.curr,px:nextPx},state.all)?console.log("keypress: CANNOT move left, another block or boundary in the way"):state.curr.px=nextPx}else if(keypress===conf.keys.keyRight){const nextPx=state.curr.px+1;this.checkShapeBounds(conf,{...state.curr,px:nextPx},state.all)?console.log("keypress: CANNOT move right, another block or boundary in the way"):state.curr.px=nextPx}else console.log("keypress: UNKNOWN ",keypress)},this.thinkLayer=(idx,count,data)=>{const api=this.gameApi,state=data.state,conf=data.conf;if(state.gameOver)return state.active=!1,void api.stopGame();state.keysPressed.length>0&&(state.keysPressed.forEach((k=>this.handleKeypressMovement(conf,state,k))),state.keysPressed=[]),this.handleCompleteLines(state),this.handleLockedBlocks(state),state.next||(state.next=this.newBlock(api,conf)),state.curr||(state.curr=state.next,state.next=void 0),state.curr.timer--<=0&&this.handleAutoFallTimer(conf,state)},this.handleAutoFallTimer=(conf,state)=>{const nextPy=state.curr.py+1;if(!1===this.checkShapeBounds(conf,{...state.curr,py:nextPy},state.all))state.curr.py=nextPy,state.curr.timer=conf.timer;else{const{px,py}=this.startingPosition(conf);px===state.curr.px&&py===state.curr.py?(console.log("locked in starting startingPosition, game over"),state.gameOver=!0):(this.lockShape(conf,state),state.curr=state.next,state.next=void 0)}},this.handleCompleteLines=state=>{state.completeCount>0&&(state.completeCount--,state.completeCount<=0&&state.complete.length>0&&(state.complete.forEach((py=>this.handleCompleteRow(state,py))),state.complete=[]))},this.handleCompleteRow=(state,py)=>{console.log("removing row py =",py),state.all=state.all.filter((block=>block.py!==py)).map((block=>(block.py<py&&(block.py=block.py+1),block)))},this.checkCompleteLines=(conf,state)=>{let completeLines=0;for(py=0;py<conf.rows;py++)this.checkCompleteRow(conf,state,py)&&(console.log("mark complete for py =",py),this.markCompleteRow(conf,state,py),completeLines++);completeLines>0&&(state.lines+=completeLines,state.score+=250*completeLines,completeLines>3?state.score+=4e3:completeLines>2&&(state.score+=1250))},this.checkCompleteRow=(conf,state,py)=>{const pxs=state.all.filter((block=>block.py===py)).map((block=>block.px));for(px=0;px<conf.cols;px++)if(!pxs.includes(px))return!1;return!0},this.markCompleteRow=(conf,state,py)=>{state.all.filter((block=>block.py===py)).forEach((block=>{block.color=conf.completeColor})),state.complete.push(py),state.completeCount=conf.completeTimer},this.handleLockedBlocks=state=>{state.locked.length>0&&(state.locked.forEach((b=>b.timer--)),state.locked=state.locked.filter((b=>b.timer>0)))},this.checkShapeBounds=(conf,block,all)=>{const shape=conf.shapes[`${block.shape}`],xys=shape[block.orientation%shape.length];block.color;let shapeBounds=!1;for(skip=0;skip<8&&!shapeBounds;skip+=2){let px=block.px+xys[0+skip],py=block.py+xys[1+skip];shapeBounds=checkBounds(conf,px,py,all)}return shapeBounds},this.checkBounds=(conf,px,py,all)=>{if(py>=conf.rows||px<0||px>=conf.cols)return!0;if(Array.isArray(all)){return all.filter((b=>b.py===py&&b.px===px)).length>0}return!1},this.lockShape=(conf,state)=>{const shape=conf.shapes[`${state.curr.shape}`],xys=shape[state.curr.orientation%shape.length];for(skip=0;skip<8;skip+=2){let px=state.curr.px+xys[0+skip],py=state.curr.py+xys[1+skip];state.all.push({px,py,color:state.curr.color}),state.locked.push({px,py,color:conf.lockedColor,timer:conf.lockedTimer})}state.score+=5,this.checkCompleteLines(conf,state)},this.newColor=(api,conf)=>conf.colors[api.random(conf.colors.length)],this.newShape=(api,conf)=>{const shapes=Object.keys(conf.shapes);return shapes[api.random(123456789)%shapes.length]},this.startingPosition=conf=>({px:conf.cols/2-1,py:0}),this.newBlock=(api,conf)=>{const{px,py}=this.startingPosition(conf);return{px,py,color:this.newColor(api,conf),shape:this.newShape(api,conf),orientation:0,timer:conf.timer}},this.renderShape=(api,conf,block,blockSize)=>{const shape=conf.shapes[`${block.shape}`],xys=shape[block.orientation%shape.length],color=block.color;for(skip=0;skip<8;skip+=2){let px=block.px+xys[0+skip],py=block.py+xys[1+skip];this.renderBlock(api,conf,{color,px,py},blockSize)}},this.renderBlock=(api,conf,block,blockSize)=>{const bx=block.px*blockSize+conf.frameBorder,by=block.py*blockSize+conf.headerSize+conf.frameBorder,corners=[{x:bx,y:by},{x:bx+blockSize,y:by},{x:bx+blockSize,y:by+blockSize},{x:bx,y:by+blockSize}];api.drawUtil({type:"path",c:block.color,path:corners}),api.drawUtil({type:"path",c:conf.blockLightShade,path:[corners[3],corners[0],corners[1]]}),api.drawUtil({type:"path",c:conf.blockDarkShade,path:[corners[1],corners[2],corners[3]]})},this.renderHeader=(api,conf,state,color)=>{if(api.drawUtil({type:"rect",c:color,x:0,y:0,dx:conf.cols*conf.blockSize+2*conf.frameBorder,dy:conf.headerSize+conf.frameBorder}),api.drawUtil({type:"text",x:10,y:.45*conf.headerSize,c:conf.textColor,font:conf.headerFont,text:"Score: "+state.score}),api.drawUtil({type:"text",x:10,y:.9*conf.headerSize,c:conf.textColor,font:conf.headerFont,text:"Lines: "+state.lines}),state.gameOver)api.drawUtil({type:"text",x:conf.cols*conf.blockSize*.7,y:.9*conf.headerSize,c:conf.textColor,font:conf.headerFont,text:"G A M E   O V E R"});else if(state.next){const nextShape={...state.next,orientation:1,px:conf.cols-2,py:-2};this.renderShape(api,conf,nextShape,conf.blockSize),api.drawUtil({type:"text",x:conf.cols*conf.blockSize*.7,y:.9*conf.headerSize,c:conf.textColor,font:conf.headerFont,text:"Next:"})}},this.renderBackground=(api,conf,state)=>{api.drawUtil({type:"rect",c:state.gameOver?conf.gameOverColor:conf.gameColor,x:0,y:0,dx:conf.cols*conf.blockSize+2*conf.frameBorder,dy:conf.rows*conf.blockSize+conf.headerSize+2*conf.frameBorder})},this.renderLayer=(idx,count,data,ctx)=>{const api=this.gameApi,state=data.state,conf=data.conf;this.renderBackground(api,conf,state),this.renderHeader(api,conf,state,conf.headerColor),state.all.forEach((d=>this.renderBlock(api,conf,d,conf.blockSize))),state.locked.forEach((d=>this.renderBlock(api,conf,d,conf.blockSize))),state.curr&&this.renderShape(api,conf,state.curr,conf.blockSize)}}();