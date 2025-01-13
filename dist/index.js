class m{x;y;constructor(t,s){this.x=t,this.y=s}copy(){return new m(this.x,this.y)}zero(){this.x=0,this.y=0}equals(t){return this.x==t.x&&this.y==t.y}add(t){return new m(this.x+t.x,this.y+t.y)}addInPlace(t){this.x+=t.x,this.y+=t.y}subtract(t){return new m(this.x-t.x,this.y-t.y)}subtractInPlace(t){this.x-=t.x,this.y-=t.y}scalarAdd(t){this.x+=t,this.y+=t}scalarSubtract(t){this.x-=t,this.y-=t}scalarMultiply(t){return new m(this.x*t,this.y*t)}scalarMultiplyInPlace(t){this.x*=t,this.y*=t}dot(t){return this.x*t.x+this.y*t.y}squareComponents(){return this.x*this.x+this.y*this.y}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let t=this.magnitude();this.x/=t,this.y/=t}squareDistance(t){let s=this.x-t.x,i=this.y-t.y;return s*s+i*i}angle(t){return Math.atan2(t.y-this.y,t.x-this.x)}}function Pt(t,s){return Math.floor(Math.random()*(s-t+1)+t)}function Lt(t,s,i){return Math.min(Math.max(t,s),i)}function E(t,s,i,r){let o=new m(Lt(i.x,t.x,t.x+s.x),Lt(i.y,t.y,t.y+s.y));return i.subtract(o).squareComponents()<r*r}function Yt(t,s,i,r){let{x:o,y:e}=t,n=o+s.x,f=e+s.y,h=i.x,a=i.y,J=h+r.x,V=a+r.y;return o<J&&n>h&&e<V&&f>a}var Mt=typeof window!=="undefined",g=[];function Tt(t){g.push(new Audio("audio/coin_1.wav")),g.push(new Audio("audio/coin_2.wav")),g.push(new Audio("audio/coin_3.wav")),g.push(new Audio("audio/coin_4.wav")),g.push(new Audio("audio/coin_5.wav")),g.push(new Audio("audio/laser.wav"));let s=()=>{let i=!0;for(let r=0;r<g.length;++r)if(!g[r].readyState){i=!1;break}if(i)g[5].volume=0.4,t();else setTimeout(s,100)};s()}function Ht(){if(Mt){let t=Pt(0,4);g[t].currentTime=0.15,g[t].play()}}function Et(){if(Mt)g[5].currentTime=0,g[5].play()}class mt{scenes={};registerScene(t,s){if(this.scenes[t]===void 0)this.scenes[t]=s;else console.error(`Key "${t}" for scene already exists! Scene not added to SceneManager.`)}getScene(t){return this.scenes[t]}}class w{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}var O="main menu",Z="game",_="player won",C="transition",G="lost",D="won";var c=720,$=480,x=32,k=15,_t=17,Gt=3,Dt=2*Math.PI,K=20,L=30,Kt=0.625,ts=0.9375,U=31,I=31,q=0.96875,R=0.96875,tt=16,st=16,it=0.5,rt=0.5,ot=25,nt=15,et=0.78125,ut=0.46875,ss=10,is=0.3125,bt=2.5,at=0.12109375,rs=3.875,ft=0.6,os=2,ns=2.5,es=150,us=10,fs=10,ds=10,P=0.5,hs=0.5,F="start",Y="end",p="death";var W;((d)=>{d[d.LEFT=0]="LEFT";d[d.RIGHT=1]="RIGHT";d[d.DOWN=2]="DOWN";d[d.UP=3]="UP";d[d.A=4]="A";d[d.D=5]="D";d[d.E=6]="E";d[d.G=7]="G";d[d.H=8]="H";d[d.I=9]="I";d[d.Q=10]="Q";d[d.R=11]="R";d[d.S=12]="S";d[d.W=13]="W";d[d.SPACE=14]="SPACE";d[d.ESCAPE=15]="ESCAPE";d[d.ENTER=16]="ENTER";d[d.SHIFT=17]="SHIFT";d[d.INVALID=18]="INVALID"})(W||={});class l{static _keys=[];static init(){for(let t=0;t<Object.keys(W).length;++t)l._keys.push(!1);window.addEventListener("keydown",l.onKeyDown),window.addEventListener("keyup",l.onKeyUp)}static isKeyDown(...t){let s=t.length;for(let i=0;i<s;++i)if(l._keys[t[i]])return!0;return!1}static keyStrToKey(t){switch(t){case"Down":case"ArrowDown":return 2;case"Up":case"ArrowUp":return 3;case"Right":case"ArrowRight":return 1;case"Left":case"ArrowLeft":return 0;case" ":case"Space":return 14;case"Escape":return 15;case"a":case"A":return 4;case"e":case"E":return 6;case"s":case"S":return 12;case"d":case"D":return 5;case"w":case"W":return 13;case"r":case"R":return 11;case"q":case"Q":return 10;case"g":case"G":return 7;case"h":case"H":return 8;case"i":case"I":return 9;case"Shift":return 17;case"Enter":return 16;default:return console.warn(`Unhandled key: ${t}.`),18}}static onKeyDown(t){let s=l.keyStrToKey(t.key);if(l._keys[s]=!0,s==2||s==3||s==0||s==1)t.preventDefault();return!1}static onKeyUp(t){return l._keys[l.keyStrToKey(t.key)]=!1,!1}static clear(){for(let t=0;t<l._keys.length;++t)l._keys[t]=!1}}var y="#fe546f";var S="#ffd080",A="#fffdff",ps="#0bffe6";var dt="#9696ff";var ls="#130833";var ys=Math.floor(c/x)-1;class yt extends w{ctx;transitionScene;fakePlayerPos;sign;constructor(t,s){super();this.ctx=t,this.transitionScene=s,this.fakePlayerPos=new m(10,(k-2)*x),this.sign=1}onEnter(){this.ctx.clearRect(0,0,c,$),this.ctx.fillStyle=S,this.ctx.font="48px Arial",this.ctx.fillText("Recformer",247,100),this.ctx.fillStyle=S,this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to start",220,$*0.55);let t=this.fakePlayerPos.y+x;this.ctx.strokeStyle="white";for(let s=0;s<25;++s)this.ctx.strokeRect(s*x,t,U,I)}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=Z,this.changeScene=C;let s=this.fakePlayerPos.x;if(s<1||s>ys)this.sign*=-1;this.fakePlayerPos.x+=t*this.sign}render(){let t=this.fakePlayerPos.x*x,s=(k-2)*x;this.ctx.fillStyle=ls,this.ctx.clearRect(0,this.fakePlayerPos.y,c,L),this.ctx.fillStyle=dt,this.ctx.fillRect(t,s,K,L)}_onExit(){}}class xt{startCol=0;endCol=0;offsetX=0;colsPerScreen=Math.ceil(c/x);update(t){let s=t-this.colsPerScreen/2;this.startCol=Math.max(0,Math.floor(s)),this.endCol=this.startCol+this.colsPerScreen,this.offsetX=-s*x+this.startCol*x}columnToScreen(t){return(t-this.startCol)*x+this.offsetX}rowToScreen(t){return t*x}}var B=0,z=1,ht=2,Q=3,pt=4,X=5;class M{pos;type;dead=!1;velocity=new m(0,0);gravity=new m(0,100);constructor(t,s){this.pos=t,this.type=s}physicsUpdate(t){this.velocity.addInPlace(this.gravity.scalarMultiply(t)),this.velocity.y=Math.min(this.velocity.y,30),this.pos.addInPlace(this.velocity.scalarMultiply(t))}}class T extends M{r;constructor(t,s,i,r){super(new m(t,s),r);this.r=i}collision(t){if(t instanceof v){if(E(t.pos,t.size,this.pos,this.r))this.handleCollision(t),t.handleCollision(this)}}}class v extends M{size;constructor(t,s,i,r,o){super(new m(t,s),o);this.size=new m(i,r)}collision(t){if(t instanceof v){if(Yt(this.pos,this.size,t.pos,t.size))this.handleCollision(t),t.handleCollision(this)}else if(t instanceof T){if(E(this.pos,this.size,t.pos,t.r))this.handleCollision(t),t.handleCollision(this)}}}var vs=6,ms=8,xs=0.4;class ct extends v{movingRight=!1;movingLeft=!1;moveMod=0;jumpTime=0;squash=1;stretch=1;coinsCollected=0;maxColumn=0;constructor(t,s){super(t,s,Kt,ts,B)}update(t){if(this.pos.y>_t){this.dead=!0;return}if(this.velocity.x=0,l.isKeyDown(5,1))this.movingRight=!0,this.velocity.x=vs,this.moveMod=Math.min(ms,this.moveMod+t);if(l.isKeyDown(4,0))if(this.movingRight)this.movingRight=!1,this.velocity.x=0;else this.movingLeft=!0,this.velocity.x=-vs,this.moveMod=Math.min(ms,this.moveMod+t);if(this.jumpTime<xs&&l.isKeyDown(14,3)){if(this.jumpTime===0)this.velocity.y=-15;else if(this.jumpTime<0.2)this.velocity.y-=2;this.velocity.y=Math.max(-20,this.velocity.y),this.squash=Math.min(1.03,this.squash+0.01),this.stretch=Math.max(0.97,this.stretch-0.01),this.jumpTime+=t}else if(this.squash!=this.stretch)this.squash+=0.01,this.stretch-=0.01;this.maxColumn=Math.max(this.pos.x,this.maxColumn)}handleCollision(t){switch(t.type){case z:{let s=this.pos.add(this.size.scalarMultiply(0.5)),i=t.pos.add(t.size.scalarMultiply(0.5)),r=s.subtract(i);this.size.add(t.size).scalarMultiply(0.5);let e=Math.abs(Math.atan(r.y/r.x));if(!(e<0.96&&e>0.698)&&Math.abs(r.x/this.size.x)>Math.abs(r.y/this.size.y))if(r.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x;else if(r.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y,this.velocity.y=0,this.jumpTime=0,this.stretch=1.01,this.squash=0.99;break}case ht:{++this.coinsCollected;break}case X:case Q:{this.dead=!0;break}case pt:{this.jumpTime=0,this.velocity.y=Math.min(this.velocity.y,0);break}default:{console.warn(`Player unhandled collision type: ${t.type}.`);break}}}render(t,s){t.fillStyle=dt;let i=s.columnToScreen(this.pos.x),r=s.rowToScreen(this.pos.y),o=L*this.squash,e=K*this.stretch;if(this.movingRight){let n=new Path2D;n.moveTo(i,r),n.lineTo(i-this.moveMod,r+o),n.lineTo(i+e-this.moveMod,r+o),n.lineTo(i+e,r),n.closePath(),t.fill(n,"evenodd"),this.movingRight=!1}else if(this.movingLeft){let n=new Path2D;n.moveTo(i,r),n.lineTo(i+this.moveMod,r+o),n.lineTo(i+e+this.moveMod,r+o),n.lineTo(i+e,r),n.closePath(),t.fill(n,"evenodd"),this.movingLeft=!1}else t.fillRect(i,r,e,o)}}class gt extends v{constructor(t,s){super(t,s,q,R,z)}update(t){}handleCollision(t){}render(t,s){t.strokeStyle=A,t.strokeRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),U,I)}}class wt extends v{minY;maxY;yMod;constructor(t,s){super(t+0.25,s+0.25,it,rt,ht);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=s+0.3,this.minY=s+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===B)Ht(),this.dead=!0}render(t,s){t.fillStyle=S,t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),tt,st)}}class St extends v{maxColumns;constructor(t,s,i){super(t+0.25,s+0.25,et,ut,Q);this.velocity.x=3,this.gravity.y=0,this.maxColumns=i}update(t){if(this.pos.x<0||this.pos.x>this.maxColumns)this.velocity.x*=-1}handleCollision(t){if(t.type===z){let s=this.pos.add(this.size.scalarMultiply(0.5)),i=t.pos.add(t.size.scalarMultiply(0.5)),r=s.subtract(i);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(r.x/this.size.x)>Math.abs(r.y/this.size.y))if(this.velocity.x*=-1,r.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x}else if(t.type===X)this.dead=!0}render(t,s){t.fillStyle=y,t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),ot,nt)}}class Ct extends v{constructor(t,s){super(t,s+0.1,ut,et,Q);this.velocity.y=3,this.gravity.y=0,this.pos.x+=0.25}update(t){if(this.pos.y<0||this.pos.y>=k)this.velocity.y*=-1}handleCollision(t){if(t.type===z){let s=this.pos.add(this.size.scalarMultiply(0.5)),i=t.pos.add(t.size.scalarMultiply(0.5)),r=s.subtract(i);if(this.size.add(t.size).scalarMultiply(0.5),Math.abs(r.x/this.size.x)<Math.abs(r.y/this.size.y))if(this.velocity.y*=-1,r.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y}else if(t.type===X)this.dead=!0}render(t,s){t.fillStyle=y,t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),nt,ot)}}class $t{src;tgt;probability;constructor(t,s,i){this.src=t,this.tgt=s,this.probability=i}}class H{name;reward;utility;isTerminal;neighbors;constructor(t,s,i,r,o){this.name=t,this.reward=s,this.utility=i,this.isTerminal=r,this.neighbors=o}}class lt{nodes;edges;constructor(){this.nodes={},this.edges={}}getNode(t){return this.nodes[t]}hasNode(t){return t in this.nodes}addNode(t){this.nodes[t.name]=t}addDefaultNode(t,s=1,i=0,r=!1,o=null){if(o==null)o=[];this.nodes[t]=new H(t,s,i,r,o)}removeNode(t){let s=[];for(let i of Object.values(this.edges)){if(i.src==t||i.tgt==t)s.push(i);let r=i.probability,o=-1;for(let h=0;h<r.length;h++){let[a,J]=r[h];if(a==t){o=h;break}}if(o==-1)continue;let e=r[o][1];r.splice(o,1);let n=r.length,f=e/n;i.probability=r.map(([h,a])=>[h,a+f])}for(let i of s)this.removeEdge(i.src,i.tgt);delete this.nodes[t]}getEdge(t,s){return this.edges[`${t},${s}`]}hasEdge(t,s){return`${t},${s}`in this.edges}addEdge(t){this.edges[`${t.src},${t.tgt}`]=t;let s=this.nodes[t.src].neighbors;if(!s.includes(t.tgt))s.push(t.tgt)}addDefaultEdge(t,s,i=null){if(i==null)i=[[s,1]];this.addEdge(new $t(t,s,i))}removeEdge(t,s){let i=this.nodes[t],r=i.neighbors.indexOf(s);i.neighbors.splice(r,1),delete this.edges[`${t},${s}`]}neighbors(t){return this.nodes[t].neighbors}setNodeUtilities(t){for(let[s,i]of Object.entries(t))this.nodes[s].utility=i}utility(t){return this.nodes[t].utility}reward(t){return this.nodes[t].reward}isTerminal(t){return this.nodes[t].isTerminal}mapNodes(t){for(let s of Object.values(this.nodes))t(s)}mapEdges(t){for(let s of Object.values(this.edges))t(s)}}function N(t){return t[Math.floor(Math.random()*t.length)]}function j(t,s,i,r){let o=t.getEdge(s,i).probability,e=o.length,n=0;for(let f=0;f<e;++f){let[h,a]=o[f];n+=a*(t.reward(h)+r*t.utility(h))}return n}function vt(t,s,i){let r=t.getNode(s);if(r.isTerminal)return 0;let o=r.neighbors,e=o.length,n=-1/0;for(let f=0;f<e;++f)n=Math.max(n,j(t,s,o[f],i));return n}function zt(t){for(let s in t.nodes)t.nodes[s].utility=0}function kt(t){let s={};for(let i in t.nodes)if(!t.getNode(i).isTerminal)s[i]=[...t.neighbors(i)];return s}function Ft(t,s){let i={};for(let r in t.nodes){if(t.getNode(r).isTerminal)continue;let o=-1/0,e=[];for(let n of t.neighbors(r)){let f=j(t,r,n,s);if(f===o)e.push(n);else if(f>o)o=f,e.length=0,e.push(n)}i[r]=e}return i}function cs(t,s,i,r){for(let o=0;o<r;++o)for(let e in t.nodes){let n=t.getNode(e);if(!n.isTerminal)n.utility=j(t,e,N(s[e]),i)}}function gs(t,s,i,r){for(let o=0;o<r;++o){let e={};for(let n in t.nodes)if(!t.getNode(n).isTerminal)e[n]=j(t,n,N(s[n]),i);t.setNodeUtilities(e)}}function ws(t,s,i,r){for(let o=0;o<r;++o)for(let e in t.nodes)t.getNode(e).utility=vt(t,e,i)}function Ss(t,s,i,r){for(let o=0;o<r;++o){let e={};for(let n in t.nodes)e[n]=vt(t,n,i);t.setNodeUtilities(e)}}function bs(t,s,i){let r=!1;for(let o in t.nodes){if(t.getNode(o).isTerminal)continue;let e=null,n=-1/0;for(let f of t.neighbors(o)){let h=j(t,o,f,i);if(h===n);else if(h>n)e=f,n=h}if(N(s[o])!==e)s[o].length=0,s[o].push(e),r=!0}return r}function Ut(t,s,i=!1,r=!1,o=10,e=!0){if(e)zt(t);let n=kt(t),f;if(i&&r)f=cs;else if(i&&!r)f=gs;else if(!i&&r)f=ws;else f=Ss;let h=!0;while(h)f(t,n,s,o),h=bs(t,n,s);return f(t,n,s,o),bs(t,n,s),Ft(t,s)}class b extends H{visitedCount;sumPercentCompleted;depth;designerReward;playerReward;constructor(t,s,i,r,o,e){super(t,s,i,r,o);this.designerReward=s,this.playerReward=0,this.depth=e,this.visitedCount=1,this.sumPercentCompleted=1}updateReward(){this.reward=this.designerReward*this.visitedCount}}var u=new lt;u.addNode(new b(F,0,0,!1,[],-1));u.addNode(new b(p,-1,0,!0,[],-1));u.addNode(new b(Y,1,0,!0,[],-1));u.addNode(new b("1-a",-0.95,0,!1,[],1));u.addNode(new b("2-a",-0.925,0,!1,[],2));u.addNode(new b("2-b",-0.925,0,!1,[],2));u.addNode(new b("3-a",-0.9,0,!1,[],3));u.addNode(new b("3-b",-0.9,0,!1,[],3));u.addNode(new b("4-a",-0.825,0,!1,[],4));u.addNode(new b("4-b",-0.825,0,!1,[],4));u.addNode(new b("5-a",-0.8,0,!1,[],5));u.addNode(new b("5-b",-0.8,0,!1,[],5));u.addNode(new b("5-c",-0.8,0,!1,[],5));u.addNode(new b("6-a",-0.775,0,!1,[],6));u.addNode(new b("7-a",-0.75,0,!1,[],7));u.addNode(new b("6-b",-0.775,0,!1,[],6));u.addNode(new b("1-b",-0.95,0,!1,[],1));u.addDefaultEdge(F,"1-a",[["1-a",0.99],[p,0.01]]);u.addDefaultEdge("1-a","2-b",[["2-b",0.99],[p,0.01]]);u.addDefaultEdge("1-a","2-a",[["2-a",0.99],[p,0.01]]);u.addDefaultEdge("2-a","3-a",[["3-a",0.99],[p,0.01]]);u.addDefaultEdge("2-b","3-b",[["3-b",0.99],[p,0.01]]);u.addDefaultEdge("3-a","4-b",[["4-b",0.99],[p,0.01]]);u.addDefaultEdge("3-a","4-a",[["4-a",0.99],[p,0.01]]);u.addDefaultEdge("3-b","4-b",[["4-b",0.99],[p,0.01]]);u.addDefaultEdge("3-b","4-a",[["4-a",0.99],[p,0.01]]);u.addDefaultEdge("4-a","5-b",[["5-b",0.99],[p,0.01]]);u.addDefaultEdge("4-a","5-a",[["5-a",0.99],[p,0.01]]);u.addDefaultEdge("4-a","5-c",[["5-c",0.99],[p,0.01]]);u.addDefaultEdge("4-b","5-b",[["5-b",0.99],[p,0.01]]);u.addDefaultEdge("4-b","5-a",[["5-a",0.99],[p,0.01]]);u.addDefaultEdge("4-b","5-c",[["5-c",0.99],[p,0.01]]);u.addDefaultEdge("5-a","6-a",[["6-a",0.99],[p,0.01]]);u.addDefaultEdge("5-a","6-b",[["6-b",0.99],[p,0.01]]);u.addDefaultEdge("5-b","6-a",[["6-a",0.99],[p,0.01]]);u.addDefaultEdge("5-b","6-b",[["6-b",0.99],[p,0.01]]);u.addDefaultEdge("5-c","6-a",[["6-a",0.99],[p,0.01]]);u.addDefaultEdge("5-c","6-b",[["6-b",0.99],[p,0.01]]);u.addDefaultEdge("6-a","7-a",[["7-a",0.99],[p,0.01]]);u.addDefaultEdge("7-a","end",[["end",0.99],[p,0.01]]);u.addDefaultEdge("6-b","7-a",[["7-a",0.99],[p,0.01]]);u.addDefaultEdge(F,"1-b",[["1-b",0.99],[p,0.01]]);u.addDefaultEdge("1-b","2-b",[["2-b",0.99],[p,0.01]]);u.addDefaultEdge("1-b","2-a",[["2-a",0.99],[p,0.01]]);var as={"1-a":["------------XXX-","-------------T--","----------------","----------------","----------------","----------------","----------------","----------------","-----X-C-----X--","--------------b-","-----------o----","--------o-XX----","------o-XXXX----","------XXXXXX----","XXXXXXXXXXXX^XXX"],"2-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-------XXXXXXXX-------","----------------------","-------V--o---V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"2-b":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"3-a":["----------------------","----------------------","----------------------","----------------------","-----------o----------","----------------------","---------XXXXX--------","-----------o----------","----------------------","-------X-H-----X------","---XX--XXXXXXXXX--XX--","----------------------","-------V---o---V----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"3-b":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","--------V---V---------","----------o-----------","----------------------","------XXXXXXXXX-------","----------------------","----------o---------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"4-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------XXX---","-----------------V----","-------X---XX-----V---","------XX------o-V---o-","-----XXX--------------","XXXXXXXX---XXXXXXXXXXX"],"4-b":["--------------------XX","--------------------XX","--------------------XX","--------------------XX","--------------------XX","-----------X-H---o--XX","-----------------o--XX","---------o----------XX","-----------XXXXXXX--XX","--------------------XX","-------X------------XX","------XXX-----------XX","-----XXXXX-----------o","----XXXXXXX-----------","XXXXXXXXXXXXXXXX--XXXX"],"5-a":["--------XXXXXXXXXXXXXX--------","-------------------ooX--------","---------------------X--------","---------------------X--------","------------------XXXX--------","------------------X-----------","-----------o--XXXXX-----------","------------------------------","---------XX-----------------o-","------------------------------","--------------XX---XXX----XXXX","------------------------------","----------XX------------------","------------------------------","XXXXXXXX----------------------"],"5-b":["------------------------------","-o----------------------------","------------------------------","XXX---------------------------","------------------------------","-----XXX----------------------","------------------------------","-----------XXX----------------","-o--------------------------o-","------XXX---------------------","XXX-----------------------XXXX","------------XXX-------XX------","------------------XX----------","------------------------------","XXXXXXXX---XXXXX--------------"],"5-c":["o-----------------------------","------------------------------","X---XX------------------------","------------------------------","------------------------------","XX----------------------------","--------XXXXX-----------------","--------Xoo-------------------","XXX-----Xoo----o------------o-","--------X---------------------","--------XXX---XX----XX----XXXX","XXXX--------------------------","------------------------------","------------------------------","XXXXXXXX----------------------"],"6-a":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","-------oo---XXXXXXXX----------","-o----------XXXXXXXX----------","------XXXX--XXXXXXXX----------","--------------o---------------","XXXX--------------------------","-------------XXXX-----------o-","---------------------XX-------","XXXXXXXX-----------------XXXXX"],"7-a":["-------------------V---------------","-----------------o---o-------------","------------X-H------------H--XXX--","-----V------XXXXXXXXXXXXXXXXXXXXX--","--------XX----o--------------------","-----------------------------------","-----------XXXXXX---Ho-------------","-----------------------------------","-------------V------XX--------H----","-----------------------------------","XX--------o------XXXXX----H--------","-----------------------------------","---X----H----H-X-----------------o-","---XXXXXXXXXXXXX-------------------","XXXX--------------------------XXXXX"],end:["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----oooooooooooooooooo","XXXXXXXXXXXXXXXXXXXXXX"],"6-b":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX--o-------","-o--------XXXXXXXXXX----------","----------XXXXXXXXXX--X-------","----------XXXXXXXXXX----------","XXX-------XXXXXXXXXXX---------","------XX-----oooo-----------o-","------------------------------","XXXX--------XXXXXX---XX---XXXX"],"1-b":["---------XXX----","----------T-----","----------------","----------------","----------------","----------------","----------------","----X-----X-----","-------oo------C","----------------","-------XX-------","----o-XXXX-o----","-----XXXXXX-----","---XXXXXXXXXX---","XXXXXXXXXXXXXXXX"]};class qt{playerIsOnLastLevel=!1;keys;columnsPerLevel;lossesInARow=0;playerWonLastRound=!1;constructor(){}update(t,s){let i=this.keys.length,r=[];if(t){for(let e=0;e<i;++e)r.push(1);this.lossesInARow=0}else{let e=s;for(let n=0;n<i;++n)if(e>this.columnsPerLevel[n])r[n]=1,e-=this.columnsPerLevel[n];else{r[n]=e/this.columnsPerLevel[n];break}}let o=r.length;for(let e=0;e<o;++e){let n=r[e],f=this.keys[e],h=u.getNode(f);if(n===1){if(!u.hasEdge(F,f))u.addDefaultEdge(F,f,[[f,1],[p,0]])}++h.visitedCount,h.sumPercentCompleted+=n,h.updateReward();let a=h.sumPercentCompleted/h.visitedCount,J=1-a;u.mapEdges((V)=>{if(V.tgt===f)V.probability[0][1]=a,V.probability[1][1]=J})}if(!t){++this.lossesInARow;for(let e=0;e<this.lossesInARow;++e){let n=u.getNode(F).neighbors,f=n.length;if(f===1)break;let h="",a=-1e4;for(let J=0;J<f;++J){let V=n[J],Ot=u.getNode(V).depth;if(Ot>a)h=V,a=Ot}console.log("removing edge:",h,a),u.removeEdge(F,h)}}this.playerWonLastRound=t}get(t){let s=Ut(u,0.95,!0,!0,20);if(this.columnsPerLevel=[],this.playerWonLastRound)this.keys=[N(s[F])];else this.keys=[F];for(let o=0;o<t;++o){let e=N(s[this.keys[o]]);if(this.keys.push(e),e===Y)break}this.keys.splice(0,1),this.playerIsOnLastLevel=this.keys.includes(Y);let i=Array(k).fill(""),r=this.keys.length;for(let o=0;o<r;++o){let e=as[this.keys[o]];this.columnsPerLevel.push(e[0].length);for(let n=0;n<k;++n)i[n]+=e[n]}return i}}class Qt extends v{spawnLaser;vertical;color;playerPos;time=0;state=0;constructor(t,s,i,r,o){super(t,s,q,R,z);this.playerPos=r,this.spawnLaser=o,this.vertical=i,this.color=S,this.gravity.y=0}update(t){if(this.pos.squareDistance(this.playerPos)>150)this.state=0;switch(this.time+=t,this.state){case 0:{if(this.time>=ft)this.time=0,this.state=1,this.color=S;break}case 1:{if(this.time>=os)this.time=0,this.state=0,this.color=y,this.spawnLaser();break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,s){t.strokeStyle=this.color;let i=s.columnToScreen(this.pos.x),r=s.rowToScreen(this.pos.y),o=r+I;t.beginPath(),t.moveTo(i,o),t.lineTo(i+U/2,r),t.lineTo(i+U,o),t.lineTo(i,o),t.stroke(),t.strokeStyle=A,t.beginPath(),t.moveTo(i,r),t.lineTo(i+U,r),t.stroke()}}class Xt extends v{vertical;time=0;constructor(t,s,i,r){super(t+(q-at)/2,s,at,r,Q);this.vertical=i,this.gravity.y=0}update(t){if(Et(),this.time+=t,this.time>=ft)this.dead=!0}handleCollision(t){}render(t,s){t.fillStyle=y,t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),rs,this.size.y*x)}}var Cs=2000;class Jt extends v{minY;maxY;yMod;constructor(t,s){super(t+0.25,s+0.25,it,rt,pt);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=s+0.3,this.minY=s+0.15,this.velocity.y=this.yMod}update(t){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(t){if(t.type===B){let s=this.pos.y;this.pos.y=100,setTimeout(()=>{this.pos.y=s},Cs)}}render(t,s){t.fillStyle=ps,t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),tt,st)}}class Vt extends v{player;spawnBullet;color;time=0;state=0;constructor(t,s,i,r){super(t,s,q,R,z);this.player=i,this.spawnBullet=r,this.color=S,this.gravity.y=0}update(t){switch(this.state){case 0:{if(this.pos.squareDistance(this.player.pos)<=es)this.color=y,this.state=1;break}case 1:{if(this.time+=t,this.time>=ns)this.time=0,this.state=2;break}case 2:{this.state=0,this.color=S;let s=this.pos.angle(this.player.pos),i=Math.cos(s),r=Math.sin(s);this.spawnBullet(this.pos.x+(P+q)*i,this.pos.y+(P+q)*r);break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(t){}render(t,s){t.strokeStyle=this.color;let i=s.columnToScreen(this.pos.x),r=s.rowToScreen(this.pos.y),o=U/2,e=2*o,n=new m(i+o,r);t.lineWidth=2,t.beginPath(),t.arc(n.x,n.y,o,0,Math.PI),t.stroke();let f=this.pos.angle(this.player.pos),h=Math.cos(f),a=Math.sin(f);t.lineWidth=4,t.beginPath(),t.moveTo(n.x+o*h,n.y+o*a),t.lineTo(n.x+e*h,n.y+e*a),t.stroke(),t.lineWidth=1}}class Zt extends v{constructor(t,s,i){super(t,s,P,hs,X);this.gravity.y=0,this.velocity=i.subtract(this.pos),this.velocity.normalize(),this.velocity.scalarMultiplyInPlace(us)}update(t){}handleCollision(t){this.dead=!0}render(t,s){t.fillStyle=y,t.fillRect(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),fs,ds)}}class Nt extends T{angle=0;start;constructor(t,s){super(t,s,is,Q);this.start=new m(t,s),this.gravity.y=0}update(t){this.angle+=t,this.velocity.x=2*bt*Math.cos(this.angle),this.velocity.y=bt*Math.sin(this.angle)}handleCollision(t){if(t.type===X)this.dead=!0}render(t,s){t.fillStyle=y,t.beginPath(),t.arc(s.columnToScreen(this.pos.x),s.rowToScreen(this.pos.y),ss,0,Dt),t.fill()}}class It extends w{ctx;transitionScene;camera;numCoins;levelDirector;staticEntities;dynamicEntities;constructor(t,s){super();this.ctx=t,this.transitionScene=s,this.camera=new xt,this.levelDirector=new qt}onEnter(){this.dynamicEntities=[],this.staticEntities=[],this.numCoins=0,this.dynamicEntities.push(new ct(2,12));let t=this.levelDirector.get(Gt),s=t.length;if(s!==k){console.error("Level should have 15 rows!");return}let i=t[0].length;for(let r=0;r<s;++r){let o=t[r];if(i!==o.length){console.error(`Every row in the level should have the same number of columns! (${i} !== ${o.length}).`);return}for(let e=0;e<i;++e){let n=o[e];if(n==="X")this.staticEntities.push(new gt(e,r));else if(n==="^")this.dynamicEntities.push(new Qt(e,r,!0,this.dynamicEntities[0].pos,()=>{let f=this.raycast(new m(e,r)),h=f===null?k:r-f.pos.y-1;this.dynamicEntities.push(new Xt(e,r-h,!0,h))}));else if(n==="T")this.dynamicEntities.push(new Vt(e,r,this.dynamicEntities[0],(f,h)=>{this.dynamicEntities.push(new Zt(f,h,this.dynamicEntities[0].pos))}));else if(n==="o")++this.numCoins,this.dynamicEntities.push(new wt(e,r));else if(n=="b")this.dynamicEntities.push(new Jt(e,r));else if(n==="H")this.dynamicEntities.push(new St(e,r,i));else if(n==="V")this.dynamicEntities.push(new Ct(e,r));else if(n==="C")this.dynamicEntities.push(new Nt(e,r));else if(n!=="-")console.error(`Unhandled tile type: ${o[e]}`)}}}update(t){let s=this.dynamicEntities.length,i=this.staticEntities.length,r,o=0;for(;o<s;++o){let n=this.dynamicEntities[o];if(n.update(t),n.dead){if(o==0)break;this.dynamicEntities.splice(o,1),--o,--s}n.physicsUpdate(t);for(r=o+1;r<s;++r)n.collision(this.dynamicEntities[r]);for(r=0;r<i;++r)n.collision(this.staticEntities[r])}let e=this.dynamicEntities[0];if(e.coinsCollected>=this.numCoins)if(this.levelDirector.playerIsOnLastLevel)this.transitionScene.targetScene=_,this.changeScene=C;else this.transitionScene.targetScene=D,this.changeScene=C;if(e.dead)this.transitionScene.targetScene=G,this.changeScene=C}render(){this.ctx.clearRect(0,0,c,$),this.camera.update(this.dynamicEntities[0].pos.x);let t=this.staticEntities.length,s=0;for(;s<t;++s)this.staticEntities[s].render(this.ctx,this.camera);t=this.dynamicEntities.length;for(s=0;s<t;++s)this.dynamicEntities[s].render(this.ctx,this.camera)}_onExit(){let t=this.dynamicEntities[0];this.levelDirector.update(!t.dead,Math.floor(t.maxColumn))}raycast(t){let s=this.staticEntities.length,i;while(t.y>=0){for(i=0;i<s;++i){let r=this.staticEntities[i];if(t.equals(r.pos))return r}--t.y}return null}}class Rt extends w{ctx;constructor(t){super();this.ctx=t}onEnter(){this.ctx.clearRect(0,0,c,$),this.ctx.font="30px Arial",this.ctx.fillStyle=A,this.ctx.fillText("You won! Congratulations!",170,$/2)}update(t){}render(){}_onExit(){}}class Wt extends w{targetScene=O;timer=0;ctx;constructor(t){super();this.ctx=t}onEnter(){}update(t){if(this.timer+=t,this.timer>0.6)this.changeScene=this.targetScene}render(){let t=this.timer/0.5;this.ctx.fillStyle=`rgba(0,0,0, ${t})`,this.ctx.fillRect(0,0,c,$)}_onExit(){this.timer=0}}class At extends w{ctx;transitionScene;constructor(t,s){super();this.ctx=t,this.transitionScene=s}onEnter(){l.clear(),this.ctx.fillStyle=S,this.ctx.font="48px Arial",this.ctx.fillText("YOU WON",250,200),this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to keep going.",180,400)}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=Z,this.changeScene=C}render(){}_onExit(){}}class Bt extends w{ctx;transitionScene;constructor(t,s){super();this.ctx=t,this.transitionScene=s}onEnter(){l.clear(),this.ctx.fillStyle=y,this.ctx.font="48px Arial",this.ctx.fillText("YOU LOST",243,200),this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to try again.",195,400)}update(t){if(l.isKeyDown(14))this.transitionScene.targetScene=Z,this.changeScene=C}render(){}_onExit(){}}class jt{canvas;ctx;currentScene;sceneManager;constructor(){this.canvas=document.createElement("canvas"),this.canvas.setAttribute("id","canvas"),this.canvas.width=c,this.canvas.height=$,this.ctx=this.canvas.getContext("2d"),document.getElementById("game").appendChild(this.canvas);let t=new Wt(this.ctx);this.sceneManager=new mt,this.sceneManager.registerScene(O,new yt(this.ctx,t)),this.sceneManager.registerScene(Z,new It(this.ctx,t)),this.sceneManager.registerScene(_,new Rt(this.ctx)),this.sceneManager.registerScene(C,t),this.sceneManager.registerScene(D,new At(this.ctx,t)),this.sceneManager.registerScene(G,new Bt(this.ctx,t)),this.currentScene=this.sceneManager.getScene(O),this.currentScene.onEnter()}start(){let t=0,s=(i)=>{let r=Math.min(0.05,(i-t)/1000);t=i,this.currentScene.update(r),this.currentScene.render();let o=this.currentScene.changeScene;if(o!==void 0)this.currentScene.onExit(),this.currentScene=this.sceneManager.getScene(o),this.currentScene.onEnter();window.requestAnimationFrame(s)};window.requestAnimationFrame(s)}}window.addEventListener("load",()=>{Tt(()=>{l.init(),new jt().start()})});
