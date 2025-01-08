class ht{scenes={};registerScene(t,s){if(this.scenes[t]===void 0)this.scenes[t]=s;else console.error(`Key "${t}" for scene already exists! Scene not added to SceneManager.`)}getScene(t){return this.scenes[t]}}class g{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}var P="main menu",J="game",T="player won",c="transition",H="lost",E="won";var x=720,w=480,y=32,$=15,Bt=17,Pt=3,jt=2*Math.PI,G=20,j=30,Lt=0.625,Ot=0.9375,C=31,N=31,U=0.96875,I=0.96875,_=16,D=16,K=0.5,tt=0.5,st=25,rt=15,it=0.78125,nt=0.46875,Yt=10,At=0.3125,lt=2.5,pt=0.12109375,Mt=3.875,ot=0.6,Tt=2,Ht=2.5,Et=150,Gt=10,_t=10,Dt=10,L=0.5,Kt=0.5,z="start",O="end",l="death";var W;((d)=>{d[d.LEFT=0]="LEFT";d[d.RIGHT=1]="RIGHT";d[d.DOWN=2]="DOWN";d[d.UP=3]="UP";d[d.A=4]="A";d[d.D=5]="D";d[d.E=6]="E";d[d.G=7]="G";d[d.H=8]="H";d[d.I=9]="I";d[d.Q=10]="Q";d[d.R=11]="R";d[d.S=12]="S";d[d.W=13]="W";d[d.SPACE=14]="SPACE";d[d.ESCAPE=15]="ESCAPE";d[d.ENTER=16]="ENTER";d[d.SHIFT=17]="SHIFT";d[d.INVALID=18]="INVALID"})(W||={});class p{static _keys=[];static init(){for(let t=0;t<Object.keys(W).length;++t)p._keys.push(!1);window.addEventListener("keydown",p.onKeyDown),window.addEventListener("keyup",p.onKeyUp)}static isKeyDown(...t){let s=t.length;for(let r=0;r<s;++r)if(p._keys[t[r]])return!0;return!1}static keyStrToKey(t){switch(t){case"Down":case"ArrowDown":return 2;case"Up":case"ArrowUp":return 3;case"Right":case"ArrowRight":return 1;case"Left":case"ArrowLeft":return 0;case" ":case"Space":return 14;case"Escape":return 15;case"a":case"A":return 4;case"e":case"E":return 6;case"s":case"S":return 12;case"d":case"D":return 5;case"w":case"W":return 13;case"r":case"R":return 11;case"q":case"Q":return 10;case"g":case"G":return 7;case"h":case"H":return 8;case"i":case"I":return 9;case"Shift":return 17;case"Enter":return 16;default:return console.warn(`Unhandled key: ${t}.`),18}}static onKeyDown(t){let s=p.keyStrToKey(t.key);if(p._keys[s]=!0,s==2||s==3||s==0||s==1)t.preventDefault();return!1}static onKeyUp(t){return p._keys[p.keyStrToKey(t.key)]=!1,!1}static clear(){for(let t=0;t<p._keys.length;++t)p._keys[t]=!1}}class b{x;y;constructor(t,s){this.x=t,this.y=s}copy(){return new b(this.x,this.y)}zero(){this.x=0,this.y=0}equals(t){return this.x==t.x&&this.y==t.y}add(t){return new b(this.x+t.x,this.y+t.y)}addInPlace(t){this.x+=t.x,this.y+=t.y}subtract(t){return new b(this.x-t.x,this.y-t.y)}subtractInPlace(t){this.x-=t.x,this.y-=t.y}scalarAdd(t){this.x+=t,this.y+=t}scalarSubtract(t){this.x-=t,this.y-=t}scalarMultiply(t){return new b(this.x*t,this.y*t)}scalarMultiplyInPlace(t){this.x*=t,this.y*=t}dot(t){return this.x*t.x+this.y*t.y}squareComponents(){return this.x*this.x+this.y*this.y}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let t=this.magnitude();this.x/=t,this.y/=t}squareDistance(t){let s=this.x-t.x,r=this.y-t.y;return s*s+r*r}angle(t){return Math.atan2(t.y-this.y,t.x-this.x)}}var Z="rgba(150,150,255,1)";var es=Math.floor(x/y)-1;class bt extends g{ctx;transitionScene;fakePlayerPos;sign;constructor(t,s){super();this.ctx=t,this.transitionScene=s,this.fakePlayerPos=new b(10,($-2)*y),this.sign=1}onEnter(){this.ctx.clearRect(0,0,x,w),this.ctx.fillStyle=Z,this.ctx.font="48px Arial",this.ctx.fillText("Recformer",247,100),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to start",220,w*0.55);let t=this.fakePlayerPos.y+y;this.ctx.strokeStyle="white";for(let s=0;s<25;++s)this.ctx.strokeRect(s*y,t,C,N);this.ctx.fillStyle=Z}update(t){if(p.isKeyDown(14))this.transitionScene.targetScene=J,this.changeScene=c;let s=this.fakePlayerPos.x;if(s<1||s>es)this.sign*=-1;this.fakePlayerPos.x+=t*this.sign}render(){let t=this.fakePlayerPos.x*y,s=($-2)*y;this.ctx.clearRect(0,this.fakePlayerPos.y,x,j),this.ctx.fillRect(t,s,G,j)}_onExit(){}}class vt{startCol=0;endCol=0;offsetX=0;colsPerScreen=Math.ceil(x/y);update(t){let s=t-this.colsPerScreen/2;this.startCol=Math.max(0,Math.floor(s)),this.endCol=this.startCol+this.colsPerScreen,this.offsetX=-s*y+this.startCol*y}columnToScreen(t){return(t-this.startCol)*y+this.offsetX}rowToScreen(t){return t*y}}var R=0,S=1,et=2,k=3,ft=4,q=5;class F{pos;type;dead=!1;velocity=new b(0,0);gravity=new b(0,100);constructor(t,s){this.pos=t,this.type=s}physicsUpdate(t){this.velocity.addInPlace(this.gravity.scalarMultiply(t)),this.velocity.y=Math.min(this.velocity.y,30),this.pos.addInPlace(this.velocity.scalarMultiply(t))}}function ts(t,s,r){return Math.min(Math.max(t,s),r)}function Y(t,s,r,i){let n=new b(ts(r.x,t.x,t.x+s.x),ts(r.y,t.y,t.y+s.y));return r.subtract(n).squareComponents()<i*i}function ss(t,s,r,i){let{x:n,y:e}=t,o=n+s.x,u=e+s.y,h=r.x,m=r.y,Q=h+i.x,X=m+i.y;return n<Q&&o>h&&e<X&&u>m}class A extends F{r;constructor(t,s,r,i){super(new b(t,s),i);this.r=r}collision(t){if(t instanceof v){if(console.log(Y(t.pos,t.size,this.pos,this.r)),Y(t.pos,t.size,this.pos,this.r))this.handleCollision(t),t.handleCollision(this)}}}class v extends F{size;constructor(t,s,r,i,n){super(new b(t,s),n);this.size=new b(r,i)}collision(t){if(t instanceof v){if(ss(this.pos,this.size,t.pos,t.size))this.handleCollision(t),t.handleCollision(this)}else if(t instanceof A){if(Y(this.pos,this.size,t.pos,t.r))this.handleCollision(t),t.handleCollision(this)}}}var rs=6,is=8,fs=0.4;class at extends v{movingRight=!1;movingLeft=!1;moveMod=0;jumpTime=0;squash=1;stretch=1;coinsCollected=0;maxColumn=0;constructor(t,s){super(t,s,Lt,Ot,R)}update(t){if(this.pos.y>Bt){this.dead=!0;return}if(this.velocity.x=0,p.isKeyDown(5,1))this.movingRight=!0,this.velocity.x=rs,this.moveMod=Math.min(is,this.moveMod+t);if(p.isKeyDown(4,0))if(this.movingRight)this.movingRight=!1,this.velocity.x=0;else this.movingLeft=!0,this.velocity.x=-rs,this.moveMod=Math.min(is,this.moveMod+t);if(this.jumpTime<fs&&p.isKeyDown(14,3)){if(this.jumpTime===0)this.velocity.y=-15;else if(this.jumpTime<0.2)this.velocity.y-=2;this.velocity.y=Math.max(-20,this.velocity.y),this.squash=Math.min(1.03,this.squash+0.01),this.stretch=Math.max(0.97,this.stretch-0.01),this.jumpTime+=t}else if(this.squash!=this.stretch)this.squash+=0.01,this.stretch-=0.01;this.maxColumn=Math.max(this.pos.x,this.maxColumn)}handleCollision(t){switch(t.type){case S:{let s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),i=s.subtract(r);this.size.add(t.size).scalarMultiply(0.5);let e=Math.abs(Math.atan(i.y/i.x));if(!(e<0.96&&e>0.698)&&Math.abs(i.x/this.size.x)>Math.abs(i.y/this.size.y))if(i.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x;else if(i.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y,this.velocity.y=0,this.jumpTime=0,this.stretch=1.01,this.squash=0.99;break}case et:{++this.coinsCollected;break}case q:case k:{this.dead=!0;break}case ft:{this.jumpTime=0,this.velocity.y=Math.min(this.velocity.y,0);break}default:{console.warn(`Player unhandled collision type: ${t.type}.`);break}}}render(t,s){t.fillStyle=Z;let r=s.columnToScreen(this.pos.x),i=s.rowToScreen(this.pos.y),n=j*this.squash,e=G*this.stretch;if(this.movingRight){let o=new Path2D;o.moveTo(r,i),o.lineTo(r-this.moveMod,i+n),o.lineTo(r+e-this.moveMod,i+n),o.lineTo(r+e,i),o.closePath(),t.fill(o,"evenodd"),this.movingRight=!1}else if(this.movingLeft){let o=new Path2D;o.moveTo(r,i),o.lineTo(r+this.moveMod,i+n),o.lineTo(r+e+this.moveMod,i+n),o.lineTo(r+e,i),o.closePath(),t.fill(o,"evenodd"),this.movingLeft=!1}else t.fillRect(r,i,e,n)}}class mt extends v{constructor(t,s){super(t,s,U,I,S)}update(t){}handleCollision(t){}render(t,s){t.strokeStyle="white",t.strokeRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),C,N)}}class yt extends v{minY;maxY;yMod;constructor(t,s){super(t+0.25,s+0.25,K,tt,et);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=s+0.3,this.minY=s+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===R)this.dead=!0}render(t,s){t.fillStyle="yellow",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),_,D)}}class xt extends v{maxColumns;constructor(t,s,r){super(t+0.25,s+0.25,it,nt,k);this.velocity.x=3,this.gravity.y=0,this.maxColumns=r}update(t){if(this.pos.x<0||this.pos.x>this.maxColumns)this.velocity.x*=-1}handleCollision(t){if(t.type===S){let s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),i=s.subtract(r);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(i.x/this.size.x)>Math.abs(i.y/this.size.y))if(this.velocity.x*=-1,i.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x}else if(t.type===q)this.dead=!0}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),st,rt)}}class gt extends v{constructor(t,s){super(t,s+0.1,nt,it,k);this.velocity.y=3,this.gravity.y=0,this.pos.x+=0.25}update(t){if(this.pos.y<0||this.pos.y>=$)this.velocity.y*=-1}handleCollision(t){if(t.type===S){let s=this.pos.add(this.size.scalarMultiply(0.5)),r=t.pos.add(t.size.scalarMultiply(0.5)),i=s.subtract(r);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(i.x/this.size.x)<Math.abs(i.y/this.size.y))if(this.velocity.y*=-1,i.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y}else if(t.type===q)this.dead=!0}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),rt,st)}}class ct{src;tgt;probability;constructor(t,s,r){this.src=t,this.tgt=s,this.probability=r}}class M{name;reward;utility;isTerminal;neighbors;constructor(t,s,r,i,n){this.name=t,this.reward=s,this.utility=r,this.isTerminal=i,this.neighbors=n}}class ut{nodes;edges;constructor(){this.nodes={},this.edges={}}getNode(t){return this.nodes[t]}hasNode(t){return t in this.nodes}addNode(t){this.nodes[t.name]=t}addDefaultNode(t,s=1,r=0,i=!1,n=null){if(n==null)n=[];this.nodes[t]=new M(t,s,r,i,n)}removeNode(t){let s=[];for(let r of Object.values(this.edges)){if(r.src==t||r.tgt==t)s.push(r);let i=r.probability,n=-1;for(let h=0;h<i.length;h++){let[m,Q]=i[h];if(m==t){n=h;break}}if(n==-1)continue;let e=i[n][1];i.splice(n,1);let o=i.length,u=e/o;r.probability=i.map(([h,m])=>[h,m+u])}for(let r of s)this.removeEdge(r.src,r.tgt);delete this.nodes[t]}getEdge(t,s){return this.edges[`${t},${s}`]}hasEdge(t,s){return`${t},${s}`in this.edges}addEdge(t){this.edges[`${t.src},${t.tgt}`]=t;let s=this.nodes[t.src].neighbors;if(!s.includes(t.tgt))s.push(t.tgt)}addDefaultEdge(t,s,r=null){if(r==null)r=[[s,1]];this.addEdge(new ct(t,s,r))}removeEdge(t,s){let r=this.nodes[t],i=r.neighbors.indexOf(s);r.neighbors.splice(i,1),delete this.edges[`${t},${s}`]}neighbors(t){return this.nodes[t].neighbors}setNodeUtilities(t){for(let[s,r]of Object.entries(t))this.nodes[s].utility=r}utility(t){return this.nodes[t].utility}reward(t){return this.nodes[t].reward}isTerminal(t){return this.nodes[t].isTerminal}mapNodes(t){for(let s of Object.values(this.nodes))t(s)}mapEdges(t){for(let s of Object.values(this.edges))t(s)}}function V(t){return t[Math.floor(Math.random()*t.length)]}function B(t,s,r,i){let n=t.getEdge(s,r).probability,e=n.length,o=0;for(let u=0;u<e;++u){let[h,m]=n[u];o+=m*(t.reward(h)+i*t.utility(h))}return o}function dt(t,s,r){let i=t.getNode(s);if(i.isTerminal)return 0;let n=i.neighbors,e=n.length,o=-1/0;for(let u=0;u<e;++u)o=Math.max(o,B(t,s,n[u],r));return o}function wt(t){for(let s in t.nodes)t.nodes[s].utility=0}function St(t){let s={};for(let r in t.nodes)if(!t.getNode(r).isTerminal)s[r]=[...t.neighbors(r)];return s}function $t(t,s){let r={};for(let i in t.nodes){if(t.getNode(i).isTerminal)continue;let n=-1/0,e=[];for(let o of t.neighbors(i)){let u=B(t,i,o,s);if(u===n)e.push(o);else if(u>n)n=u,e.length=0,e.push(o)}r[i]=e}return r}function us(t,s,r,i){for(let n=0;n<i;++n)for(let e in t.nodes){let o=t.getNode(e);if(!o.isTerminal)o.utility=B(t,e,V(s[e]),r)}}function ds(t,s,r,i){for(let n=0;n<i;++n){let e={};for(let o in t.nodes)if(!t.getNode(o).isTerminal)e[o]=B(t,o,V(s[o]),r);t.setNodeUtilities(e)}}function hs(t,s,r,i){for(let n=0;n<i;++n)for(let e in t.nodes)t.getNode(e).utility=dt(t,e,r)}function ls(t,s,r,i){for(let n=0;n<i;++n){let e={};for(let o in t.nodes)e[o]=dt(t,o,r);t.setNodeUtilities(e)}}function ns(t,s,r){let i=!1;for(let n in t.nodes){if(t.getNode(n).isTerminal)continue;let e=null,o=-1/0;for(let u of t.neighbors(n)){let h=B(t,n,u,r);if(h===o);else if(h>o)e=u,o=h}if(V(s[n])!==e)s[n].length=0,s[n].push(e),i=!0}return i}function zt(t,s,r=!1,i=!1,n=10,e=!0){if(e)wt(t);let o=St(t),u;if(r&&i)u=us;else if(r&&!i)u=ds;else if(!r&&i)u=hs;else u=ls;let h=!0;while(h)u(t,o,s,n),h=ns(t,o,s);return u(t,o,s,n),ns(t,o,s),$t(t,s)}class a extends M{visitedCount;sumPercentCompleted;depth;designerReward;playerReward;constructor(t,s,r,i,n,e){super(t,s,r,i,n);this.designerReward=s,this.playerReward=0,this.depth=e,this.visitedCount=1,this.sumPercentCompleted=1}updateReward(){this.reward=this.designerReward*this.visitedCount}}var f=new ut;f.addNode(new a(z,0,0,!1,[],-1));f.addNode(new a(l,-1,0,!0,[],-1));f.addNode(new a(O,1,0,!0,[],-1));f.addNode(new a("1-a",-0.95,0,!1,[],1));f.addNode(new a("2-a",-0.925,0,!1,[],2));f.addNode(new a("2-b",-0.925,0,!1,[],2));f.addNode(new a("3-a",-0.9,0,!1,[],3));f.addNode(new a("3-b",-0.9,0,!1,[],3));f.addNode(new a("4-a",-0.825,0,!1,[],4));f.addNode(new a("4-b",-0.825,0,!1,[],4));f.addNode(new a("5-a",-0.8,0,!1,[],5));f.addNode(new a("5-b",-0.8,0,!1,[],5));f.addNode(new a("5-c",-0.8,0,!1,[],5));f.addNode(new a("6-a",-0.775,0,!1,[],6));f.addNode(new a("7-a",-0.75,0,!1,[],7));f.addNode(new a("6-b",-0.775,0,!1,[],6));f.addNode(new a("1-b",-0.95,0,!1,[],1));f.addDefaultEdge(z,"1-a",[["1-a",0.99],[l,0.01]]);f.addDefaultEdge("1-a","2-b",[["2-b",0.99],[l,0.01]]);f.addDefaultEdge("1-a","2-a",[["2-a",0.99],[l,0.01]]);f.addDefaultEdge("2-a","3-a",[["3-a",0.99],[l,0.01]]);f.addDefaultEdge("2-b","3-b",[["3-b",0.99],[l,0.01]]);f.addDefaultEdge("3-a","4-b",[["4-b",0.99],[l,0.01]]);f.addDefaultEdge("3-a","4-a",[["4-a",0.99],[l,0.01]]);f.addDefaultEdge("3-b","4-b",[["4-b",0.99],[l,0.01]]);f.addDefaultEdge("3-b","4-a",[["4-a",0.99],[l,0.01]]);f.addDefaultEdge("4-a","5-b",[["5-b",0.99],[l,0.01]]);f.addDefaultEdge("4-a","5-a",[["5-a",0.99],[l,0.01]]);f.addDefaultEdge("4-a","5-c",[["5-c",0.99],[l,0.01]]);f.addDefaultEdge("4-b","5-b",[["5-b",0.99],[l,0.01]]);f.addDefaultEdge("4-b","5-a",[["5-a",0.99],[l,0.01]]);f.addDefaultEdge("4-b","5-c",[["5-c",0.99],[l,0.01]]);f.addDefaultEdge("5-a","6-a",[["6-a",0.99],[l,0.01]]);f.addDefaultEdge("5-a","6-b",[["6-b",0.99],[l,0.01]]);f.addDefaultEdge("5-b","6-a",[["6-a",0.99],[l,0.01]]);f.addDefaultEdge("5-b","6-b",[["6-b",0.99],[l,0.01]]);f.addDefaultEdge("5-c","6-a",[["6-a",0.99],[l,0.01]]);f.addDefaultEdge("5-c","6-b",[["6-b",0.99],[l,0.01]]);f.addDefaultEdge("6-a","7-a",[["7-a",0.99],[l,0.01]]);f.addDefaultEdge("7-a","end",[["end",0.99],[l,0.01]]);f.addDefaultEdge("6-b","7-a",[["7-a",0.99],[l,0.01]]);f.addDefaultEdge(z,"1-b",[["1-b",0.99],[l,0.01]]);f.addDefaultEdge("1-b","2-b",[["2-b",0.99],[l,0.01]]);f.addDefaultEdge("1-b","2-a",[["2-a",0.99],[l,0.01]]);var os={"1-a":["------------XXX-","-------------T--","----------------","----------------","----------------","----------------","----------------","----------------","-----X-C-----X--","--------------b-","-----------o----","--------o-XX----","------o-XXXX----","------XXXXXX----","XXXXXXXXXXXXXXXX"],"2-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-------XXXXXXXX-------","----------------------","-------V--o---V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"2-b":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"3-a":["----------------------","----------------------","----------------------","----------------------","-----------o----------","----------------------","---------XXXXX--------","-----------o----------","----------------------","-------X-H-----X------","---XX--XXXXXXXXX--XX--","----------------------","-------V---o---V----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"3-b":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","--------V---V---------","----------o-----------","----------------------","------XXXXXXXXX-------","----------------------","----------o---------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"4-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------XXX---","-----------------V----","-------X---XX-----V---","------XX------o-V---o-","-----XXX--------------","XXXXXXXX---XXXXXXXXXXX"],"4-b":["--------------------XX","--------------------XX","--------------------XX","--------------------XX","--------------------XX","-----------X-H---o--XX","-----------------o--XX","---------o----------XX","-----------XXXXXXX--XX","--------------------XX","-------X------------XX","------XXX-----------XX","-----XXXXX-----------o","----XXXXXXX-----------","XXXXXXXXXXXXXXXX--XXXX"],"5-a":["--------XXXXXXXXXXXXXX--------","-------------------ooX--------","---------------------X--------","---------------------X--------","------------------XXXX--------","------------------X-----------","-----------o--XXXXX-----------","------------------------------","---------XX-----------------o-","------------------------------","--------------XX---XXX----XXXX","------------------------------","----------XX------------------","------------------------------","XXXXXXXX----------------------"],"5-b":["------------------------------","-o----------------------------","------------------------------","XXX---------------------------","------------------------------","-----XXX----------------------","------------------------------","-----------XXX----------------","-o--------------------------o-","------XXX---------------------","XXX-----------------------XXXX","------------XXX-------XX------","------------------XX----------","------------------------------","XXXXXXXX---XXXXX--------------"],"5-c":["o-----------------------------","------------------------------","X---XX------------------------","------------------------------","------------------------------","XX----------------------------","--------XXXXX-----------------","--------Xoo-------------------","XXX-----Xoo----o------------o-","--------X---------------------","--------XXX---XX----XX----XXXX","XXXX--------------------------","------------------------------","------------------------------","XXXXXXXX----------------------"],"6-a":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","-------oo---XXXXXXXX----------","-o----------XXXXXXXX----------","------XXXX--XXXXXXXX----------","--------------o---------------","XXXX--------------------------","-------------XXXX-----------o-","---------------------XX-------","XXXXXXXX-----------------XXXXX"],"7-a":["-------------------V---------------","-----------------o---o-------------","------------X-H------------H--XXX--","-----V------XXXXXXXXXXXXXXXXXXXXX--","--------XX----o--------------------","-----------------------------------","-----------XXXXXX---Ho-------------","-----------------------------------","-------------V------XX--------H----","-----------------------------------","XX--------o------XXXXX----H--------","-----------------------------------","---X----H----H-X-----------------o-","---XXXXXXXXXXXXX-------------------","XXXX--------------------------XXXXX"],end:["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----oooooooooooooooooo","XXXXXXXXXXXXXXXXXXXXXX"],"6-b":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX--o-------","-o--------XXXXXXXXXX----------","----------XXXXXXXXXX--X-------","----------XXXXXXXXXX----------","XXX-------XXXXXXXXXXX---------","------XX-----oooo-----------o-","------------------------------","XXXX--------XXXXXX---XX---XXXX"],"1-b":["---------XXX----","----------T-----","----------------","----------------","----------------","----------------","----------------","----X-----X-----","-------oo------C","----------------","-------XX-------","----o-XXXX-o----","-----XXXXXX-----","---XXXXXXXXXX---","XXXXXXXXXXXXXXXX"]};class Ct{playerIsOnLastLevel=!1;keys;columnsPerLevel;lossesInARow=0;playerWonLastRound=!1;constructor(){}update(t,s){let r=this.keys.length,i=[];if(t){for(let e=0;e<r;++e)i.push(1);this.lossesInARow=0}else{let e=s;for(let o=0;o<r;++o)if(e>this.columnsPerLevel[o])i[o]=1,e-=this.columnsPerLevel[o];else{i[o]=e/this.columnsPerLevel[o];break}}let n=i.length;for(let e=0;e<n;++e){let o=i[e],u=this.keys[e],h=f.getNode(u);if(o===1){if(!f.hasEdge(z,u))f.addDefaultEdge(z,u,[[u,1],[l,0]])}++h.visitedCount,h.sumPercentCompleted+=o,h.updateReward();let m=h.sumPercentCompleted/h.visitedCount,Q=1-m;f.mapEdges((X)=>{if(X.tgt===u)X.probability[0][1]=m,X.probability[1][1]=Q})}if(!t){++this.lossesInARow;for(let e=0;e<this.lossesInARow;++e){let o=f.getNode(z).neighbors,u=o.length;if(u===1)break;let h="",m=-1e4;for(let Q=0;Q<u;++Q){let X=o[Q],Rt=f.getNode(X).depth;if(Rt>m)h=X,m=Rt}console.log("removing edge:",h,m),f.removeEdge(z,h)}}this.playerWonLastRound=t}get(t){let s=zt(f,0.95,!0,!0,20);if(this.columnsPerLevel=[],this.playerWonLastRound)this.keys=[V(s[z])];else this.keys=[z];for(let n=0;n<t;++n){let e=V(s[this.keys[n]]);if(this.keys.push(e),e===O)break}this.keys.splice(0,1),this.playerIsOnLastLevel=this.keys.includes(O);let r=Array($).fill(""),i=this.keys.length;for(let n=0;n<i;++n){let e=os[this.keys[n]];this.columnsPerLevel.push(e[0].length);for(let o=0;o<$;++o)r[o]+=e[o]}return r}}class Ut extends F{spawnLaser;vertical;color;time=0;state=0;constructor(t,s,r,i){super(t,s,U,I,S);this.spawnLaser=i,this.vertical=r,this.color="yellow",this.gravity.y=0}update(t){switch(this.time+=t,this.state){case 0:{if(this.time>=ot)this.time=0,this.state=1,this.color="yellow";break}case 1:{if(this.time>=Tt)this.time=0,this.state=0,this.color="red",this.spawnLaser();break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,s){t.strokeStyle=this.color;let r=s.columnToScreen(this.pos.x),i=s.rowToScreen(this.pos.y),n=i+N;t.beginPath(),t.moveTo(r,n),t.lineTo(r+C/2,i),t.lineTo(r+C,n),t.lineTo(r,n),t.stroke(),t.strokeStyle="white",t.beginPath(),t.moveTo(r,i),t.lineTo(r+C,i),t.stroke()}}class kt extends F{vertical;time=0;constructor(t,s,r,i){super(t+(U-pt)/2,s,pt,i,k);this.vertical=r,this.gravity.y=0}update(t){if(this.time+=t,this.time>=ot)this.dead=!0}handleCollision(t){}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),Mt,this.size.y*y)}}var ps=2000;class qt extends v{minY;maxY;yMod;constructor(t,s){super(t+0.25,s+0.25,K,tt,ft);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=s+0.3,this.minY=s+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===R){let s=this.pos.y;this.pos.y=100,setTimeout(()=>{this.pos.y=s},ps)}}render(t,s){t.fillStyle="#05D5FA",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),_,D)}}class Ft extends v{player;spawnBullet;color;time=0;state=0;constructor(t,s,r,i){super(t,s,U,I,S);this.player=r,this.spawnBullet=i,this.color="yellow",this.gravity.y=0}update(t){switch(this.state){case 0:{if(this.pos.squareDistance(this.player.pos)<=Et)this.color="red",this.state=1;break}case 1:{if(this.time+=t,this.time>=Ht)this.time=0,this.state=2;break}case 2:{this.state=0,this.color="yellow";let s=this.pos.angle(this.player.pos),r=Math.cos(s),i=Math.sin(s);this.spawnBullet(this.pos.x+(L+U)*r,this.pos.y+(L+U)*i);break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,s){t.strokeStyle=this.color;let r=s.columnToScreen(this.pos.x),i=s.rowToScreen(this.pos.y),n=C/2,e=2*n,o=new b(r+n,i);t.beginPath(),t.arc(o.x,o.y,n,0,Math.PI),t.stroke();let u=this.pos.angle(this.player.pos),h=Math.cos(u),m=Math.sin(u);t.lineWidth=4,t.beginPath(),t.moveTo(o.x+n*h,o.y+n*m),t.lineTo(o.x+e*h,o.y+e*m),t.stroke(),t.lineWidth=1}}class Qt extends v{constructor(t,s,r){super(t,s,L,Kt,q);this.gravity.y=0,this.velocity=r.subtract(this.pos),this.velocity.normalize(),this.velocity.scalarMultiplyInPlace(Gt)}update(t){}handleCollision(t){this.dead=!0}render(t,s){t.fillStyle="red",t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),_t,Dt)}}class Xt extends A{angle=0;start;constructor(t,s){super(t,s,At,k);this.start=new b(t,s),this.gravity.y=0}update(t){this.angle+=t,this.velocity.x=2*lt*Math.cos(this.angle),this.velocity.y=lt*Math.sin(this.angle)}handleCollision(t){if(t.type===q)this.dead=!0}render(t,s){t.fillStyle="red",t.beginPath(),t.arc(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),Yt,0,jt),t.fill()}}class Jt extends g{ctx;transitionScene;camera;numCoins;levelDirector;staticEntities;dynamicEntities;constructor(t,s){super();this.ctx=t,this.transitionScene=s,this.camera=new vt,this.levelDirector=new Ct}onEnter(){this.dynamicEntities=[],this.staticEntities=[],this.numCoins=0,this.dynamicEntities.push(new at(2,12));let t=this.levelDirector.get(Pt),s=t.length;if(s!==$){console.error("Level should have 15 rows!");return}let r=t[0].length;for(let i=0;i<s;++i){let n=t[i];if(r!==n.length){console.error(`Every row in the level should have the same number of columns! (${r} !== ${n.length}).`);return}for(let e=0;e<r;++e){let o=n[e];if(o==="X")this.staticEntities.push(new mt(e,i));else if(o==="^")this.dynamicEntities.push(new Ut(e,i,!0,()=>{let u=this.raycast(new b(e,i)),h=u===null?$:i-u.pos.y-1;this.dynamicEntities.push(new kt(e,i-h,!0,h))}));else if(o==="T")this.dynamicEntities.push(new Ft(e,i,this.dynamicEntities[0],(u,h)=>{this.dynamicEntities.push(new Qt(u,h,this.dynamicEntities[0].pos))}));else if(o==="o")++this.numCoins,this.dynamicEntities.push(new yt(e,i));else if(o=="b")this.dynamicEntities.push(new qt(e,i));else if(o==="H")this.dynamicEntities.push(new xt(e,i,r));else if(o==="V")this.dynamicEntities.push(new gt(e,i));else if(o==="C")this.dynamicEntities.push(new Xt(e,i));else if(o!=="-")console.error(`Unhandled tile type: ${n[e]}`)}}}update(t){let s=this.dynamicEntities.length,r=this.staticEntities.length,i,n=0;for(;n<s;++n){let o=this.dynamicEntities[n];if(o.update(t),o.dead){if(n==0)break;this.dynamicEntities.splice(n,1),--n,--s}o.physicsUpdate(t);for(i=n+1;i<s;++i)o.collision(this.dynamicEntities[i]);for(i=0;i<r;++i)o.collision(this.staticEntities[i])}let e=this.dynamicEntities[0];if(e.coinsCollected>=this.numCoins)if(this.levelDirector.playerIsOnLastLevel)this.transitionScene.targetScene=T,this.changeScene=c;else this.transitionScene.targetScene=E,this.changeScene=c;if(e.dead)this.transitionScene.targetScene=H,this.changeScene=c}render(){this.ctx.clearRect(0,0,x,w),this.camera.update(this.dynamicEntities[0].pos.x);let t=this.staticEntities.length,s=0;for(;s<t;++s)this.staticEntities[s].render(this.ctx,this.camera);t=this.dynamicEntities.length;for(s=0;s<t;++s)this.dynamicEntities[s].render(this.ctx,this.camera)}_onExit(){let t=this.dynamicEntities[0];this.levelDirector.update(!t.dead,Math.floor(t.maxColumn))}raycast(t){let s=this.staticEntities.length,r;while(t.y>=0){for(r=0;r<s;++r){let i=this.staticEntities[r];if(t.equals(i.pos))return i}--t.y}return null}}class Vt extends g{ctx;constructor(t){super();this.ctx=t}onEnter(){this.ctx.clearRect(0,0,x,w),this.ctx.font="30px Arial",this.ctx.fillStyle="white",this.ctx.fillText("You won! Congratulations!",170,w/2)}update(t){}render(){}_onExit(){}}class Zt extends g{targetScene=P;timer=0;ctx;constructor(t){super();this.ctx=t}onEnter(){}update(t){if(this.timer+=t,this.timer>0.6)this.changeScene=this.targetScene}render(){let t=this.timer/0.5;this.ctx.fillStyle=`rgba(0,0,0, ${t})`,this.ctx.fillRect(0,0,x,w)}_onExit(){this.timer=0}}class Nt extends g{ctx;transitionScene;constructor(t,s){super();this.ctx=t,this.transitionScene=s}onEnter(){p.clear(),this.ctx.fillStyle=Z,this.ctx.font="48px Arial",this.ctx.fillText("YOU WON",250,200),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to keep going.",180,400)}update(t){if(p.isKeyDown(14))this.transitionScene.targetScene=J,this.changeScene=c}render(){}_onExit(){}}class It extends g{ctx;transitionScene;constructor(t,s){super();this.ctx=t,this.transitionScene=s}onEnter(){p.clear(),this.ctx.fillStyle="red",this.ctx.font="48px Arial",this.ctx.fillText("YOU LOST",243,200),this.ctx.fillStyle="white",this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to try again.",195,400)}update(t){if(p.isKeyDown(14))this.transitionScene.targetScene=J,this.changeScene=c}render(){}_onExit(){}}class Wt{canvas;ctx;currentScene;sceneManager;constructor(){this.canvas=document.createElement("canvas"),this.canvas.setAttribute("id","canvas"),this.canvas.width=x,this.canvas.height=w,this.ctx=this.canvas.getContext("2d"),document.getElementById("game").appendChild(this.canvas);let t=new Zt(this.ctx);this.sceneManager=new ht,this.sceneManager.registerScene(P,new bt(this.ctx,t)),this.sceneManager.registerScene(J,new Jt(this.ctx,t)),this.sceneManager.registerScene(T,new Vt(this.ctx)),this.sceneManager.registerScene(c,t),this.sceneManager.registerScene(E,new Nt(this.ctx,t)),this.sceneManager.registerScene(H,new It(this.ctx,t)),this.currentScene=this.sceneManager.getScene(P),this.currentScene.onEnter()}start(){let t=0,s=(r)=>{let i=Math.min(0.05,(r-t)/1000);t=r,this.currentScene.update(i),this.currentScene.render();let n=this.currentScene.changeScene;if(n!==void 0)this.currentScene.onExit(),this.currentScene=this.sceneManager.getScene(n),this.currentScene.onEnter();window.requestAnimationFrame(s)};window.requestAnimationFrame(s)}}window.addEventListener("load",()=>{p.init(),new Wt().start()});
