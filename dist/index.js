class it{scenes={};registerScene(t,r){if(this.scenes[t]===void 0)this.scenes[t]=r;else console.error(`Key "${t}" for scene already exists! Scene not added to SceneManager.`)}getScene(t){return this.scenes[t]}}class y{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}var U="main menu",R="game",_="player won",m="transition",J="lost",O="won";var v=720,S=480,a=32,I=15,zt=17,L=20,T=30,Wt=0.625,Zt=0.9375,$=31,Z=31,F=0.96875,B=0.96875,j=16,A=16,Y=0.5,P=0.5,M=25,G=15,D=0.78125,K=0.46875,ot=0.12109375,Ft=3.875,tt=0.6,Qt=2,C="start",X="end",d="death";var Q;((f)=>{f[f.LEFT=0]="LEFT";f[f.RIGHT=1]="RIGHT";f[f.DOWN=2]="DOWN";f[f.UP=3]="UP";f[f.A=4]="A";f[f.D=5]="D";f[f.E=6]="E";f[f.G=7]="G";f[f.H=8]="H";f[f.I=9]="I";f[f.Q=10]="Q";f[f.R=11]="R";f[f.S=12]="S";f[f.W=13]="W";f[f.SPACE=14]="SPACE";f[f.ESCAPE=15]="ESCAPE";f[f.ENTER=16]="ENTER";f[f.SHIFT=17]="SHIFT";f[f.INVALID=18]="INVALID"})(Q||={});class h{static _keys=[];static init(){for(let t=0;t<Object.keys(Q).length;++t)h._keys.push(!1);window.addEventListener("keydown",h.onKeyDown),window.addEventListener("keyup",h.onKeyUp)}static isKeyDown(...t){const r=t.length;for(let n=0;n<r;++n)if(h._keys[t[n]])return!0;return!1}static keyStrToKey(t){switch(t){case"Down":case"ArrowDown":return 2;case"Up":case"ArrowUp":return 3;case"Right":case"ArrowRight":return 1;case"Left":case"ArrowLeft":return 0;case" ":case"Space":return 14;case"Escape":return 15;case"a":case"A":return 4;case"e":case"E":return 6;case"s":case"S":return 12;case"d":case"D":return 5;case"w":case"W":return 13;case"r":case"R":return 11;case"q":case"Q":return 10;case"g":case"G":return 7;case"h":case"H":return 8;case"i":case"I":return 9;case"Shift":return 17;case"Enter":return 16;default:return console.warn(`Unhandled key: ${t}.`),18}}static onKeyDown(t){const r=h.keyStrToKey(t.key);if(h._keys[r]=!0,r==2||r==3||r==0||r==1)t.preventDefault();return!1}static onKeyUp(t){return h._keys[h.keyStrToKey(t.key)]=!1,!1}static clear(){for(let t=0;t<h._keys.length;++t)h._keys[t]=!1}}class g{x;y;constructor(t,r){this.x=t,this.y=r}copy(){return new g(this.x,this.y)}zero(){this.x=0,this.y=0}equals(t){return this.x==t.x&&this.y==t.y}add(t){return new g(this.x+t.x,this.y+t.y)}addInPlace(t){this.x+=t.x,this.y+=t.y}subtract(t){return new g(this.x-t.x,this.y-t.y)}subtractInPlace(t){this.x-=t.x,this.y-=t.y}scalarAdd(t){this.x+=t,this.y+=t}scalarSubtract(t){this.x-=t,this.y-=t}scalarMultiply(t){return new g(this.x*t,this.y*t)}scalarMultiplyInPlace(t){this.x*=t,this.y*=t}dot(t){return this.x*t.x+this.y+t.y}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}}var W="rgba(150,150,255,1)";var Vt=Math.floor(v/a)-1;class ut extends y{ctx;transitionScene;fakePlayerPos;sign;constructor(t,r){super();this.ctx=t,this.transitionScene=r,this.fakePlayerPos=new g(10,(I-2)*a),this.sign=1}onEnter(){this.ctx.clearRect(0,0,v,S),this.ctx.fillStyle=W,this.ctx.font="48px Arial",this.ctx.fillText("Recformer",247,100),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to start",220,S*0.55);const t=this.fakePlayerPos.y+a;this.ctx.strokeStyle="white";for(let r=0;r<25;++r)this.ctx.strokeRect(r*a,t,$,Z);this.ctx.fillStyle=W}update(t){if(h.isKeyDown(14))this.transitionScene.targetScene=R,this.changeScene=m;const r=this.fakePlayerPos.x;if(r<1||r>Vt)this.sign*=-1;this.fakePlayerPos.x+=t*this.sign}render(){const t=this.fakePlayerPos.x*a,r=(I-2)*a;this.ctx.clearRect(0,this.fakePlayerPos.y,v,T),this.ctx.fillRect(t,r,L,T)}_onExit(){}}class ft{startCol=0;endCol=0;offsetX=0;colsPerScreen=Math.ceil(v/a);update(t){const r=t-this.colsPerScreen/2;this.startCol=Math.max(0,Math.floor(r)),this.endCol=this.startCol+this.colsPerScreen,this.offsetX=-r*a+this.startCol*a}columnToScreen(t){return(t-this.startCol)*a+this.offsetX}rowToScreen(t){return t*a}}function qt(t,r,n,s){const{x:e,y:o}=t,i=e+r.x,c=o+r.y,l=n.x,x=n.y,w=l+s.x,N=x+s.y;return e<w&&i>l&&o<N&&c>x}class b{pos;size;type;dead=!1;velocity=new g(0,0);gravity=new g(0,100);constructor(t,r,n,s,e){this.pos=new g(t,r),this.size=new g(n,s),this.type=e}collision(t){if(qt(this.pos,this.size,t.pos,t.size))this.handleCollision(t),t.handleCollision(this)}physicsUpdate(t){this.velocity.addInPlace(this.gravity.scalarMultiply(t)),this.velocity.y=Math.min(this.velocity.y,30),this.pos.addInPlace(this.velocity.scalarMultiply(t))}}var q=0,E=1,rt=2,k=3,st=4;var Ht=6,Ut=8,_t=0.4;class ct extends b{movingRight=!1;movingLeft=!1;moveMod=0;jumpTime=0;squash=1;stretch=1;coinsCollected=0;maxColumn=0;constructor(t,r){super(t,r,Wt,Zt,q)}update(t){if(this.pos.y>zt){this.dead=!0,console.log("Player fell...");return}if(this.velocity.x=0,h.isKeyDown(5,1))this.movingRight=!0,this.velocity.x=Ht,this.moveMod=Math.min(Ut,this.moveMod+t);if(h.isKeyDown(4,0))if(this.movingRight)this.movingRight=!1,this.velocity.x=0;else this.movingLeft=!0,this.velocity.x=-Ht,this.moveMod=Math.min(Ut,this.moveMod+t);if(this.jumpTime<_t&&h.isKeyDown(14,3)){if(this.jumpTime===0)this.velocity.y=-15;else if(this.jumpTime<0.2)this.velocity.y-=2;this.squash=Math.min(1.03,this.squash+0.01),this.stretch=Math.max(0.97,this.stretch-0.01),this.jumpTime+=t}else if(this.squash!=this.stretch)this.squash+=0.01,this.stretch-=0.01;this.maxColumn=Math.max(this.pos.x,this.maxColumn)}handleCollision(t){switch(t.type){case E:{const r=this.pos.add(this.size.scalarMultiply(0.5)),n=t.pos.add(t.size.scalarMultiply(0.5)),s=r.subtract(n);this.size.add(t.size).scalarMultiply(0.5);const o=Math.abs(Math.atan(s.y/s.x));if(!(o<0.96&&o>0.698)&&Math.abs(s.x/this.size.x)>Math.abs(s.y/this.size.y))if(s.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x;else if(s.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y,this.velocity.y=0,this.jumpTime=0,this.stretch=1.01,this.squash=0.99;break}case rt:{++this.coinsCollected;break}case k:{this.dead=!0,console.log("Ran into an enemy! :/");break}case st:{this.jumpTime=0;break}default:{console.warn(`Player unhandled collision type: ${t.type}.`);break}}}render(t,r){t.fillStyle=W;const n=r.columnToScreen(this.pos.x),s=r.rowToScreen(this.pos.y),e=T*this.squash,o=L*this.stretch;if(this.movingRight){let i=new Path2D;i.moveTo(n,s),i.lineTo(n-this.moveMod,s+e),i.lineTo(n+o-this.moveMod,s+e),i.lineTo(n+o,s),i.closePath(),t.fill(i,"evenodd"),this.movingRight=!1}else if(this.movingLeft){let i=new Path2D;i.moveTo(n,s),i.lineTo(n+this.moveMod,s+e),i.lineTo(n+o+this.moveMod,s+e),i.lineTo(n+o,s),i.closePath(),t.fill(i,"evenodd"),this.movingLeft=!1}else t.fillRect(n,s,o,e)}}class lt extends b{constructor(t,r){super(t,r,F,B,E)}update(t){}handleCollision(t){}render(t,r){t.strokeStyle="white",t.strokeRect(r.columnToScreen(this.pos.x),r.rowToScreen(this.pos.y),$,Z)}}class dt extends b{minY;maxY;yMod;constructor(t,r){super(t+0.25,r+0.25,Y,P,rt);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=r+0.3,this.minY=r+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===q)this.dead=!0}render(t,r){t.fillStyle="yellow",t.fillRect(r.columnToScreen(this.pos.x),r.rowToScreen(this.pos.y),j,A)}}class ht extends b{maxColumns;constructor(t,r,n){super(t+0.25,r+0.25,D,K,k);this.velocity.x=3,this.gravity.y=0,this.maxColumns=n}update(t){if(this.pos.x<0||this.pos.x>this.maxColumns)this.velocity.x*=-1}handleCollision(t){if(t.type===E){const r=this.pos.add(this.size.scalarMultiply(0.5)),n=t.pos.add(t.size.scalarMultiply(0.5)),s=r.subtract(n);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(s.x/this.size.x)>Math.abs(s.y/this.size.y))if(this.velocity.x*=-1,s.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x}}render(t,r){t.fillStyle="red",t.fillRect(r.columnToScreen(this.pos.x),r.rowToScreen(this.pos.y),M,G)}}class pt extends b{constructor(t,r){super(t,r+0.1,K,D,k);this.velocity.y=3,this.gravity.y=0,this.pos.x+=0.25}update(t){if(this.pos.y<0||this.pos.y>=I)this.velocity.y*=-1}handleCollision(t){if(t.type===E){const r=this.pos.add(this.size.scalarMultiply(0.5)),n=t.pos.add(t.size.scalarMultiply(0.5)),s=r.subtract(n);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(s.x/this.size.x)<Math.abs(s.y/this.size.y))if(this.velocity.y*=-1,s.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y}}render(t,r){t.fillStyle="red",t.fillRect(r.columnToScreen(this.pos.x),r.rowToScreen(this.pos.y),G,M)}}class bt{src;tgt;probability;constructor(t,r,n){this.src=t,this.tgt=r,this.probability=n}}class V{name;reward;utility;isTerminal;neighbors;constructor(t,r,n,s,e){this.name=t,this.reward=r,this.utility=n,this.isTerminal=s,this.neighbors=e}}class nt{nodes;edges;constructor(){this.nodes={},this.edges={}}getNode(t){return this.nodes[t]}hasNode(t){return t in this.nodes}addNode(t){this.nodes[t.name]=t}addDefaultNode(t,r=1,n=0,s=!1,e=null){if(e==null)e=[];this.nodes[t]=new V(t,r,n,s,e)}removeNode(t){const r=[];for(let n of Object.values(this.edges)){if(n.src==t||n.tgt==t)r.push(n);const s=n.probability;let e=-1;for(let l=0;l<s.length;l++){const[x,w]=s[l];if(x==t){e=l;break}}if(e==-1)continue;const o=s[e][1];s.splice(e,1);const i=s.length,c=o/i;n.probability=s.map(([l,x])=>[l,x+c])}for(let n of r)this.removeEdge(n.src,n.tgt);delete this.nodes[t]}getEdge(t,r){return this.edges[`${t},${r}`]}hasEdge(t,r){return`${t},${r}`in this.edges}addEdge(t){this.edges[`${t.src},${t.tgt}`]=t;const r=this.nodes[t.src].neighbors;if(!r.includes(t.tgt))r.push(t.tgt)}addDefaultEdge(t,r,n=null){if(n==null)n=[[r,1]];this.addEdge(new bt(t,r,n))}removeEdge(t,r){const n=this.nodes[t],s=n.neighbors.indexOf(r);n.neighbors.splice(s,1),delete this.edges[`${t},${r}`]}neighbors(t){return this.nodes[t].neighbors}setNodeUtilities(t){for(let[r,n]of Object.entries(t))this.nodes[r].utility=n}utility(t){return this.nodes[t].utility}reward(t){return this.nodes[t].reward}isTerminal(t){return this.nodes[t].isTerminal}mapNodes(t){for(let r of Object.values(this.nodes))t(r)}mapEdges(t){for(let r of Object.values(this.edges))t(r)}}function z(t){return t[Math.floor(Math.random()*t.length)]}function H(t,r,n,s){const e=t.getEdge(r,n).probability,o=e.length;let i=0;for(let c=0;c<o;++c){const[l,x]=e[c];i+=x*(t.reward(l)+s*t.utility(l))}return i}function et(t,r,n){const s=t.getNode(r);if(s.isTerminal)return 0;const e=s.neighbors,o=e.length;let i=-1/0;for(let c=0;c<o;++c)i=Math.max(i,H(t,r,e[c],n));return i}function xt(t){for(let r in t.nodes)t.nodes[r].utility=0}function at(t){const r={};for(let n in t.nodes)if(!t.getNode(n).isTerminal)r[n]=[...t.neighbors(n)];return r}function vt(t,r){const n={};for(let s in t.nodes){if(t.getNode(s).isTerminal)continue;let e=-1/0,o=[];for(let i of t.neighbors(s)){const c=H(t,s,i,r);if(c===e)o.push(i);else if(c>e)e=c,o.length=0,o.push(i)}n[s]=o}return n}function Jt(t,r,n,s){for(let e=0;e<s;++e)for(let o in t.nodes){const i=t.getNode(o);if(!i.isTerminal)i.utility=H(t,o,z(r[o]),n)}}function Ot(t,r,n,s){for(let e=0;e<s;++e){const o={};for(let i in t.nodes)if(!t.getNode(i).isTerminal)o[i]=H(t,i,z(r[i]),n);t.setNodeUtilities(o)}}function Lt(t,r,n,s){for(let e=0;e<s;++e)for(let o in t.nodes)t.getNode(o).utility=et(t,o,n)}function Bt(t,r,n,s){for(let e=0;e<s;++e){const o={};for(let i in t.nodes)o[i]=et(t,i,n);t.setNodeUtilities(o)}}function Tt(t,r,n){let s=!1;for(let e in t.nodes){if(t.getNode(e).isTerminal)continue;let o=null,i=-1/0;for(let c of t.neighbors(e)){const l=H(t,e,c,n);if(l===i);else if(l>i)o=c,i=l}if(z(r[e])!==o)r[e].length=0,r[e].push(o),s=!0}return s}function gt(t,r,n=!1,s=!1,e=10,o=!0){if(o)xt(t);const i=at(t);let c;if(n&&s)c=Jt;else if(n&&!s)c=Ot;else if(!n&&s)c=Lt;else c=Bt;let l=!0;while(l)c(t,i,r,e),l=Tt(t,i,r);return c(t,i,r,e),Tt(t,i,r),vt(t,r)}class p extends V{visitedCount;sumPercentCompleted;depth;designerReward;playerReward;constructor(t,r,n,s,e,o){super(t,r,n,s,e);this.designerReward=r,this.playerReward=0,this.depth=o,this.visitedCount=1,this.sumPercentCompleted=1}updateReward(){this.reward=this.designerReward*this.visitedCount}}var u=new nt;u.addNode(new p(C,0,0,!1,[],-1));u.addNode(new p(d,-1,0,!0,[],-1));u.addNode(new p(X,1,0,!0,[],-1));u.addNode(new p("1-a",-0.95,0,!1,[],1));u.addNode(new p("2-a",-0.925,0,!1,[],2));u.addNode(new p("2-b",-0.925,0,!1,[],2));u.addNode(new p("3-a",-0.9,0,!1,[],3));u.addNode(new p("3-b",-0.9,0,!1,[],3));u.addNode(new p("4-a",-0.825,0,!1,[],4));u.addNode(new p("4-b",-0.825,0,!1,[],4));u.addNode(new p("5-a",-0.8,0,!1,[],5));u.addNode(new p("5-b",-0.8,0,!1,[],5));u.addNode(new p("5-c",-0.8,0,!1,[],5));u.addNode(new p("6-a",-0.775,0,!1,[],6));u.addNode(new p("7-a",-0.75,0,!1,[],7));u.addNode(new p("6-b",-0.775,0,!1,[],6));u.addNode(new p("1-b",-0.95,0,!1,[],1));u.addDefaultEdge(C,"1-a",[["1-a",0.99],[d,0.01]]);u.addDefaultEdge("1-a","2-b",[["2-b",0.99],[d,0.01]]);u.addDefaultEdge("1-a","2-a",[["2-a",0.99],[d,0.01]]);u.addDefaultEdge("2-a","3-a",[["3-a",0.99],[d,0.01]]);u.addDefaultEdge("2-b","3-b",[["3-b",0.99],[d,0.01]]);u.addDefaultEdge("3-a","4-b",[["4-b",0.99],[d,0.01]]);u.addDefaultEdge("3-a","4-a",[["4-a",0.99],[d,0.01]]);u.addDefaultEdge("3-b","4-b",[["4-b",0.99],[d,0.01]]);u.addDefaultEdge("3-b","4-a",[["4-a",0.99],[d,0.01]]);u.addDefaultEdge("4-a","5-b",[["5-b",0.99],[d,0.01]]);u.addDefaultEdge("4-a","5-a",[["5-a",0.99],[d,0.01]]);u.addDefaultEdge("4-a","5-c",[["5-c",0.99],[d,0.01]]);u.addDefaultEdge("4-b","5-b",[["5-b",0.99],[d,0.01]]);u.addDefaultEdge("4-b","5-a",[["5-a",0.99],[d,0.01]]);u.addDefaultEdge("4-b","5-c",[["5-c",0.99],[d,0.01]]);u.addDefaultEdge("5-a","6-a",[["6-a",0.99],[d,0.01]]);u.addDefaultEdge("5-a","6-b",[["6-b",0.99],[d,0.01]]);u.addDefaultEdge("5-b","6-a",[["6-a",0.99],[d,0.01]]);u.addDefaultEdge("5-b","6-b",[["6-b",0.99],[d,0.01]]);u.addDefaultEdge("5-c","6-a",[["6-a",0.99],[d,0.01]]);u.addDefaultEdge("5-c","6-b",[["6-b",0.99],[d,0.01]]);u.addDefaultEdge("6-a","7-a",[["7-a",0.99],[d,0.01]]);u.addDefaultEdge("7-a","end",[["end",0.99],[d,0.01]]);u.addDefaultEdge("6-b","7-a",[["7-a",0.99],[d,0.01]]);u.addDefaultEdge(C,"1-b",[["1-b",0.99],[d,0.01]]);u.addDefaultEdge("1-b","2-b",[["2-b",0.99],[d,0.01]]);u.addDefaultEdge("1-b","2-a",[["2-a",0.99],[d,0.01]]);var Xt={"1-a":["----------------","----------------","----------------","----------------","----------------","----------------","----------------","----------------","----------------","----------------","-----------o----","--------o-XX----","------o-XXXX----","------XXXXXX----","XXXXXXXXXXXXXXXX"],"2-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-------XXXXXXXX-------","----------------------","-------V--o---V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"2-b":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"3-a":["----------------------","----------------------","----------------------","----------------------","-----------o----------","----------------------","---------XXXXX--------","-----------o----------","----------------------","-------X-H-----X------","---XX--XXXXXXXXX--XX--","----------------------","-------V---o---V----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"3-b":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","--------V---V---------","----------o-----------","----------------------","------XXXXXXXXX-------","----------------------","----------o---------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"4-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------XXX---","-----------------V----","-------X---XX-----V---","------XX------o-V---o-","-----XXX--------------","XXXXXXXX---XXXXXXXXXXX"],"4-b":["--------------------XX","--------------------XX","--------------------XX","--------------------XX","--------------------XX","-----------X-H---o--XX","-----------------o--XX","---------o----------XX","-----------XXXXXXX--XX","--------------------XX","-------X------------XX","------XXX-----------XX","-----XXXXX-----------o","----XXXXXXX-----------","XXXXXXXXXXXXXXXX--XXXX"],"5-a":["--------XXXXXXXXXXXXXX--------","-------------------ooX--------","---------------------X--------","---------------------X--------","------------------XXXX--------","------------------X-----------","-----------o--XXXXX-----------","------------------------------","---------XX-----------------o-","------------------------------","--------------XX---XXX----XXXX","------------------------------","----------XX------------------","------------------------------","XXXXXXXX----------------------"],"5-b":["------------------------------","-o----------------------------","------------------------------","XXX---------------------------","------------------------------","-----XXX----------------------","------------------------------","-----------XXX----------------","-o--------------------------o-","------XXX---------------------","XXX-----------------------XXXX","------------XXX-------XX------","------------------XX----------","------------------------------","XXXXXXXX---XXXXX--------------"],"5-c":["o-----------------------------","------------------------------","X---XX------------------------","------------------------------","------------------------------","XX----------------------------","--------XXXXX-----------------","--------Xoo-------------------","XXX-----Xoo----o------------o-","--------X---------------------","--------XXX---XX----XX----XXXX","XXXX--------------------------","------------------------------","------------------------------","XXXXXXXX----------------------"],"6-a":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","-------oo---XXXXXXXX----------","-o----------XXXXXXXX----------","------XXXX--XXXXXXXX----------","--------------o---------------","XXXX--------------------------","-------------XXXX-----------o-","---------------------XX-------","XXXXXXXX-----------------XXXXX"],"7-a":["-------------------V---------------","-----------------o---o-------------","------------X-H------------H--XXX--","-----V------XXXXXXXXXXXXXXXXXXXXX--","--------XX----o--------------------","-----------------------------------","-----------XXXXXX---Ho-------------","-----------------------------------","-------------V------XX--------H----","-----------------------------------","XX--------o------XXXXX----H--------","-----------------------------------","---X----H----H-X-----------------o-","---XXXXXXXXXXXXX-------------------","XXXX--------------------------XXXXX"],end:["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----oooooooooooooooooo","XXXXXXXXXXXXXXXXXXXXXX"],"6-b":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX--o-------","-o--------XXXXXXXXXX----------","----------XXXXXXXXXX--X-------","----------XXXXXXXXXX----------","XXX-------XXXXXXXXXXX---------","------XX-----oooo-----------o-","------------------------------","XXXX--------XXXXXX---XX---XXXX"],"1-b":["----------------","----------------","----------------","----------------","----------------","----------------","----------------","----------------","-------oo-------","----------------","-------XX-------","----o-XXXX-o----","-----XXXXXX-----","---XXXXXXXXXX---","XXXXXXXXXXXXXXXX"]};class yt{playerIsOnLastLevel=!1;keys;columnsPerLevel;lossesInARow=0;playerWonLastRound=!1;constructor(){}update(t,r){const n=this.keys.length,s=[];if(t){for(let o=0;o<n;++o)s.push(1);this.lossesInARow=0}else{let o=r;for(let i=0;i<n;++i)if(o>this.columnsPerLevel[i])s[i]=1,o-=this.columnsPerLevel[i];else{s[i]=o/this.columnsPerLevel[i];break}}const e=s.length;for(let o=0;o<e;++o){const i=s[o],c=this.keys[o],l=u.getNode(c);if(i===1){if(!u.hasEdge(C,c))u.addDefaultEdge(C,c,[[c,1],[d,0]])}++l.visitedCount,l.sumPercentCompleted+=i,l.updateReward();const x=l.sumPercentCompleted/l.visitedCount,w=1-x;u.mapEdges((N)=>{if(N.tgt===c)N.probability[0][1]=x,N.probability[1][1]=w})}if(!t){++this.lossesInARow;for(let o=0;o<this.lossesInARow;++o){const i=u.getNode(C).neighbors,c=i.length;if(c===1)break;let l="",x=-1e4;for(let w=0;w<c;++w){const N=i[w],kt=u.getNode(N).depth;if(kt>x)l=N,x=kt}console.log("removing edge:",l,x),u.removeEdge(C,l)}console.log("=======================")}this.playerWonLastRound=t}get(t){const r=gt(u,0.95,!0,!0,20);if(this.columnsPerLevel=[],this.playerWonLastRound)this.keys=[z(r[C])];else this.keys=[C];for(let e=0;e<t;++e){const o=z(r[this.keys[e]]);if(this.keys.push(o),o===X)break}this.keys.splice(0,1),this.playerIsOnLastLevel=this.keys.includes(X);const n=Array(I).fill(""),s=this.keys.length;for(let e=0;e<s;++e){const o=Xt[this.keys[e]];this.columnsPerLevel.push(o[0].length);for(let i=0;i<I;++i)n[i]+=o[i]}return n}}class mt extends b{spawnLaser;vertical;color;time=0;state=0;constructor(t,r,n,s){super(t,r,F,B,E);this.spawnLaser=s,this.vertical=n,this.color="yellow",this.gravity.y=0}update(t){switch(this.time+=t,this.state){case 0:{if(this.time>=tt)this.time=0,this.state=1,this.color="yellow";break}case 1:{if(this.time>=Qt)this.time=0,this.state=0,this.color="red",this.spawnLaser();break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,r){t.strokeStyle=this.color;const n=r.columnToScreen(this.pos.x),s=r.rowToScreen(this.pos.y),e=s+Z;t.beginPath(),t.moveTo(n,e),t.lineTo(n+$/2,s),t.lineTo(n+$,e),t.lineTo(n,e),t.stroke(),t.strokeStyle="white",t.beginPath(),t.moveTo(n,s),t.lineTo(n+$,s),t.stroke()}}class St extends b{vertical;time=0;constructor(t,r,n,s){super(t+(F-ot)/2,r,ot,s,k);this.vertical=n,this.gravity.y=0}update(t){if(this.time+=t,this.time>=tt)this.dead=!0}handleCollision(t){}render(t,r){t.fillStyle="red",t.fillRect(r.columnToScreen(this.pos.x),r.rowToScreen(this.pos.y),Ft,this.size.y*a)}}var jt=2000;class It extends b{minY;maxY;yMod;constructor(t,r){super(t+0.25,r+0.25,Y,P,st);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=r+0.3,this.minY=r+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===q){const r=this.pos.y;this.pos.y=100,setTimeout(()=>{this.pos.y=r},jt)}}render(t,r){t.fillStyle="#05D5FA",t.fillRect(r.columnToScreen(this.pos.x),r.rowToScreen(this.pos.y),j,A)}}class Ct extends y{ctx;transitionScene;camera;numCoins;levelDirector;staticEntities;dynamicEntities;constructor(t,r){super();this.ctx=t,this.transitionScene=r,this.camera=new ft,this.levelDirector=new yt}onEnter(){this.dynamicEntities=[],this.staticEntities=[],this.numCoins=0,this.dynamicEntities.push(new ct(2,12));const t=this.levelDirector.get(2),r=t.length;if(r!==I){console.error("Level should have 15 rows!");return}const n=t[0].length;for(let s=0;s<r;++s){const e=t[s];if(n!==e.length){console.error(`Every row in the level should have the same number of columns! (${n} !== ${e.length}).`);return}for(let o=0;o<n;++o){const i=e[o];if(i==="X")this.staticEntities.push(new lt(o,s));else if(i==="^")this.dynamicEntities.push(new mt(o,s,!0,()=>{const c=this.raycastUp(new g(o,s)),l=c===null?I:s-c.pos.y-1;this.dynamicEntities.push(new St(o,s-l,!0,l))}));else if(i==="o")++this.numCoins,this.dynamicEntities.push(new dt(o,s));else if(i=="b")this.dynamicEntities.push(new It(o,s));else if(i==="H")this.dynamicEntities.push(new ht(o,s,n));else if(i==="V")this.dynamicEntities.push(new pt(o,s));else if(i!=="-")console.error(`Unhandled tile type: ${e[o]}`)}}}update(t){let r=this.dynamicEntities.length;const n=this.staticEntities.length;let s,e=0;for(;e<r;++e){const i=this.dynamicEntities[e];if(i.update(t),i.dead){if(e==0)break;this.dynamicEntities.splice(e,1),--e,--r}i.physicsUpdate(t);for(s=e+1;s<r;++s)i.collision(this.dynamicEntities[s]);for(s=0;s<n;++s)i.collision(this.staticEntities[s])}const o=this.dynamicEntities[0];if(o.coinsCollected>=this.numCoins)if(this.levelDirector.playerIsOnLastLevel)this.transitionScene.targetScene=_,this.changeScene=m;else this.transitionScene.targetScene=O,this.changeScene=m;if(o.dead)this.transitionScene.targetScene=J,this.changeScene=m}render(){this.ctx.clearRect(0,0,v,S),this.camera.update(this.dynamicEntities[0].pos.x);let t=this.staticEntities.length,r=0;for(;r<t;++r)this.staticEntities[r].render(this.ctx,this.camera);t=this.dynamicEntities.length;for(r=0;r<t;++r)this.dynamicEntities[r].render(this.ctx,this.camera)}_onExit(){const t=this.dynamicEntities[0];this.levelDirector.update(!t.dead,Math.floor(t.maxColumn))}raycastUp(t){const r=this.staticEntities.length;let n;while(t.y>=0){for(n=0;n<r;++n){const s=this.staticEntities[n];if(t.equals(s.pos))return s}--t.y}return null}}class Et extends y{ctx;constructor(t){super();this.ctx=t}onEnter(){this.ctx.clearRect(0,0,v,S),this.ctx.font="30px Arial",this.ctx.fillStyle="white",this.ctx.fillText("You won! Congratulations!",170,S/2)}update(t){}render(){}_onExit(){}}class wt extends y{targetScene=U;timer=0;ctx;constructor(t){super();this.ctx=t}onEnter(){}update(t){if(this.timer+=t,this.timer>0.6)this.changeScene=this.targetScene}render(){const t=this.timer/0.5;this.ctx.fillStyle=`rgba(0,0,0, ${t})`,this.ctx.fillRect(0,0,v,S)}_onExit(){this.timer=0}}class Nt extends y{ctx;transitionScene;constructor(t,r){super();this.ctx=t,this.transitionScene=r}onEnter(){h.clear(),this.ctx.fillStyle=W,this.ctx.font="48px Arial",this.ctx.fillText("YOU WON",250,200),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to keep going.",180,400)}update(t){if(h.isKeyDown(14))this.transitionScene.targetScene=R,this.changeScene=m}render(){}_onExit(){}}class Rt extends y{ctx;transitionScene;constructor(t,r){super();this.ctx=t,this.transitionScene=r}onEnter(){h.clear(),this.ctx.fillStyle="red",this.ctx.font="48px Arial",this.ctx.fillText("YOU LOST",243,200),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to try again.",195,400)}update(t){if(h.isKeyDown(14))this.transitionScene.targetScene=R,this.changeScene=m}render(){}_onExit(){}}class $t{canvas;ctx;currentScene;sceneManager;constructor(){this.canvas=document.createElement("canvas"),this.canvas.setAttribute("id","canvas"),this.canvas.width=v,this.canvas.height=S,this.ctx=this.canvas.getContext("2d"),document.getElementById("game").appendChild(this.canvas);const t=new wt(this.ctx);this.sceneManager=new it,this.sceneManager.registerScene(U,new ut(this.ctx,t)),this.sceneManager.registerScene(R,new Ct(this.ctx,t)),this.sceneManager.registerScene(_,new Et(this.ctx)),this.sceneManager.registerScene(m,t),this.sceneManager.registerScene(O,new Nt(this.ctx,t)),this.sceneManager.registerScene(J,new Rt(this.ctx,t)),this.currentScene=this.sceneManager.getScene(U),this.currentScene.onEnter()}start(){let t=0;const r=(n)=>{const s=Math.min(0.05,(n-t)/1000);t=n,this.currentScene.update(s),this.currentScene.render();const e=this.currentScene.changeScene;if(e!==void 0)this.currentScene.onExit(),this.currentScene=this.sceneManager.getScene(e),this.currentScene.onEnter();window.requestAnimationFrame(r)};window.requestAnimationFrame(r)}}window.addEventListener("load",()=>{h.init(),new $t().start()});
