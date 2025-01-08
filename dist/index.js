class dt{scenes={};registerScene(t,s){if(this.scenes[t]===void 0)this.scenes[t]=s;else console.error(`Key "${t}" for scene already exists! Scene not added to SceneManager.`)}getScene(t){return this.scenes[t]}}class a{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}var Q="main menu",z="game",O="player won",m="transition",P="lost",A="won";var y=720,g=480,E=32,I=15,Ht=17,Y=20,V=30,Wt=0.625,qt=0.9375,N=31,k=31,w=0.96875,F=0.96875,j=16,M=16,D=0.5,G=0.5,K=25,tt=15,st=0.78125,rt=0.46875,Qt=3,pt=0.12109375,Vt=3.875,it=0.6,Jt=2,Xt=2.5,Bt=150,Ot=10,Pt=10,At=10,J=0.5,Yt=0.5,C="start",X="end",h="death";var H;((d)=>{d[d.LEFT=0]="LEFT";d[d.RIGHT=1]="RIGHT";d[d.DOWN=2]="DOWN";d[d.UP=3]="UP";d[d.A=4]="A";d[d.D=5]="D";d[d.E=6]="E";d[d.G=7]="G";d[d.H=8]="H";d[d.I=9]="I";d[d.Q=10]="Q";d[d.R=11]="R";d[d.S=12]="S";d[d.W=13]="W";d[d.SPACE=14]="SPACE";d[d.ESCAPE=15]="ESCAPE";d[d.ENTER=16]="ENTER";d[d.SHIFT=17]="SHIFT";d[d.INVALID=18]="INVALID"})(H||={});class l{static _keys=[];static init(){for(let t=0;t<Object.keys(H).length;++t)l._keys.push(!1);window.addEventListener("keydown",l.onKeyDown),window.addEventListener("keyup",l.onKeyUp)}static isKeyDown(...t){let s=t.length;for(let r=0;r<s;++r)if(l._keys[t[r]])return!0;return!1}static keyStrToKey(t){switch(t){case"Down":case"ArrowDown":return 2;case"Up":case"ArrowUp":return 3;case"Right":case"ArrowRight":return 1;case"Left":case"ArrowLeft":return 0;case" ":case"Space":return 14;case"Escape":return 15;case"a":case"A":return 4;case"e":case"E":return 6;case"s":case"S":return 12;case"d":case"D":return 5;case"w":case"W":return 13;case"r":case"R":return 11;case"q":case"Q":return 10;case"g":case"G":return 7;case"h":case"H":return 8;case"i":case"I":return 9;case"Shift":return 17;case"Enter":return 16;default:return console.warn(`Unhandled key: ${t}.`),18}}static onKeyDown(t){let s=l.keyStrToKey(t.key);if(l._keys[s]=!0,s==2||s==3||s==0||s==1)t.preventDefault();return!1}static onKeyUp(t){return l._keys[l.keyStrToKey(t.key)]=!1,!1}static clear(){for(let t=0;t<l._keys.length;++t)l._keys[t]=!1}}class b{x;y;constructor(t,s){this.x=t,this.y=s}copy(){return new b(this.x,this.y)}zero(){this.x=0,this.y=0}equals(t){return this.x==t.x&&this.y==t.y}add(t){return new b(this.x+t.x,this.y+t.y)}addInPlace(t){this.x+=t.x,this.y+=t.y}subtract(t){return new b(this.x-t.x,this.y-t.y)}subtractInPlace(t){this.x-=t.x,this.y-=t.y}scalarAdd(t){this.x+=t,this.y+=t}scalarSubtract(t){this.x-=t,this.y-=t}scalarMultiply(t){return new b(this.x*t,this.y*t)}scalarMultiplyInPlace(t){this.x*=t,this.y*=t}dot(t){return this.x*t.x+this.y*t.y}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let t=this.magnitude();this.x/=t,this.y/=t}squareDistance(t){let s=this.x-t.x,r=this.y-t.y;return s*s+r*r}angle(t){return Math.atan2(t.y-this.y,t.x-this.x)}}var Z="rgba(150,150,255,1)";var ss=Math.floor(y/E)-1;class ht extends a{ctx;transitionScene;fakePlayerPos;sign;constructor(t,s){super();this.ctx=t,this.transitionScene=s,this.fakePlayerPos=new b(10,(I-2)*E),this.sign=1}onEnter(){this.ctx.clearRect(0,0,y,g),this.ctx.fillStyle=Z,this.ctx.font="48px Arial",this.ctx.fillText("Recformer",247,100),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to start",220,g*0.55);let t=this.fakePlayerPos.y+E;this.ctx.strokeStyle="white";for(let s=0;s<25;++s)this.ctx.strokeRect(s*E,t,N,k);this.ctx.fillStyle=Z}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=z,this.changeScene=m;let s=this.fakePlayerPos.x;if(s<1||s>ss)this.sign*=-1;this.fakePlayerPos.x+=t*this.sign}render(){let t=this.fakePlayerPos.x*E,s=(I-2)*E;this.ctx.clearRect(0,this.fakePlayerPos.y,y,V),this.ctx.fillRect(t,s,Y,V)}_onExit(){}}class lt{startCol=0;endCol=0;offsetX=0;colsPerScreen=Math.ceil(y/E);update(t){let s=t-this.colsPerScreen/2;this.startCol=Math.max(0,Math.floor(s)),this.endCol=this.startCol+this.colsPerScreen,this.offsetX=-s*E+this.startCol*E}columnToScreen(t){return(t-this.startCol)*E+this.offsetX}rowToScreen(t){return t*E}}var W=0,S=1,nt=2,T=3,ot=4,L=5;class U{pos;type;dead=!1;velocity=new b(0,0);gravity=new b(0,100);constructor(t,s){this.pos=t,this.type=s}physicsUpdate(t){this.velocity.addInPlace(this.gravity.scalarMultiply(t)),this.velocity.y=Math.min(this.velocity.y,30),this.pos.addInPlace(this.velocity.scalarMultiply(t))}}function jt(t,s,r){return Math.min(Math.max(t,s),r)}function et(t,s,r,i){let n=jt(r.x,t.x,s.x),e=jt(r.y,t.y,s.y),o=r.x-n,u=r.y-e;return o*o+u*u<i*i}function Mt(t,s,r,i){let{x:n,y:e}=t,o=n+s.x,u=e+s.y,p=r.x,c=r.y,$=p+i.x,_=c+i.y;return n<$&&o>p&&e<_&&u>c}class xt extends U{r;constructor(t,s,r,i){super(new b(t,s),i);this.r=r}collision(t){if(t instanceof x){if(et(t.pos,t.size,this.pos,this.r))this.handleCollision(t),t.handleCollision(this)}}}class x extends U{size;constructor(t,s,r,i,n){super(new b(t,s),n);this.size=new b(r,i)}collision(t){if(t instanceof x){if(Mt(this.pos,this.size,t.pos,t.size))this.handleCollision(t),t.handleCollision(this)}else if(t instanceof xt){if(et(this.pos,this.size,t.pos,t.r))this.handleCollision(t),t.handleCollision(this)}}}var Dt=6,Gt=8,rs=0.4;class bt extends x{movingRight=!1;movingLeft=!1;moveMod=0;jumpTime=0;squash=1;stretch=1;coinsCollected=0;maxColumn=0;constructor(t,s){super(t,s,Wt,qt,W)}update(t){if(this.pos.y>Ht){this.dead=!0;return}if(this.velocity.x=0,l.isKeyDown(5,1))this.movingRight=!0,this.velocity.x=Dt,this.moveMod=Math.min(Gt,this.moveMod+t);if(l.isKeyDown(4,0))if(this.movingRight)this.movingRight=!1,this.velocity.x=0;else this.movingLeft=!0,this.velocity.x=-Dt,this.moveMod=Math.min(Gt,this.moveMod+t);if(this.jumpTime<rs&&l.isKeyDown(14,3)){if(this.jumpTime===0)this.velocity.y=-15;else if(this.jumpTime<0.2)this.velocity.y-=2;this.velocity.y=Math.max(-20,this.velocity.y),this.squash=Math.min(1.03,this.squash+0.01),this.stretch=Math.max(0.97,this.stretch-0.01),this.jumpTime+=t}else if(this.squash!=this.stretch)this.squash+=0.01,this.stretch-=0.01;this.maxColumn=Math.max(this.pos.x,this.maxColumn)}handleCollision(t){switch(t.type){case S:{let s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),i=s.subtract(r);this.size.add(t.size).scalarMultiply(0.5);let e=Math.abs(Math.atan(i.y/i.x));if(!(e<0.96&&e>0.698)&&Math.abs(i.x/this.size.x)>Math.abs(i.y/this.size.y))if(i.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x;else if(i.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y,this.velocity.y=0,this.jumpTime=0,this.stretch=1.01,this.squash=0.99;break}case nt:{++this.coinsCollected;break}case L:case T:{this.dead=!0;break}case ot:{this.jumpTime=0,this.velocity.y=Math.min(this.velocity.y,0);break}default:{console.warn(`Player unhandled collision type: ${t.type}.`);break}}}render(t,s){t.fillStyle=Z;let r=s.columnToScreen(this.pos.x),i=s.rowToScreen(this.pos.y),n=V*this.squash,e=Y*this.stretch;if(this.movingRight){let o=new Path2D;o.moveTo(r,i),o.lineTo(r-this.moveMod,i+n),o.lineTo(r+e-this.moveMod,i+n),o.lineTo(r+e,i),o.closePath(),t.fill(o,"evenodd"),this.movingRight=!1}else if(this.movingLeft){let o=new Path2D;o.moveTo(r,i),o.lineTo(r+this.moveMod,i+n),o.lineTo(r+e+this.moveMod,i+n),o.lineTo(r+e,i),o.closePath(),t.fill(o,"evenodd"),this.movingLeft=!1}else t.fillRect(r,i,e,n)}}class vt extends x{constructor(t,s){super(t,s,w,F,S)}update(t){}handleCollision(t){}render(t,s){t.strokeStyle="white",t.strokeRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),N,k)}}class ct extends x{minY;maxY;yMod;constructor(t,s){super(t+0.25,s+0.25,D,G,nt);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=s+0.3,this.minY=s+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===W)this.dead=!0}render(t,s){t.fillStyle="yellow",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),j,M)}}class Et extends x{maxColumns;constructor(t,s,r){super(t+0.25,s+0.25,st,rt,T);this.velocity.x=3,this.gravity.y=0,this.maxColumns=r}update(t){if(this.pos.x<0||this.pos.x>this.maxColumns)this.velocity.x*=-1}handleCollision(t){if(t.type===S){let s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),i=s.subtract(r);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(i.x/this.size.x)>Math.abs(i.y/this.size.y))if(this.velocity.x*=-1,i.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x}else if(t.type===L)this.dead=!0}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),K,tt)}}class yt extends x{constructor(t,s){super(t,s+0.1,rt,st,T);this.velocity.y=3,this.gravity.y=0,this.pos.x+=0.25}update(t){if(this.pos.y<0||this.pos.y>=I)this.velocity.y*=-1}handleCollision(t){if(t.type===S){let s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),i=s.subtract(r);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(i.x/this.size.x)<Math.abs(i.y/this.size.y))if(this.velocity.y*=-1,i.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y}else if(t.type===L)this.dead=!0}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),tt,K)}}class at{src;tgt;probability;constructor(t,s,r){this.src=t,this.tgt=s,this.probability=r}}class B{name;reward;utility;isTerminal;neighbors;constructor(t,s,r,i,n){this.name=t,this.reward=s,this.utility=r,this.isTerminal=i,this.neighbors=n}}class ft{nodes;edges;constructor(){this.nodes={},this.edges={}}getNode(t){return this.nodes[t]}hasNode(t){return t in this.nodes}addNode(t){this.nodes[t.name]=t}addDefaultNode(t,s=1,r=0,i=!1,n=null){if(n==null)n=[];this.nodes[t]=new B(t,s,r,i,n)}removeNode(t){let s=[];for(let r of Object.values(this.edges)){if(r.src==t||r.tgt==t)s.push(r);let i=r.probability,n=-1;for(let p=0;p<i.length;p++){let[c,$]=i[p];if(c==t){n=p;break}}if(n==-1)continue;let e=i[n][1];i.splice(n,1);let o=i.length,u=e/o;r.probability=i.map(([p,c])=>[p,c+u])}for(let r of s)this.removeEdge(r.src,r.tgt);delete this.nodes[t]}getEdge(t,s){return this.edges[`${t},${s}`]}hasEdge(t,s){return`${t},${s}`in this.edges}addEdge(t){this.edges[`${t.src},${t.tgt}`]=t;let s=this.nodes[t.src].neighbors;if(!s.includes(t.tgt))s.push(t.tgt)}addDefaultEdge(t,s,r=null){if(r==null)r=[[s,1]];this.addEdge(new at(t,s,r))}removeEdge(t,s){let r=this.nodes[t],i=r.neighbors.indexOf(s);r.neighbors.splice(i,1),delete this.edges[`${t},${s}`]}neighbors(t){return this.nodes[t].neighbors}setNodeUtilities(t){for(let[s,r]of Object.entries(t))this.nodes[s].utility=r}utility(t){return this.nodes[t].utility}reward(t){return this.nodes[t].reward}isTerminal(t){return this.nodes[t].isTerminal}mapNodes(t){for(let s of Object.values(this.nodes))t(s)}mapEdges(t){for(let s of Object.values(this.edges))t(s)}}function R(t){return t[Math.floor(Math.random()*t.length)]}function q(t,s,r,i){let n=t.getEdge(s,r).probability,e=n.length,o=0;for(let u=0;u<e;++u){let[p,c]=n[u];o+=c*(t.reward(p)+i*t.utility(p))}return o}function ut(t,s,r){let i=t.getNode(s);if(i.isTerminal)return 0;let n=i.neighbors,e=n.length,o=-1/0;for(let u=0;u<e;++u)o=Math.max(o,q(t,s,n[u],r));return o}function mt(t){for(let s in t.nodes)t.nodes[s].utility=0}function gt(t){let s={};for(let r in t.nodes)if(!t.getNode(r).isTerminal)s[r]=[...t.neighbors(r)];return s}function St(t,s){let r={};for(let i in t.nodes){if(t.getNode(i).isTerminal)continue;let n=-1/0,e=[];for(let o of t.neighbors(i)){let u=q(t,i,o,s);if(u===n)e.push(o);else if(u>n)n=u,e.length=0,e.push(o)}r[i]=e}return r}function is(t,s,r,i){for(let n=0;n<i;++n)for(let e in t.nodes){let o=t.getNode(e);if(!o.isTerminal)o.utility=q(t,e,R(s[e]),r)}}function ns(t,s,r,i){for(let n=0;n<i;++n){let e={};for(let o in t.nodes)if(!t.getNode(o).isTerminal)e[o]=q(t,o,R(s[o]),r);t.setNodeUtilities(e)}}function os(t,s,r,i){for(let n=0;n<i;++n)for(let e in t.nodes)t.getNode(e).utility=ut(t,e,r)}function es(t,s,r,i){for(let n=0;n<i;++n){let e={};for(let o in t.nodes)e[o]=ut(t,o,r);t.setNodeUtilities(e)}}function Kt(t,s,r){let i=!1;for(let n in t.nodes){if(t.getNode(n).isTerminal)continue;let e=null,o=-1/0;for(let u of t.neighbors(n)){let p=q(t,n,u,r);if(p===o);else if(p>o)e=u,o=p}if(R(s[n])!==e)s[n].length=0,s[n].push(e),i=!0}return i}function It(t,s,r=!1,i=!1,n=10,e=!0){if(e)mt(t);let o=gt(t),u;if(r&&i)u=is;else if(r&&!i)u=ns;else if(!r&&i)u=os;else u=es;let p=!0;while(p)u(t,o,s,n),p=Kt(t,o,s);return u(t,o,s,n),Kt(t,o,s),St(t,s)}class v extends B{visitedCount;sumPercentCompleted;depth;designerReward;playerReward;constructor(t,s,r,i,n,e){super(t,s,r,i,n);this.designerReward=s,this.playerReward=0,this.depth=e,this.visitedCount=1,this.sumPercentCompleted=1}updateReward(){this.reward=this.designerReward*this.visitedCount}}var f=new ft;f.addNode(new v(C,0,0,!1,[],-1));f.addNode(new v(h,-1,0,!0,[],-1));f.addNode(new v(X,1,0,!0,[],-1));f.addNode(new v("1-a",-0.95,0,!1,[],1));f.addNode(new v("2-a",-0.925,0,!1,[],2));f.addNode(new v("2-b",-0.925,0,!1,[],2));f.addNode(new v("3-a",-0.9,0,!1,[],3));f.addNode(new v("3-b",-0.9,0,!1,[],3));f.addNode(new v("4-a",-0.825,0,!1,[],4));f.addNode(new v("4-b",-0.825,0,!1,[],4));f.addNode(new v("5-a",-0.8,0,!1,[],5));f.addNode(new v("5-b",-0.8,0,!1,[],5));f.addNode(new v("5-c",-0.8,0,!1,[],5));f.addNode(new v("6-a",-0.775,0,!1,[],6));f.addNode(new v("7-a",-0.75,0,!1,[],7));f.addNode(new v("6-b",-0.775,0,!1,[],6));f.addNode(new v("1-b",-0.95,0,!1,[],1));f.addDefaultEdge(C,"1-a",[["1-a",0.99],[h,0.01]]);f.addDefaultEdge("1-a","2-b",[["2-b",0.99],[h,0.01]]);f.addDefaultEdge("1-a","2-a",[["2-a",0.99],[h,0.01]]);f.addDefaultEdge("2-a","3-a",[["3-a",0.99],[h,0.01]]);f.addDefaultEdge("2-b","3-b",[["3-b",0.99],[h,0.01]]);f.addDefaultEdge("3-a","4-b",[["4-b",0.99],[h,0.01]]);f.addDefaultEdge("3-a","4-a",[["4-a",0.99],[h,0.01]]);f.addDefaultEdge("3-b","4-b",[["4-b",0.99],[h,0.01]]);f.addDefaultEdge("3-b","4-a",[["4-a",0.99],[h,0.01]]);f.addDefaultEdge("4-a","5-b",[["5-b",0.99],[h,0.01]]);f.addDefaultEdge("4-a","5-a",[["5-a",0.99],[h,0.01]]);f.addDefaultEdge("4-a","5-c",[["5-c",0.99],[h,0.01]]);f.addDefaultEdge("4-b","5-b",[["5-b",0.99],[h,0.01]]);f.addDefaultEdge("4-b","5-a",[["5-a",0.99],[h,0.01]]);f.addDefaultEdge("4-b","5-c",[["5-c",0.99],[h,0.01]]);f.addDefaultEdge("5-a","6-a",[["6-a",0.99],[h,0.01]]);f.addDefaultEdge("5-a","6-b",[["6-b",0.99],[h,0.01]]);f.addDefaultEdge("5-b","6-a",[["6-a",0.99],[h,0.01]]);f.addDefaultEdge("5-b","6-b",[["6-b",0.99],[h,0.01]]);f.addDefaultEdge("5-c","6-a",[["6-a",0.99],[h,0.01]]);f.addDefaultEdge("5-c","6-b",[["6-b",0.99],[h,0.01]]);f.addDefaultEdge("6-a","7-a",[["7-a",0.99],[h,0.01]]);f.addDefaultEdge("7-a","end",[["end",0.99],[h,0.01]]);f.addDefaultEdge("6-b","7-a",[["7-a",0.99],[h,0.01]]);f.addDefaultEdge(C,"1-b",[["1-b",0.99],[h,0.01]]);f.addDefaultEdge("1-b","2-b",[["2-b",0.99],[h,0.01]]);f.addDefaultEdge("1-b","2-a",[["2-a",0.99],[h,0.01]]);var ts={"1-a":["------------XXX-","-------------T--","----------------","----------------","----------------","----------------","----------------","----------------","----------------","--------------b-","-----------o----","--------o-XX----","------o-XXXX----","------XXXXXX----","XXXXXXXXXXXXXXXX"],"2-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-------XXXXXXXX-------","----------------------","-------V--o---V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"2-b":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"3-a":["----------------------","----------------------","----------------------","----------------------","-----------o----------","----------------------","---------XXXXX--------","-----------o----------","----------------------","-------X-H-----X------","---XX--XXXXXXXXX--XX--","----------------------","-------V---o---V----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"3-b":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","--------V---V---------","----------o-----------","----------------------","------XXXXXXXXX-------","----------------------","----------o---------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"4-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------XXX---","-----------------V----","-------X---XX-----V---","------XX------o-V---o-","-----XXX--------------","XXXXXXXX---XXXXXXXXXXX"],"4-b":["--------------------XX","--------------------XX","--------------------XX","--------------------XX","--------------------XX","-----------X-H---o--XX","-----------------o--XX","---------o----------XX","-----------XXXXXXX--XX","--------------------XX","-------X------------XX","------XXX-----------XX","-----XXXXX-----------o","----XXXXXXX-----------","XXXXXXXXXXXXXXXX--XXXX"],"5-a":["--------XXXXXXXXXXXXXX--------","-------------------ooX--------","---------------------X--------","---------------------X--------","------------------XXXX--------","------------------X-----------","-----------o--XXXXX-----------","------------------------------","---------XX-----------------o-","------------------------------","--------------XX---XXX----XXXX","------------------------------","----------XX------------------","------------------------------","XXXXXXXX----------------------"],"5-b":["------------------------------","-o----------------------------","------------------------------","XXX---------------------------","------------------------------","-----XXX----------------------","------------------------------","-----------XXX----------------","-o--------------------------o-","------XXX---------------------","XXX-----------------------XXXX","------------XXX-------XX------","------------------XX----------","------------------------------","XXXXXXXX---XXXXX--------------"],"5-c":["o-----------------------------","------------------------------","X---XX------------------------","------------------------------","------------------------------","XX----------------------------","--------XXXXX-----------------","--------Xoo-------------------","XXX-----Xoo----o------------o-","--------X---------------------","--------XXX---XX----XX----XXXX","XXXX--------------------------","------------------------------","------------------------------","XXXXXXXX----------------------"],"6-a":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","-------oo---XXXXXXXX----------","-o----------XXXXXXXX----------","------XXXX--XXXXXXXX----------","--------------o---------------","XXXX--------------------------","-------------XXXX-----------o-","---------------------XX-------","XXXXXXXX-----------------XXXXX"],"7-a":["-------------------V---------------","-----------------o---o-------------","------------X-H------------H--XXX--","-----V------XXXXXXXXXXXXXXXXXXXXX--","--------XX----o--------------------","-----------------------------------","-----------XXXXXX---Ho-------------","-----------------------------------","-------------V------XX--------H----","-----------------------------------","XX--------o------XXXXX----H--------","-----------------------------------","---X----H----H-X-----------------o-","---XXXXXXXXXXXXX-------------------","XXXX--------------------------XXXXX"],end:["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----oooooooooooooooooo","XXXXXXXXXXXXXXXXXXXXXX"],"6-b":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX--o-------","-o--------XXXXXXXXXX----------","----------XXXXXXXXXX--X-------","----------XXXXXXXXXX----------","XXX-------XXXXXXXXXXX---------","------XX-----oooo-----------o-","------------------------------","XXXX--------XXXXXX---XX---XXXX"],"1-b":["---------XXX----","----------T-----","----------------","----------------","----------------","----------------","----------------","----------------","-------oo-------","----------------","-------XX-------","----o-XXXX-o----","-----XXXXXX-----","---XXXXXXXXXX---","XXXXXXXXXXXXXXXX"]};class Ct{playerIsOnLastLevel=!1;keys;columnsPerLevel;lossesInARow=0;playerWonLastRound=!1;constructor(){}update(t,s){let r=this.keys.length,i=[];if(t){for(let e=0;e<r;++e)i.push(1);this.lossesInARow=0}else{let e=s;for(let o=0;o<r;++o)if(e>this.columnsPerLevel[o])i[o]=1,e-=this.columnsPerLevel[o];else{i[o]=e/this.columnsPerLevel[o];break}}let n=i.length;for(let e=0;e<n;++e){let o=i[e],u=this.keys[e],p=f.getNode(u);if(o===1){if(!f.hasEdge(C,u))f.addDefaultEdge(C,u,[[u,1],[h,0]])}++p.visitedCount,p.sumPercentCompleted+=o,p.updateReward();let c=p.sumPercentCompleted/p.visitedCount,$=1-c;f.mapEdges((_)=>{if(_.tgt===u)_.probability[0][1]=c,_.probability[1][1]=$})}if(!t){++this.lossesInARow;for(let e=0;e<this.lossesInARow;++e){let o=f.getNode(C).neighbors,u=o.length;if(u===1)break;let p="",c=-1e4;for(let $=0;$<u;++$){let _=o[$],Ft=f.getNode(_).depth;if(Ft>c)p=_,c=Ft}console.log("removing edge:",p,c),f.removeEdge(C,p)}}this.playerWonLastRound=t}get(t){let s=It(f,0.95,!0,!0,20);if(this.columnsPerLevel=[],this.playerWonLastRound)this.keys=[R(s[C])];else this.keys=[C];for(let n=0;n<t;++n){let e=R(s[this.keys[n]]);if(this.keys.push(e),e===X)break}this.keys.splice(0,1),this.playerIsOnLastLevel=this.keys.includes(X);let r=Array(I).fill(""),i=this.keys.length;for(let n=0;n<i;++n){let e=ts[this.keys[n]];this.columnsPerLevel.push(e[0].length);for(let o=0;o<I;++o)r[o]+=e[o]}return r}}class Nt extends U{spawnLaser;vertical;color;time=0;state=0;constructor(t,s,r,i){super(t,s,w,F,S);this.spawnLaser=i,this.vertical=r,this.color="yellow",this.gravity.y=0}update(t){switch(this.time+=t,this.state){case 0:{if(this.time>=it)this.time=0,this.state=1,this.color="yellow";break}case 1:{if(this.time>=Jt)this.time=0,this.state=0,this.color="red",this.spawnLaser();break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,s){t.strokeStyle=this.color;let r=s.columnToScreen(this.pos.x),i=s.rowToScreen(this.pos.y),n=i+k;t.beginPath(),t.moveTo(r,n),t.lineTo(r+N/2,i),t.lineTo(r+N,n),t.lineTo(r,n),t.stroke(),t.strokeStyle="white",t.beginPath(),t.moveTo(r,i),t.lineTo(r+N,i),t.stroke()}}class wt extends U{vertical;time=0;constructor(t,s,r,i){super(t+(w-pt)/2,s,pt,i,T);this.vertical=r,this.gravity.y=0}update(t){if(this.time+=t,this.time>=it)this.dead=!0}handleCollision(t){}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),Vt,this.size.y*E)}}var fs=2000;class Ut extends x{minY;maxY;yMod;constructor(t,s){super(t+0.25,s+0.25,D,G,ot);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=s+0.3,this.minY=s+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===W){let s=this.pos.y;this.pos.y=100,setTimeout(()=>{this.pos.y=s},fs)}}render(t,s){t.fillStyle="#05D5FA",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),j,M)}}class $t extends x{player;spawnBullet;color;time=0;state=0;constructor(t,s,r,i){super(t,s,w,F,S);this.player=r,this.spawnBullet=i,this.color="yellow",this.gravity.y=0}update(t){switch(this.state){case 0:{if(this.pos.squareDistance(this.player.pos)<=Bt)this.color="red",this.state=1;break}case 1:{if(this.time+=t,this.time>=Xt)this.time=0,this.state=2;break}case 2:{this.state=0,this.color="yellow";let s=this.pos.angle(this.player.pos),r=Math.cos(s),i=Math.sin(s);this.spawnBullet(this.pos.x+(J+w)*r,this.pos.y+(J+w)*i);break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,s){t.strokeStyle=this.color;let r=s.columnToScreen(this.pos.x),i=s.rowToScreen(this.pos.y),n=N/2,e=2*n,o=new b(r+n,i);t.beginPath(),t.arc(o.x,o.y,n,0,Math.PI),t.stroke();let u=this.pos.angle(this.player.pos),p=Math.cos(u),c=Math.sin(u);t.lineWidth=4,t.beginPath(),t.moveTo(o.x+n*p,o.y+n*c),t.lineTo(o.x+e*p,o.y+e*c),t.stroke(),t.lineWidth=1}}class _t extends x{constructor(t,s,r){super(t,s,J,Yt,L);this.gravity.y=0,this.velocity=r.subtract(this.pos),this.velocity.normalize(),this.velocity.scalarMultiplyInPlace(Ot)}update(t){}handleCollision(t){this.dead=!0}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),Pt,At)}}class zt extends a{ctx;transitionScene;camera;numCoins;levelDirector;staticEntities;dynamicEntities;constructor(t,s){super();this.ctx=t,this.transitionScene=s,this.camera=new lt,this.levelDirector=new Ct}onEnter(){this.dynamicEntities=[],this.staticEntities=[],this.numCoins=0,this.dynamicEntities.push(new bt(2,12));let t=this.levelDirector.get(Qt),s=t.length;if(s!==I){console.error("Level should have 15 rows!");return}let r=t[0].length;for(let i=0;i<s;++i){let n=t[i];if(r!==n.length){console.error(`Every row in the level should have the same number of columns! (${r} !== ${n.length}).`);return}for(let e=0;e<r;++e){let o=n[e];if(o==="X")this.staticEntities.push(new vt(e,i));else if(o==="^")this.dynamicEntities.push(new Nt(e,i,!0,()=>{let u=this.raycast(new b(e,i)),p=u===null?I:i-u.pos.y-1;this.dynamicEntities.push(new wt(e,i-p,!0,p))}));else if(o==="T")this.dynamicEntities.push(new $t(e,i,this.dynamicEntities[0],(u,p)=>{this.dynamicEntities.push(new _t(u,p,this.dynamicEntities[0].pos))}));else if(o==="o")++this.numCoins,this.dynamicEntities.push(new ct(e,i));else if(o=="b")this.dynamicEntities.push(new Ut(e,i));else if(o==="H")this.dynamicEntities.push(new Et(e,i,r));else if(o==="V")this.dynamicEntities.push(new yt(e,i));else if(o!=="-")console.error(`Unhandled tile type: ${n[e]}`)}}}update(t){let s=this.dynamicEntities.length,r=this.staticEntities.length,i,n=0;for(;n<s;++n){let o=this.dynamicEntities[n];if(o.update(t),o.dead){if(n==0)break;this.dynamicEntities.splice(n,1),--n,--s}o.physicsUpdate(t);for(i=n+1;i<s;++i)o.collision(this.dynamicEntities[i]);for(i=0;i<r;++i)o.collision(this.staticEntities[i])}let e=this.dynamicEntities[0];if(e.coinsCollected>=this.numCoins)if(this.levelDirector.playerIsOnLastLevel)this.transitionScene.targetScene=O,this.changeScene=m;else this.transitionScene.targetScene=A,this.changeScene=m;if(e.dead)this.transitionScene.targetScene=P,this.changeScene=m}render(){this.ctx.clearRect(0,0,y,g),this.camera.update(this.dynamicEntities[0].pos.x);let t=this.staticEntities.length,s=0;for(;s<t;++s)this.staticEntities[s].render(this.ctx,this.camera);t=this.dynamicEntities.length;for(s=0;s<t;++s)this.dynamicEntities[s].render(this.ctx,this.camera)}_onExit(){let t=this.dynamicEntities[0];this.levelDirector.update(!t.dead,Math.floor(t.maxColumn))}raycast(t){let s=this.staticEntities.length,r;while(t.y>=0){for(r=0;r<s;++r){let i=this.staticEntities[r];if(t.equals(i.pos))return i}--t.y}return null}}class Tt extends a{ctx;constructor(t){super();this.ctx=t}onEnter(){this.ctx.clearRect(0,0,y,g),this.ctx.font="30px Arial",this.ctx.fillStyle="white",this.ctx.fillText("You won! Congratulations!",170,g/2)}update(t){}render(){}_onExit(){}}class Lt extends a{targetScene=Q;timer=0;ctx;constructor(t){super();this.ctx=t}onEnter(){}update(t){if(this.timer+=t,this.timer>0.6)this.changeScene=this.targetScene}render(){let t=this.timer/0.5;this.ctx.fillStyle=`rgba(0,0,0, ${t})`,this.ctx.fillRect(0,0,y,g)}_onExit(){this.timer=0}}class Rt extends a{ctx;transitionScene;constructor(t,s){super();this.ctx=t,this.transitionScene=s}onEnter(){l.clear(),this.ctx.fillStyle=Z,this.ctx.font="48px Arial",this.ctx.fillText("YOU WON",250,200),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to keep going.",180,400)}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=z,this.changeScene=m}render(){}_onExit(){}}class Zt extends a{ctx;transitionScene;constructor(t,s){super();this.ctx=t,this.transitionScene=s}onEnter(){l.clear(),this.ctx.fillStyle="red",this.ctx.font="48px Arial",this.ctx.fillText("YOU LOST",243,200),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to try again.",195,400)}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=z,this.changeScene=m}render(){}_onExit(){}}class kt{canvas;ctx;currentScene;sceneManager;constructor(){this.canvas=document.createElement("canvas"),this.canvas.setAttribute("id","canvas"),this.canvas.width=y,this.canvas.height=g,this.ctx=this.canvas.getContext("2d"),document.getElementById("game").appendChild(this.canvas);let t=new Lt(this.ctx);this.sceneManager=new dt,this.sceneManager.registerScene(Q,new ht(this.ctx,t)),this.sceneManager.registerScene(z,new zt(this.ctx,t)),this.sceneManager.registerScene(O,new Tt(this.ctx)),this.sceneManager.registerScene(m,t),this.sceneManager.registerScene(A,new Rt(this.ctx,t)),this.sceneManager.registerScene(P,new Zt(this.ctx,t)),this.currentScene=this.sceneManager.getScene(Q),this.currentScene.onEnter()}start(){let t=0,s=(r)=>{let i=Math.min(0.05,(r-t)/1000);t=r,this.currentScene.update(i),this.currentScene.render();let n=this.currentScene.changeScene;if(n!==void 0)this.currentScene.onExit(),this.currentScene=this.sceneManager.getScene(n),this.currentScene.onEnter();window.requestAnimationFrame(s)};window.requestAnimationFrame(s)}}window.addEventListener("load",()=>{l.init(),new kt().start()});
