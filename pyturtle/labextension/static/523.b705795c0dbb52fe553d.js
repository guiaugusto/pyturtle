(self.webpackChunkpyturtle=self.webpackChunkpyturtle||[]).push([[523],{523:(t,i,s)=>{"use strict";function e(t){return new Promise((i=>setTimeout(i,t)))}function a(t){return t*Math.PI/180}function n(t,i,s){return{x:s.x+i*Math.cos(a(t)),y:s.y+i*Math.sin(a(t))}}s.r(i),s.d(i,{Sprite:()=>h,TurtleComponent:()=>o});class h{#rows;#columns;#image;#frameWidth;#frameHeight;#currentFrame;#maxFrame;#canvas;#spriteScale;constructor(t,i,s,e,a){this.#rows=t,this.#columns=i,this.#image=s,this.#frameWidth=s.width/i,this.#frameHeight=s.height/t,this.#currentFrame=0,this.#maxFrame=i*t-1,this.#canvas=e,this.#spriteScale={width:this.frameWidth*a,height:this.frameHeight*a},this.#loadImage(s,a)}#loadImage(t,i){t.onload=()=>{this.#image=t,this.#frameWidth=t.width/this.#columns,this.#frameHeight=t.height/this.#rows,this.#spriteScale={width:this.#frameWidth*i,height:this.#frameHeight*i},this.#currentFrame=0},t.complete&&0!==t.naturalHeight&&t.onload()}async run(t){this.#currentFrame++,this.#currentFrame>this.#maxFrame&&(this.#currentFrame=0);let i=this.#currentFrame%this.#columns,s=Math.floor(this.#currentFrame/this.#columns);this.#canvas.drawImage(this.#image,i*this.#frameWidth,s*this.#frameHeight,this.#frameWidth,this.#frameHeight,t.x-this.#getCenterOffset().width,t.y-this.#getCenterOffset().height,this.#spriteScale.width,this.#spriteScale.height),await e(1e3/this.#maxFrame)}#getCenterOffset(){return{width:this.#spriteScale.width/2,height:this.#spriteScale.height/2}}}class r{#position;#angle;#speed;#actions;#moving;#width;#height;#color;#penUp;#invisibleColor;#backgroundCanvas;#foregroundCanvas;#idleSprite;#moveSprite;#spritePosition;constructor(t,i,s,e,a,n){this.#position={x:0,y:0},this.#angle=0,this.#speed=1,this.#moving=!1,this.#penUp=!1,this.#width=a,this.#height=n,this.#color="black",this.#invisibleColor="rgb(0, 0, 0, 0)",this.#backgroundCanvas=t,this.#foregroundCanvas=i,this.#idleSprite=s,this.#moveSprite=e,this.#spritePosition={x:0,y:0},this.#actions=[],this.init=this.init.bind(this)}async init(){let t=33-1e3*(await this.#update()+await this.#draw());t>0&&await e(33-t)}async#update(){let t=performance.now();return this.#actions.length&&(await this[this.#actions[0].action](...this.#actions[0].parameters),this.#actions.splice(0,1)),performance.now()-t}get angle(){return this.#angle}forward(t){this.#actions.push({action:"forwardAction",parameters:[t]})}async forwardAction(t){this.#backgroundCanvas.beginPath(),this.#moving=!0,t=parseInt(t);let i=null;for(;t;)i=Math.abs(t)<this.#speed/10*66?t:t>0?Math.round(this.#speed/10*66):-1*Math.round(this.#speed/10*66),this.#backgroundCanvas.moveTo(this.#position.x,this.#position.y),this.#position=n(this.#angle,i,this.#position),this.#spritePosition.x+=i,this.#backgroundCanvas.lineTo(this.#position.x,this.#position.y),this.#backgroundCanvas.stroke(),this.#draw(),t-=i,await e(66);this.#moving=!1}backward(t){this.#actions.push({action:"forwardAction",parameters:[-t]})}setLineColor(t){this.#actions.push({action:"setLineColorAction",parameters:[t]})}async setLineColorAction(t){this.#color=t,this.#penUp||(this.#backgroundCanvas.beginPath(),this.#backgroundCanvas.strokeStyle=t)}circle(t){this.#actions.push({action:"circleAction",parameters:[t]})}async circleAction(t){this.#backgroundCanvas.beginPath(),this.#backgroundCanvas.arc(this.#position.x,this.#position.y,t,0,2*Math.PI)}rectangle(t,i){this.#actions.push({action:"rectangleAction",parameters:[t,i]})}async rectangleAction(t,i){this.#backgroundCanvas.rect(this.#position.x,this.#position.y,t,i)}speed(t){if(!t)return this.#speed;this.#actions.push({action:"speedAction",parameters:[t]})}async speedAction(t){this.#speed=t}async clear(){this.#foregroundCanvas.fillStyle="rgba(0,0,0,1)",this.#foregroundCanvas.globalCompositeOperation="destination-out"}turtleCommandsList(t){this.#actions=t}right(t){this.#actions.push({action:"rightAction",parameters:[t]})}async rightAction(t){for(this.#angle+=parseInt(t);this.angle>=360;)this.#angle=this.#angle-360;this.#rotateForegroundCanvas("right",t)}left(t){this.#actions.push({action:"leftAction",parameters:[t]})}async leftAction(t){for(this.#angle-=parseFloat(t);this.angle<0;)this.#angle=this.#angle+360;this.#rotateForegroundCanvas("left",t)}#rotateForegroundCanvas(t,i){"left"==t&&(i*=-1),this.#foregroundCanvas.translate(this.#spritePosition.x,this.#spritePosition.y),this.#foregroundCanvas.rotate(a(i)),this.#foregroundCanvas.translate(-this.#spritePosition.x,-this.#spritePosition.y)}setPosition(t,i){this.#actions.push({action:"setPositionAction",parameters:[t,i]})}async setPositionAction(t,i){t=parseFloat(t),i=parseFloat(i),i*=-1,this.#backgroundCanvas.moveTo(t,i),this.#position={x:t,y:i},this.#foregroundCanvas.setTransform(1,0,0,1,.5*this.#width,.5*this.#height),this.#spritePosition={x:t,y:i},this.#rotateForegroundCanvas("",this.#angle)}async getPosition(){for(;0!==this.#actions.length;)await e(33);return this.#position}penUp(){this.#actions.push({action:"penUpAction",parameters:[]})}async penUpAction(){this.#penUp=!0,this.#backgroundCanvas.strokeStyle=this.#invisibleColor,this.#backgroundCanvas.beginPath()}penDown(){this.#actions.push({action:"penDownAction",parameters:[]})}async penDownAction(){this.#penUp=!1,this.#backgroundCanvas.strokeStyle=this.color,this.#backgroundCanvas.beginPath(),this.#backgroundCanvas.strokeStyle=this.#color}async#draw(){var t=performance.now();return this.#backgroundCanvas.stroke(),this.#foregroundCanvas.clearRect(this.#spritePosition.x-this.#width,this.#spritePosition.y-this.#height,3*this.#width,3*this.#height),this.#moving,await this.#moveSprite.run(this.#spritePosition),performance.now()-t}}class o extends HTMLElement{#backgroundCanvas;#parentDiv;static get observedAttributes(){return["width","height"]}constructor(){super(),this.#parentDiv=document.createElement("div"),this.#backgroundCanvas=document.createElement("canvas"),this.#parentDiv.appendChild(this.#backgroundCanvas)}get width(){return this.getAttribute("width")}set width(t){this.setAttribute("width",t)}get height(){return this.getAttribute("height")}set height(t){this.setAttribute("height",t)}get canvasClass(){return this.getAttribute("canvas-class")}set canvasClass(t){this.setAttribute("canvas-class",t)}connectedCallback(){this.width||(this.width=300),this.height||(this.height=300),this.canvasClass||(this.canvasClass="border: solid 1px black;"),this.initializeCanvas()}initializeCanvas(t=document.body){this.#backgroundCanvas.width=this.width,this.#backgroundCanvas.height=this.height,this.#backgroundCanvas.style="position: absolute !important",this.#backgroundCanvas.className=this.canvasClass,this.#parentDiv.style="position: relative;",this.#backgroundCanvas.getContext("2d").translate(.5*this.#backgroundCanvas.width,.5*this.#backgroundCanvas.height),t.appendChild(this.#parentDiv)}attributeChangedCallback(t,i,s){if(i!==s)switch(t){case"width":this.width=s;break;case"height":this.height=s;break;case"canvas-class":this.canvasClass=s}}async#update(t){for(;;)await t.init()}#buildForwardCanvas(){let t=document.createElement("canvas");t.style="position: absolute;",this.#parentDiv.appendChild(t);let i=t.getContext("2d");return t.width=this.width,t.height=this.height,i.translate(.5*t.width,.5*t.height),i}#idleSprite(t,i){return null===t&&((t=new Image).src="https:"!==location.protocol?"../assets/idle_turtle.png":"https://i.imgur.com/VyRnYnX.png"),new h(1,10,t,i,.2)}#moveSprite(t,i){return null===t&&((t=new Image).src="https:"!==location.protocol?"../assets/turtle.png":"https://i.imgur.com/scpCzY8.png"),new h(1,8,t,i,.2)}getTurtle(t=null,i=null){let s=this.#buildForwardCanvas(),e=new r(this.#backgroundCanvas.getContext("2d"),s,this.#idleSprite(t,s),this.#moveSprite(i,s),this.width,this.height);return this.#update(e),e}getImageData(t,i,s,e){return this.#backgroundCanvas.getContext("2d").getImageData(t,i,s,e)}}customElements.define("x-turtle",o)}}]);