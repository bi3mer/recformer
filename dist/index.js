class b{x;y;constructor(t,i){this.x=t,this.y=i}copy(){return new b(this.x,this.y)}zero(){this.x=0,this.y=0}equals(t){return this.x==t.x&&this.y==t.y}add(t){return new b(this.x+t.x,this.y+t.y)}addInPlace(t){this.x+=t.x,this.y+=t.y}subtract(t){return new b(this.x-t.x,this.y-t.y)}subtractInPlace(t){this.x-=t.x,this.y-=t.y}scalarAdd(t){this.x+=t,this.y+=t}scalarSubtract(t){this.x-=t,this.y-=t}scalarMultiply(t){return new b(this.x*t,this.y*t)}scalarMultiplyInPlace(t){this.x*=t,this.y*=t}dot(t){return this.x*t.x+this.y*t.y}squareComponents(){return this.x*this.x+this.y*this.y}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let t=this.magnitude();this.x/=t,this.y/=t}squareDistance(t){let i=this.x-t.x,s=this.y-t.y;return i*i+s*s}angle(t){return Math.atan2(t.y-this.y,t.x-this.x)}}function Lt(t,i){return Math.floor(Math.random()*(i-t+1)+t)}function Ht(t,i,s){return Math.min(Math.max(t,i),s)}function G(t,i,s,r){let o=new b(Ht(s.x,t.x,t.x+i.x),Ht(s.y,t.y,t.y+i.y));return s.subtract(o).squareComponents()<r*r}function Mt(t,i,s,r){let{x:o,y:n}=t,e=o+i.x,f=n+i.y,d=s.x,v=s.y,Q=d+r.x,J=v+r.y;return o<Q&&e>d&&n<J&&f>v}var Dt=typeof window!=="undefined",x=[];function Gt(t){x.push(new Audio("audio/coin_1.wav")),x.push(new Audio("audio/coin_2.wav")),x.push(new Audio("audio/coin_3.wav")),x.push(new Audio("audio/coin_4.wav")),x.push(new Audio("audio/coin_5.wav")),x.push(new Audio("audio/laser.wav"));let i=()=>{let s=!0;for(let r=0;r<x.length;++r)if(!x[r].readyState){s=!1;break}if(s)x[5].volume=0.4,t();else setTimeout(i,100)};i()}function Kt(){if(Dt){let t=Lt(0,4);x[t].currentTime=0.15,x[t].play()}}function ti(){if(Dt)x[5].currentTime=0,x[5].play()}var Z;((h)=>{h[h.LEFT=0]="LEFT";h[h.RIGHT=1]="RIGHT";h[h.DOWN=2]="DOWN";h[h.UP=3]="UP";h[h.A=4]="A";h[h.D=5]="D";h[h.E=6]="E";h[h.G=7]="G";h[h.H=8]="H";h[h.I=9]="I";h[h.Q=10]="Q";h[h.R=11]="R";h[h.S=12]="S";h[h.W=13]="W";h[h.SPACE=14]="SPACE";h[h.ESCAPE=15]="ESCAPE";h[h.ENTER=16]="ENTER";h[h.SHIFT=17]="SHIFT";h[h.INVALID=18]="INVALID"})(Z||={});class l{static _keys=[];static init(){for(let t=0;t<Object.keys(Z).length;++t)l._keys.push(!1);window.addEventListener("keydown",l.onKeyDown),window.addEventListener("keyup",l.onKeyUp)}static isKeyDown(...t){let i=t.length;for(let s=0;s<i;++s)if(l._keys[t[s]])return!0;return!1}static keyStrToKey(t){switch(t){case"Down":case"ArrowDown":return 2;case"Up":case"ArrowUp":return 3;case"Right":case"ArrowRight":return 1;case"Left":case"ArrowLeft":return 0;case" ":case"Space":return 14;case"Escape":return 15;case"a":case"A":return 4;case"e":case"E":return 6;case"s":case"S":return 12;case"d":case"D":return 5;case"w":case"W":return 13;case"r":case"R":return 11;case"q":case"Q":return 10;case"g":case"G":return 7;case"h":case"H":return 8;case"i":case"I":return 9;case"Shift":return 17;case"Enter":return 16;default:return console.warn(`Unhandled key: ${t}.`),18}}static onKeyDown(t){let i=l.keyStrToKey(t.key);if(l._keys[i]=!0,i==2||i==3||i==0||i==1)t.preventDefault();return!1}static onKeyUp(t){return l._keys[l.keyStrToKey(t.key)]=!1,!1}static clear(){for(let t=0;t<l._keys.length;++t)l._keys[t]=!1}}class gt{scenes={};registerScene(t,i){if(this.scenes[t]===void 0)this.scenes[t]=i;else console.error(`Key "${t}" for scene already exists! Scene not added to SceneManager.`)}getScene(t){return this.scenes[t]}}var a="#fe546f";var g="#ffd080",R="#fffdff",ii="#0bffe6";var K="#9696ff";var si="#130833";var w=720,C=480,I=32,$=15,ri=17,oi=3,ni=2*Math.PI,tt=0,it=1,st=2,rt=20,P=30,ei=0.625,ui=0.9375,U=31,W=31,k=0.96875,Y=0.96875,ot=16,nt=16,et=0.5,ut=0.5,ft=25,dt=15,ht=0.78125,pt=0.46875,fi=10,di=0.3125,wt=2.5,Ct=0.12109375,hi=3.875,lt=0.6,pi=2,li=2.5,mi=150,bi=10,vi=10,yi=10,O=0.5,ai=0.5,F="start",j="end",p="death";class c{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}class St extends c{ctx;constructor(t){super();this.ctx=t}onEnter(){this.ctx.clearRect(0,0,w,C),this.ctx.font="30px Arial",this.ctx.fillStyle=R,this.ctx.fillText("You won! Congratulations!",170,C/2)}update(t){}render(){}_onExit(){}}var T="main menu",X="game",mt="player won",z="transition",bt="lost",_="won";class $t extends c{ctx;transitionScene;constructor(t,i){super();this.ctx=t,this.transitionScene=i}onEnter(){l.clear(),this.ctx.fillStyle=g,this.ctx.font="48px Arial",this.ctx.fillText("YOU WON",250,200),this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to keep going.",180,400)}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=X,this.changeScene=z}render(){}_onExit(){}}class Ft extends c{ctx;transitionScene;constructor(t,i){super();this.ctx=t,this.transitionScene=i}onEnter(){l.clear(),this.ctx.fillStyle=a,this.ctx.font="48px Arial",this.ctx.fillText("YOU LOST",243,200),this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to try again.",195,400)}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=X,this.changeScene=z}render(){}_onExit(){}}class H{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}class zt extends H{targetScene=T;timer=0;ctx;constructor(t){super();this.ctx=t}onEnter(){}update(t){if(this.timer+=t,this.timer>0.6)this.changeScene=this.targetScene}render(){let t=this.timer/0.5;this.ctx.fillStyle=`rgba(0,0,0, ${t})`,this.ctx.fillRect(0,0,w,C)}_onExit(){this.timer=0}}var Fi=Math.floor(w/I)-1;class Ut extends c{ctx;transitionScene;fakePlayerPos;sign;constructor(t,i){super();this.ctx=t,this.transitionScene=i,this.fakePlayerPos=new b(10,($-2)*I),this.sign=1}onEnter(){this.ctx.clearRect(0,0,w,C),this.ctx.fillStyle=g,this.ctx.font="48px Arial",this.ctx.fillText("Recformer",247,100),this.ctx.fillStyle=g,this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to start",220,C*0.55);let t=this.fakePlayerPos.y+I;this.ctx.strokeStyle="white";for(let i=0;i<25;++i)this.ctx.strokeRect(i*I,t,U,W)}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=X,this.changeScene=z;let i=this.fakePlayerPos.x;if(i<1||i>Fi)this.sign*=-1;this.fakePlayerPos.x+=t*this.sign}render(){let t=this.fakePlayerPos.x*I,i=($-2)*I;this.ctx.fillStyle=si,this.ctx.clearRect(0,this.fakePlayerPos.y,w,P),this.ctx.fillStyle=K,this.ctx.fillRect(t,i,rt,P)}_onExit(){}}var xi=720;var B=32;var bs=2*Math.PI;class kt{startCol=0;endCol=0;offsetX=0;colsPerScreen=Math.ceil(xi/B);update(t){let i=t-this.colsPerScreen/2;this.startCol=Math.max(0,Math.floor(i)),this.endCol=this.startCol+this.colsPerScreen,this.offsetX=-i*B+this.startCol*B}columnToScreen(t){return(t-this.startCol)*B+this.offsetX}rowToScreen(t){return t*B}}class Nt{src;tgt;probability;constructor(t,i,s){this.src=t,this.tgt=i,this.probability=s}}class L{name;reward;utility;isTerminal;neighbors;constructor(t,i,s,r,o){this.name=t,this.reward=i,this.utility=s,this.isTerminal=r,this.neighbors=o}}class vt{nodes;edges;constructor(){this.nodes={},this.edges={}}getNode(t){return this.nodes[t]}hasNode(t){return t in this.nodes}addNode(t){this.nodes[t.name]=t}addDefaultNode(t,i=1,s=0,r=!1,o=null){if(o==null)o=[];this.nodes[t]=new L(t,i,s,r,o)}removeNode(t){let i=[];for(let s of Object.values(this.edges)){if(s.src==t||s.tgt==t)i.push(s);let r=s.probability,o=-1;for(let d=0;d<r.length;d++){let[v,Q]=r[d];if(v==t){o=d;break}}if(o==-1)continue;let n=r[o][1];r.splice(o,1);let e=r.length,f=n/e;s.probability=r.map(([d,v])=>[d,v+f])}for(let s of i)this.removeEdge(s.src,s.tgt);delete this.nodes[t]}getEdge(t,i){return this.edges[`${t},${i}`]}hasEdge(t,i){return`${t},${i}`in this.edges}addEdge(t){this.edges[`${t.src},${t.tgt}`]=t;let i=this.nodes[t.src].neighbors;if(!i.includes(t.tgt))i.push(t.tgt)}addDefaultEdge(t,i,s=null){if(s==null)s=[[i,1]];this.addEdge(new Nt(t,i,s))}removeEdge(t,i){let s=this.nodes[t],r=s.neighbors.indexOf(i);s.neighbors.splice(r,1),delete this.edges[`${t},${i}`]}neighbors(t){return this.nodes[t].neighbors}setNodeUtilities(t){for(let[i,s]of Object.entries(t))this.nodes[i].utility=s}utility(t){return this.nodes[t].utility}reward(t){return this.nodes[t].reward}isTerminal(t){return this.nodes[t].isTerminal}mapNodes(t){for(let i of Object.values(this.nodes))t(i)}mapEdges(t){for(let i of Object.values(this.edges))t(i)}}function V(t){return t[Math.floor(Math.random()*t.length)]}function A(t,i,s,r){let o=t.getEdge(i,s).probability,n=o.length,e=0;for(let f=0;f<n;++f){let[d,v]=o[f];e+=v*(t.reward(d)+r*t.utility(d))}return e}function yt(t,i,s){let r=t.getNode(i);if(r.isTerminal)return 0;let o=r.neighbors,n=o.length,e=-1/0;for(let f=0;f<n;++f)e=Math.max(e,A(t,i,o[f],s));return e}function qt(t){for(let i in t.nodes)t.nodes[i].utility=0}function It(t){let i={};for(let s in t.nodes)if(!t.getNode(s).isTerminal)i[s]=[...t.neighbors(s)];return i}function ct(t,i){let s={};for(let r in t.nodes){if(t.getNode(r).isTerminal)continue;let o=-1/0,n=[];for(let e of t.neighbors(r)){let f=A(t,r,e,i);if(f===o)n.push(e);else if(f>o)o=f,n.length=0,n.push(e)}s[r]=n}return s}function zi(t,i,s,r){for(let o=0;o<r;++o)for(let n in t.nodes){let e=t.getNode(n);if(!e.isTerminal)e.utility=A(t,n,V(i[n]),s)}}function Ui(t,i,s,r){for(let o=0;o<r;++o){let n={};for(let e in t.nodes)if(!t.getNode(e).isTerminal)n[e]=A(t,e,V(i[e]),s);t.setNodeUtilities(n)}}function ki(t,i,s,r){for(let o=0;o<r;++o)for(let n in t.nodes)t.getNode(n).utility=yt(t,n,s)}function Ni(t,i,s,r){for(let o=0;o<r;++o){let n={};for(let e in t.nodes)n[e]=yt(t,e,s);t.setNodeUtilities(n)}}function gi(t,i,s){let r=!1;for(let o in t.nodes){if(t.getNode(o).isTerminal)continue;let n=null,e=-1/0;for(let f of t.neighbors(o)){let d=A(t,o,f,s);if(d===e);else if(d>e)n=f,e=d}if(V(i[o])!==n)i[o].length=0,i[o].push(n),r=!0}return r}function Qt(t,i,s=!1,r=!1,o=10,n=!0){if(n)qt(t);let e=It(t),f;if(s&&r)f=zi;else if(s&&!r)f=Ui;else if(!s&&r)f=ki;else f=Ni;let d=!0;while(d)f(t,e,i,o),d=gi(t,e,i);return f(t,e,i,o),gi(t,e,i),ct(t,i)}class y extends L{visitedCount;sumPercentCompleted;depth;designerReward;playerReward;constructor(t,i,s,r,o,n){super(t,i,s,r,o);this.designerReward=i,this.playerReward=0,this.depth=n,this.visitedCount=1,this.sumPercentCompleted=1}updateReward(){this.reward=this.designerReward*this.visitedCount}}var u=new vt;u.addNode(new y(F,0,0,!1,[],-1));u.addNode(new y(p,-1,0,!0,[],-1));u.addNode(new y(j,1,0,!0,[],-1));u.addNode(new y("1-a",-0.95,0,!1,[],1));u.addNode(new y("2-a",-0.925,0,!1,[],2));u.addNode(new y("2-b",-0.925,0,!1,[],2));u.addNode(new y("3-a",-0.9,0,!1,[],3));u.addNode(new y("3-b",-0.9,0,!1,[],3));u.addNode(new y("4-a",-0.825,0,!1,[],4));u.addNode(new y("4-b",-0.825,0,!1,[],4));u.addNode(new y("5-a",-0.8,0,!1,[],5));u.addNode(new y("5-b",-0.8,0,!1,[],5));u.addNode(new y("5-c",-0.8,0,!1,[],5));u.addNode(new y("6-a",-0.775,0,!1,[],6));u.addNode(new y("7-a",-0.75,0,!1,[],7));u.addNode(new y("6-b",-0.775,0,!1,[],6));u.addNode(new y("1-b",-0.95,0,!1,[],1));u.addDefaultEdge(F,"1-a",[["1-a",0.99],[p,0.01]]);u.addDefaultEdge("1-a","2-b",[["2-b",0.99],[p,0.01]]);u.addDefaultEdge("1-a","2-a",[["2-a",0.99],[p,0.01]]);u.addDefaultEdge("2-a","3-a",[["3-a",0.99],[p,0.01]]);u.addDefaultEdge("2-b","3-b",[["3-b",0.99],[p,0.01]]);u.addDefaultEdge("3-a","4-b",[["4-b",0.99],[p,0.01]]);u.addDefaultEdge("3-a","4-a",[["4-a",0.99],[p,0.01]]);u.addDefaultEdge("3-b","4-b",[["4-b",0.99],[p,0.01]]);u.addDefaultEdge("3-b","4-a",[["4-a",0.99],[p,0.01]]);u.addDefaultEdge("4-a","5-b",[["5-b",0.99],[p,0.01]]);u.addDefaultEdge("4-a","5-a",[["5-a",0.99],[p,0.01]]);u.addDefaultEdge("4-a","5-c",[["5-c",0.99],[p,0.01]]);u.addDefaultEdge("4-b","5-b",[["5-b",0.99],[p,0.01]]);u.addDefaultEdge("4-b","5-a",[["5-a",0.99],[p,0.01]]);u.addDefaultEdge("4-b","5-c",[["5-c",0.99],[p,0.01]]);u.addDefaultEdge("5-a","6-a",[["6-a",0.99],[p,0.01]]);u.addDefaultEdge("5-a","6-b",[["6-b",0.99],[p,0.01]]);u.addDefaultEdge("5-b","6-a",[["6-a",0.99],[p,0.01]]);u.addDefaultEdge("5-b","6-b",[["6-b",0.99],[p,0.01]]);u.addDefaultEdge("5-c","6-a",[["6-a",0.99],[p,0.01]]);u.addDefaultEdge("5-c","6-b",[["6-b",0.99],[p,0.01]]);u.addDefaultEdge("6-a","7-a",[["7-a",0.99],[p,0.01]]);u.addDefaultEdge("7-a","end",[["end",0.99],[p,0.01]]);u.addDefaultEdge("6-b","7-a",[["7-a",0.99],[p,0.01]]);u.addDefaultEdge(F,"1-b",[["1-b",0.99],[p,0.01]]);u.addDefaultEdge("1-b","2-b",[["2-b",0.99],[p,0.01]]);u.addDefaultEdge("1-b","2-a",[["2-a",0.99],[p,0.01]]);var wi={"1-a":["------------XXX-","-------------T--","----------------","----------------","----------------","----------------","----------------","----------------","-----X-C-----X--","--------------b-","-----------o----","--------o-XX----","------o-XXXX----","------XXXXXX----","XXXXXXXXXXXX^XXX"],"2-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-------XXXXXXXX-------","----------------------","-------V--o---V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"2-b":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"3-a":["----------------------","----------------------","----------------------","----------------------","-----------o----------","----------------------","---------XXXXX--------","-----------o----------","----------------------","-------X-H-----X------","---XX--XXXXXXXXX--XX--","----------------------","-------V---o---V----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"3-b":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","--------V---V---------","----------o-----------","----------------------","------XXXXXXXXX-------","----------------------","----------o---------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"4-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------XXX---","-----------------V----","-------X---XX-----V---","------XX------o-V---o-","-----XXX--------------","XXXXXXXX---XXXXXXXXXXX"],"4-b":["--------------------XX","--------------------XX","--------------------XX","--------------------XX","--------------------XX","-----------X-H---o--XX","-----------------o--XX","---------o----------XX","-----------XXXXXXX--XX","--------------------XX","-------X------------XX","------XXX-----------XX","-----XXXXX-----------o","----XXXXXXX-----------","XXXXXXXXXXXXXXXX--XXXX"],"5-a":["--------XXXXXXXXXXXXXX--------","-------------------ooX--------","---------------------X--------","---------------------X--------","------------------XXXX--------","------------------X-----------","-----------o--XXXXX-----------","------------------------------","---------XX-----------------o-","------------------------------","--------------XX---XXX----XXXX","------------------------------","----------XX------------------","------------------------------","XXXXXXXX----------------------"],"5-b":["------------------------------","-o----------------------------","------------------------------","XXX---------------------------","------------------------------","-----XXX----------------------","------------------------------","-----------XXX----------------","-o--------------------------o-","------XXX---------------------","XXX-----------------------XXXX","------------XXX-------XX------","------------------XX----------","------------------------------","XXXXXXXX---XXXXX--------------"],"5-c":["o-----------------------------","------------------------------","X---XX------------------------","------------------------------","------------------------------","XX----------------------------","--------XXXXX-----------------","--------Xoo-------------------","XXX-----Xoo----o------------o-","--------X---------------------","--------XXX---XX----XX----XXXX","XXXX--------------------------","------------------------------","------------------------------","XXXXXXXX----------------------"],"6-a":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","-------oo---XXXXXXXX----------","-o----------XXXXXXXX----------","------XXXX--XXXXXXXX----------","--------------o---------------","XXXX--------------------------","-------------XXXX-----------o-","---------------------XX-------","XXXXXXXX-----------------XXXXX"],"7-a":["-------------------V---------------","-----------------o---o-------------","------------X-H------------H--XXX--","-----V------XXXXXXXXXXXXXXXXXXXXX--","--------XX----o--------------------","-----------------------------------","-----------XXXXXX---Ho-------------","-----------------------------------","-------------V------XX--------H----","-----------------------------------","XX--------o------XXXXX----H--------","-----------------------------------","---X----H----H-X-----------------o-","---XXXXXXXXXXXXX-------------------","XXXX--------------------------XXXXX"],end:["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----oooooooooooooooooo","XXXXXXXXXXXXXXXXXXXXXX"],"6-b":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX--o-------","-o--------XXXXXXXXXX----------","----------XXXXXXXXXX--X-------","----------XXXXXXXXXX----------","XXX-------XXXXXXXXXXX---------","------XX-----oooo-----------o-","------------------------------","XXXX--------XXXXXX---XX---XXXX"],"1-b":["---------XXX----","----------T-----","----------------","----------------","----------------","----------------","----------------","----X-----X-----","-------oo------C","----------------","-------XX-------","----o-XXXX-o----","-----XXXXXX-----","---XXXXXXXXXX---","XXXXXXXXXXXXXXXX"]};class Jt{playerIsOnLastLevel=!1;keys;columnsPerLevel;lossesInARow=0;playerWonLastRound=!1;constructor(){}update(t,i){let s=this.keys.length,r=[];if(t){for(let n=0;n<s;++n)r.push(1);this.lossesInARow=0}else{let n=i;for(let e=0;e<s;++e)if(n>this.columnsPerLevel[e])r[e]=1,n-=this.columnsPerLevel[e];else{r[e]=n/this.columnsPerLevel[e];break}}let o=r.length;for(let n=0;n<o;++n){let e=r[n],f=this.keys[n],d=u.getNode(f);if(e===1){if(!u.hasEdge(F,f))u.addDefaultEdge(F,f,[[f,1],[p,0]])}++d.visitedCount,d.sumPercentCompleted+=e,d.updateReward();let v=d.sumPercentCompleted/d.visitedCount,Q=1-v;u.mapEdges((J)=>{if(J.tgt===f)J.probability[0][1]=v,J.probability[1][1]=Q})}if(!t){++this.lossesInARow;for(let n=0;n<this.lossesInARow;++n){let e=u.getNode(F).neighbors,f=e.length;if(f===1)break;let d="",v=-1e4;for(let Q=0;Q<f;++Q){let J=e[Q],_t=u.getNode(J).depth;if(_t>v)d=J,v=_t}console.log("removing edge:",d,v),u.removeEdge(F,d)}}this.playerWonLastRound=t}get(t){let i=Qt(u,0.95,!0,!0,20);if(this.columnsPerLevel=[],this.playerWonLastRound)this.keys=[V(i[F])];else this.keys=[F];for(let o=0;o<t;++o){let n=V(i[this.keys[o]]);if(this.keys.push(n),n===j)break}this.keys.splice(0,1),this.playerIsOnLastLevel=this.keys.includes(j);let s=Array($).fill(""),r=this.keys.length;for(let o=0;o<r;++o){let n=wi[this.keys[o]];this.columnsPerLevel.push(n[0].length);for(let e=0;e<$;++e)s[e]+=n[e]}return s}}class M{pos;type;dead=!1;velocity=new b(0,0);gravity=new b(0,100);constructor(t,i){this.pos=t,this.type=i}physicsUpdate(t){this.velocity.addInPlace(this.gravity.scalarMultiply(t)),this.velocity.y=Math.min(this.velocity.y,30),this.pos.addInPlace(this.velocity.scalarMultiply(t))}}class m extends M{size;constructor(t,i,s,r,o){super(new b(t,i),o);this.size=new b(s,r)}collision(t){if(t instanceof m){if(Mt(this.pos,this.size,t.pos,t.size))this.handleCollision(t),t.handleCollision(this)}else if(t instanceof D){if(G(this.pos,this.size,t.pos,t.r))this.handleCollision(t),t.handleCollision(this)}}}class D extends M{r;constructor(t,i,s,r){super(new b(t,i),r);this.r=s}collision(t){if(t instanceof m){if(G(t.pos,t.size,this.pos,this.r))this.handleCollision(t),t.handleCollision(this)}}}var E=0,S=1,at=2,N=3,xt=4,q=5;class Xt extends D{angle=0;start;constructor(t,i){super(t,i,di,N);this.start=new b(t,i),this.gravity.y=0}update(t){this.angle+=t,this.velocity.x=2*wt*Math.cos(this.angle),this.velocity.y=wt*Math.sin(this.angle)}handleCollision(t){if(t.type===q)this.dead=!0}render(t,i){t.fillStyle=a,t.beginPath(),t.arc(i.columnToScreen(this.pos.x),i.rowToScreen(this.pos.y),fi,0,ni),t.fill()}}class Vt extends m{playerPos;spawnBullet;color;time=0;state=0;constructor(t,i,s,r){super(t,i,k,Y,S);this.playerPos=s,this.spawnBullet=r,this.color=g,this.gravity.y=0}update(t){switch(this.state){case 0:{if(this.pos.squareDistance(this.playerPos)<=mi)this.color=a,this.state=1;break}case 1:{if(this.time+=t,this.time>=li)this.time=0,this.state=2;break}case 2:{this.state=0,this.color=g;let i=this.pos.angle(this.playerPos),s=Math.cos(i),r=Math.sin(i);this.spawnBullet(this.pos.x+(O+k)*s,this.pos.y+(O+k)*r);break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,i){t.strokeStyle=this.color;let s=i.columnToScreen(this.pos.x),r=i.rowToScreen(this.pos.y),o=U/2,n=2*o,e=new b(s+o,r);t.lineWidth=2,t.beginPath(),t.arc(e.x,e.y,o,0,Math.PI),t.stroke();let f=this.pos.angle(this.playerPos),d=Math.cos(f),v=Math.sin(f);t.lineWidth=4,t.beginPath(),t.moveTo(e.x+o*d,e.y+o*v),t.lineTo(e.x+n*d,e.y+n*v),t.stroke(),t.lineWidth=1}}class Zt extends m{constructor(t,i){super(t,i,k,Y,S)}update(t){}handleCollision(t){}render(t,i){t.strokeStyle=R,t.strokeRect(i.columnToScreen(this.pos.x),i.rowToScreen(this.pos.y),U,W)}}var qi=1000,Ii=2;class Rt extends m{minY;maxY;yMod;timeGone;constructor(t,i){super(t+0.25,i+0.25,et,ut,xt);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=i+0.3,this.minY=i+0.15,this.pos.y=this.minY,this.velocity.y=this.yMod,this.timeGone=0}update(t){if(this.pos.y>100){if(this.timeGone+=t,this.timeGone>=Ii)this.pos.y=this.maxY,this.velocity.y=-this.yMod}else if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===E)this.pos.y=qi,this.timeGone=0}render(t,i){t.fillStyle=ii,t.fillRect(i.columnToScreen(this.pos.x),i.rowToScreen(this.pos.y),ot,nt)}}class Wt extends m{constructor(t,i,s){super(t,i,O,ai,q);this.gravity.y=0,this.velocity=s.subtract(this.pos),this.velocity.normalize(),this.velocity.scalarMultiplyInPlace(bi)}update(t){}handleCollision(t){this.dead=!0}render(t,i){t.fillStyle=a,t.fillRect(i.columnToScreen(this.pos.x),i.rowToScreen(this.pos.y),vi,yi)}}class Yt extends m{minY;maxY;yMod;constructor(t,i){super(t+0.25,i+0.25,et,ut,at);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=i+0.3,this.minY=i+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===E)Kt(),this.dead=!0}render(t,i){t.fillStyle=g,t.fillRect(i.columnToScreen(this.pos.x),i.rowToScreen(this.pos.y),ot,nt)}}class Bt extends m{maxColumns;constructor(t,i,s){super(t+0.25,i+0.25,ht,pt,N);this.velocity.x=3,this.gravity.y=0,this.maxColumns=s}update(t){if(this.pos.x<0||this.pos.x>this.maxColumns)this.velocity.x*=-1}handleCollision(t){if(t.type===S){let i=this.pos.add(this.size.scalarMultiply(0.5)),s=t.pos.add(t.size.scalarMultiply(0.5)),r=i.subtract(s);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(r.x/this.size.x)>Math.abs(r.y/this.size.y))if(this.velocity.x*=-1,r.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x}else if(t.type===q)this.dead=!0}render(t,i){t.fillStyle=a,t.fillRect(i.columnToScreen(this.pos.x),i.rowToScreen(this.pos.y),ft,dt)}}class At extends m{spawnLaser;color;playerPos;time=0;state=0;constructor(t,i,s,r){super(t,i,k,Y,S);this.playerPos=s,this.spawnLaser=r,this.color=g,this.gravity.y=0}update(t){if(this.pos.squareDistance(this.playerPos)>150)this.state=0;switch(this.time+=t,this.state){case 0:{if(this.time>=lt)this.time=0,this.state=1,this.color=g;break}case 1:{if(this.time>=pi)this.time=0,this.state=0,this.color=a,this.spawnLaser();break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,i){t.strokeStyle=this.color;let s=i.columnToScreen(this.pos.x),r=i.rowToScreen(this.pos.y),o=r+W;t.beginPath(),t.moveTo(s,o),t.lineTo(s+U/2,r),t.lineTo(s+U,o),t.lineTo(s,o),t.stroke(),t.strokeStyle=R,t.beginPath(),t.moveTo(s,r),t.lineTo(s+U,r),t.stroke()}}class Et extends m{time=0;constructor(t,i,s){super(t+(k-Ct)/2,i,Ct,s,N);this.gravity.y=0}update(t){if(ti(),this.time+=t,this.time>=lt)this.dead=!0}handleCollision(t){}render(t,i){t.fillStyle=a,t.fillRect(i.columnToScreen(this.pos.x),i.rowToScreen(this.pos.y),hi,this.size.y*I)}}class Pt extends m{constructor(t,i){super(t,i+0.1,pt,ht,N);this.velocity.y=3,this.gravity.y=0,this.pos.x+=0.25}update(t){if(this.pos.y<0||this.pos.y>=$)this.velocity.y*=-1}handleCollision(t){if(t.type===S){let i=this.pos.add(this.size.scalarMultiply(0.5)),s=t.pos.add(t.size.scalarMultiply(0.5)),r=i.subtract(s);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(r.x/this.size.x)<Math.abs(r.y/this.size.y))if(this.velocity.y*=-1,r.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y}else if(t.type===q)this.dead=!0}render(t,i){t.fillStyle=a,t.fillRect(i.columnToScreen(this.pos.x),i.rowToScreen(this.pos.y),dt,ft)}}var Ci=6,Si=8,ci=0.4;class Ot extends m{movingRight=!1;movingLeft=!1;moveMod=0;jumpTime=0;squash=1;stretch=1;coinsCollected=0;maxColumn=0;constructor(t,i){super(t,i,ei,ui,E)}update(t){if(this.pos.y>ri){this.dead=!0;return}if(this.velocity.x=0,l.isKeyDown(5,1))this.movingRight=!0,this.velocity.x=Ci,this.moveMod=Math.min(Si,this.moveMod+t);if(l.isKeyDown(4,0))if(this.movingRight)this.movingRight=!1,this.velocity.x=0;else this.movingLeft=!0,this.velocity.x=-Ci,this.moveMod=Math.min(Si,this.moveMod+t);if(this.jumpTime<ci&&l.isKeyDown(14,3)){if(this.jumpTime===0)this.velocity.y=-15;else if(this.jumpTime<0.2)this.velocity.y-=2;this.velocity.y=Math.max(-20,this.velocity.y),this.squash=Math.min(1.03,this.squash+0.01),this.stretch=Math.max(0.97,this.stretch-0.01),this.jumpTime+=t}else if(this.squash!=this.stretch)this.squash+=0.01,this.stretch-=0.01;this.maxColumn=Math.max(this.pos.x,this.maxColumn)}handleCollision(t){switch(t.type){case S:{let i=this.pos.add(this.size.scalarMultiply(0.5)),s=t.pos.add(t.size.scalarMultiply(0.5)),r=i.subtract(s);this.size.add(t.size).scalarMultiply(0.5);let n=Math.abs(Math.atan(r.y/r.x));if(!(n<0.96&&n>0.698)&&Math.abs(r.x/this.size.x)>Math.abs(r.y/this.size.y))if(r.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x;else if(r.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y,this.velocity.y=0,this.jumpTime=0,this.stretch=1.01,this.squash=0.99;break}case at:{++this.coinsCollected;break}case q:case N:{this.dead=!0;break}case xt:{this.jumpTime=0,this.velocity.y=Math.min(this.velocity.y,0);break}default:{console.warn(`Player unhandled collision type: ${t.type}.`);break}}}render(t,i){t.fillStyle=K;let s=i.columnToScreen(this.pos.x),r=i.rowToScreen(this.pos.y),o=P*this.squash,n=rt*this.stretch;if(this.movingRight){let e=new Path2D;e.moveTo(s,r),e.lineTo(s-this.moveMod,r+o),e.lineTo(s+n-this.moveMod,r+o),e.lineTo(s+n,r),e.closePath(),t.fill(e,"evenodd"),this.movingRight=!1}else if(this.movingLeft){let e=new Path2D;e.moveTo(s,r),e.lineTo(s+this.moveMod,r+o),e.lineTo(s+n+this.moveMod,r+o),e.lineTo(s+n,r),e.closePath(),t.fill(e,"evenodd"),this.movingLeft=!1}else t.fillRect(s,r,n,o)}}class jt{staticEntities=[];dynamicEntities=[];numCoins=0;constructor(t){let i=t.length;if(i!==$){console.error("Level should have 15 rows!");return}this.dynamicEntities.push(new Ot(2,12));let s=t[0].length;for(let r=0;r<i;++r){let o=t[r];if(s!==o.length){console.error(`Every row in the level should have the same number of columns! (${s} !== ${o.length}).`);return}for(let n=0;n<s;++n){let e=o[n];if(e==="X")this.staticEntities.push(new Zt(n,r));else if(e==="^")this.dynamicEntities.push(new At(n,r,this.dynamicEntities[0].pos,()=>{let f=this.raycast(new b(n,r)),d=f===null?$:r-f.pos.y-1;this.dynamicEntities.push(new Et(n,r-d,d))}));else if(e==="T")this.dynamicEntities.push(new Vt(n,r,this.dynamicEntities[0].pos,(f,d)=>{this.dynamicEntities.push(new Wt(f,d,this.dynamicEntities[0].pos))}));else if(e==="o")++this.numCoins,this.dynamicEntities.push(new Yt(n,r));else if(e=="b")this.dynamicEntities.push(new Rt(n,r));else if(e==="H")this.dynamicEntities.push(new Bt(n,r,s));else if(e==="V")this.dynamicEntities.push(new Pt(n,r));else if(e==="C")this.dynamicEntities.push(new Xt(n,r));else if(e!=="-")console.error(`Unhandled tile type: ${o[n]}`)}}}update(t){let i=this.dynamicEntities.length,s=this.staticEntities.length,r,o=0;for(;o<i;++o){let n=this.dynamicEntities[o];if(n.update(t),n.dead){if(o==0)break;this.dynamicEntities.splice(o,1),--o,--i}n.physicsUpdate(t);for(r=o+1;r<i;++r)n.collision(this.dynamicEntities[r]);for(r=0;r<s;++r)n.collision(this.staticEntities[r])}}render(t,i){i.update(this.dynamicEntities[0].pos.x);let s=this.staticEntities.length,r=0;for(;r<s;++r)this.staticEntities[r].render(t,i);s=this.dynamicEntities.length;for(r=0;r<s;++r)this.dynamicEntities[r].render(t,i)}state(){let t=this.dynamicEntities[0];if(t.coinsCollected>=this.numCoins)return st;if(t.dead)return it;return tt}protaganist(){return this.dynamicEntities[0]}raycast(t){let i=this.staticEntities.length,s;while(t.y>=0){for(s=0;s<i;++s){let r=this.staticEntities[s];if(t.equals(r.pos))return r}--t.y}return null}}class Tt extends H{ctx;transitionScene;game;camera;levelDirector;constructor(t,i){super();this.ctx=t,this.transitionScene=i,this.camera=new kt,this.levelDirector=new Jt}onEnter(){let t=this.levelDirector.get(oi);this.game=new jt(t)}update(t){this.game.update(t);let i=this.game.state();switch(i){case tt:break;case it:{this.transitionScene.targetScene=bt,this.changeScene=z;break}case st:{if(this.levelDirector.playerIsOnLastLevel)this.transitionScene.targetScene=mt;else this.transitionScene.targetScene=_;this.changeScene=z;break}default:{console.error(`Unhandled game state type: ${i}`);break}}}render(){this.ctx.clearRect(0,0,w,C),this.game.render(this.ctx,this.camera)}_onExit(){this.levelDirector.update(this.transitionScene.targetScene===_,Math.floor(this.game.protaganist().maxColumn))}}window.addEventListener("load",()=>{Gt(()=>{l.init();let t=document.createElement("canvas");t.setAttribute("id","canvas"),t.width=w,t.height=C;let i=t.getContext("2d");document.getElementById("game").appendChild(t);let s=new gt,r=new zt(i);s.registerScene(z,r),s.registerScene(T,new Ut(i,r)),s.registerScene(X,new Tt(i,r)),s.registerScene(mt,new St(i)),s.registerScene(_,new $t(i,r)),s.registerScene(bt,new Ft(i,r));let o=s.getScene(T);o.onEnter();let n=0,e=(f)=>{let d=Math.min(0.05,(f-n)/1000);n=f,o.update(d),o.render();let v=o.changeScene;if(v!==void 0)o.onExit(),o=s.getScene(v),o.onEnter();window.requestAnimationFrame(e)};window.requestAnimationFrame(e)})});
