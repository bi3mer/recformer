class d{x;y;constructor(i,t){this.x=i,this.y=t}}function v(i){return new d(i.x,i.y)}function mt(i,t){return i.x==t.x&&i.y==t.y}function Q(i,t){return new d(i.x+t.x,i.y+t.y)}function Ai(i,t){i.x+=t.x,i.y+=t.y}function P(i,t){return new d(i.x-t.x,i.y-t.y)}function gi(i,t){i.x+=t,i.y+=t}function z(i,t){return new d(i.x*t,i.y*t)}function wt(i,t){i.x*=t,i.y*=t}function lt(i){return i.x*i.x+i.y*i.y}function Dt(i){return Math.sqrt(i.x*i.x+i.y*i.y)}function gt(i){let t=Dt(i);i.x/=t,i.y/=t}function A(i,t){let r=i.x-t.x,n=i.y-t.y;return r*r+n*n}function Hi(i,t){return Math.atan2(t.y-i.y,t.x-i.x)}function $t(i){return`${i.x.toFixed(2)},${i.y.toFixed(2)}`}function zi(i,t){return Math.floor(Math.random()*(t-i+1)+i)}function qi(i){return i*2-1}function Fi(){return Math.random()<0.5}function $i(i,t,r){return Math.min(Math.max(i,t),r)}function Qi(i,t,r,n){return lt(P(r,new d($i(r.x,i.x,i.x+t.x),$i(r.y,i.y,i.y+t.y))))<n*n}function zt(i,t,r,n){let{x:s,y:o}=i,f=s+t.x,u=o+t.y,p=r.x,y=r.y,q=p+n.x,g=y+n.y;return s<q&&f>p&&o<g&&u>y}function qt(i){let t=Object.keys(i);return t[Math.floor(Math.random()*t.length)]}var Si=typeof window!=="undefined",F=[];function Ft(i){if(Si){F.push(new Audio("audio/coin_1.wav")),F.push(new Audio("audio/coin_2.wav")),F.push(new Audio("audio/coin_3.wav")),F.push(new Audio("audio/coin_4.wav")),F.push(new Audio("audio/coin_5.wav")),F.push(new Audio("audio/laser.wav"));let t=()=>{let r=!0;for(let n=0;n<F.length;++n)if(!F[n].readyState){r=!1;break}if(r)F[5].volume=0.4,i();else setTimeout(t,100)};t()}else i()}function Qt(){if(Si){let i=zi(0,4);F[i].currentTime=0.15,F[i].play()}}function Jt(){if(Si)F[5].currentTime=0,F[5].play()}var H;((b)=>{b[b.LEFT=0]="LEFT";b[b.RIGHT=1]="RIGHT";b[b.DOWN=2]="DOWN";b[b.UP=3]="UP";b[b.A=4]="A";b[b.D=5]="D";b[b.E=6]="E";b[b.G=7]="G";b[b.H=8]="H";b[b.I=9]="I";b[b.Q=10]="Q";b[b.R=11]="R";b[b.S=12]="S";b[b.W=13]="W";b[b.SPACE=14]="SPACE";b[b.ESCAPE=15]="ESCAPE";b[b.ENTER=16]="ENTER";b[b.SHIFT=17]="SHIFT";b[b.INVALID=18]="INVALID"})(H||={});class x{static _keys=[];static init(){for(let i=0;i<Object.keys(H).length;++i)x._keys.push(!1);window.addEventListener("keydown",x.onKeyDown),window.addEventListener("keyup",x.onKeyUp)}static isKeyDown(...i){let t=i.length;for(let r=0;r<t;++r)if(x._keys[i[r]])return!0;return!1}static keyStrToKey(i){switch(i){case"Down":case"ArrowDown":return 2;case"Up":case"ArrowUp":return 3;case"Right":case"ArrowRight":return 1;case"Left":case"ArrowLeft":return 0;case" ":case"Space":return 14;case"Escape":return 15;case"a":case"A":return 4;case"e":case"E":return 6;case"s":case"S":return 12;case"d":case"D":return 5;case"w":case"W":return 13;case"r":case"R":return 11;case"q":case"Q":return 10;case"g":case"G":return 7;case"h":case"H":return 8;case"i":case"I":return 9;case"Shift":return 17;case"Enter":return 16;default:return console.warn(`Unhandled key: ${i}.`),18}}static onKeyDown(i){let t=x.keyStrToKey(i.key);if(x._keys[t]=!0,t==2||t==3||t==0||t==1)i.preventDefault();return!1}static onKeyUp(i){return x._keys[x.keyStrToKey(i.key)]=!1,!1}static clear(){for(let i=0;i<x._keys.length;++i)x._keys[i]=!1}}class Gi{scenes={};registerScene(i,t){if(this.scenes[i]===void 0)this.scenes[i]=t;else console.error(`Key "${i}" for scene already exists! Scene not added to SceneManager.`)}getScene(i){return this.scenes[i]}}var $="#fe546f";var J="#ffd080",S="#fffdff",Vt="#0bffe6";var Xt="#9696ff";var V=720,X=480,w=32,j=15,kt=j+2,Ut=3,Zt=2*Math.PI,G=0,Ji=1,Vi=2,Mi=20,Ii=30,Tt=Mi/w,_t=Ii/w,Bt=new d(Tt,_t),W=31,ti=31,K=W/w,Et=ti/w,M=new d(K,Et),I=16,L=16,ir=I/w,tr=L/w,Xi=new d(ir,tr),ri=25,ni=15,Pt=ri/w,jt=ni/w,Wt=new d(Pt,jt),Yt=new d(jt,Pt),Li=10,Ct=Li/w,ai=2.5,ci=K/8,Nt=W/8,ki=0.6,Rt=2,Kt=2.5,Ot=150,At=10,Ht=10,St=10,Ui=I/w,rr=L/w,Gt=new d(Ui,rr),U="start",si="end",e="death";class Z{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}class Di extends Z{ctx;constructor(i){super();this.ctx=i}onEnter(){this.ctx.clearRect(0,0,V,X),this.ctx.font="30px Arial",this.ctx.fillStyle=S,this.ctx.fillText("You won! Congratulations!",170,X/2)}update(i){}render(){}_onExit(){}}var oi="main menu",N="game",Zi="player won",B="transition",Bi="lost",fi="won";class Ti extends Z{ctx;transitionScene;constructor(i,t){super();this.ctx=i,this.transitionScene=t}onEnter(){x.clear(),this.ctx.fillStyle=J,this.ctx.font="48px Arial",this.ctx.fillText("YOU WON",250,200),this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to keep going.",180,400)}update(i){if(x.isKeyDown(14))this.transitionScene.targetScene=N,this.changeScene=B}render(){}_onExit(){}}class _i extends Z{ctx;transitionScene;constructor(i,t){super();this.ctx=i,this.transitionScene=t}onEnter(){x.clear(),this.ctx.fillStyle=$,this.ctx.font="48px Arial",this.ctx.fillText("YOU LOST",243,200),this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to try again.",195,400)}update(i){if(x.isKeyDown(14))this.transitionScene.targetScene=N,this.changeScene=B}render(){}_onExit(){}}class Ei{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}class it extends Ei{targetScene=oi;timer=0;ctx;constructor(i){super();this.ctx=i}onEnter(){}update(i){if(this.timer+=i,this.timer>0.5)this.changeScene=this.targetScene}render(){let i=this.timer/0.5;this.ctx.fillStyle=`rgba(0,0,0, ${i})`,this.ctx.fillRect(0,0,V,X)}_onExit(){this.timer=0}}class O{movingRight=!1;movingLeft=!1;jumping=!1;set(i){this.movingRight=i.moveRight,this.movingLeft=i.moveLeft,this.jumping=i.jump}}class tt extends O{time=0;name(){return"random"}update(i){if(this.time+=i,this.time>0.2)this.time=0,this.movingRight=Fi(),this.movingLeft=Fi(),this.jumping=Fi()}}class Pi extends O{name(){return"player"}update(i){this.movingRight=x.isKeyDown(5,1),this.movingLeft=x.isKeyDown(4,0),this.jumping=x.isKeyDown(14,3)}}class rt extends O{name(){return"empty"}update(i){}}var sr=0,nt=1,ui=2;function Mt(i,t){switch(i){case sr:return new tt;case nt:return new Pi;case ui:return new rt;default:return console.error(`Unhandled agent type: ${i}. Defaulted to player agent.`),new Pi}}class st{src;tgt;probability;constructor(i,t,r){this.src=i,this.tgt=t,this.probability=r}}class hi{name;reward;utility;isTerminal;neighbors;constructor(i,t,r,n,s){this.name=i,this.reward=t,this.utility=r,this.isTerminal=n,this.neighbors=s}}class ji{nodes;edges;constructor(){this.nodes={},this.edges={}}getNode(i){return this.nodes[i]}hasNode(i){return i in this.nodes}addNode(i){this.nodes[i.name]=i}addDefaultNode(i,t=1,r=0,n=!1,s=null){if(s==null)s=[];this.nodes[i]=new hi(i,t,r,n,s)}removeNode(i){let t=[];for(let r of Object.values(this.edges)){if(r.src==i||r.tgt==i)t.push(r);let n=r.probability,s=-1;for(let p=0;p<n.length;p++){let[y,q]=n[p];if(y==i){s=p;break}}if(s==-1)continue;let o=n[s][1];n.splice(s,1);let f=n.length,u=o/f;r.probability=n.map(([p,y])=>[p,y+u])}for(let r of t)this.removeEdge(r.src,r.tgt);delete this.nodes[i]}getEdge(i,t){return this.edges[`${i},${t}`]}hasEdge(i,t){return`${i},${t}`in this.edges}addEdge(i){this.edges[`${i.src},${i.tgt}`]=i;let t=this.nodes[i.src].neighbors;if(!t.includes(i.tgt))t.push(i.tgt)}addDefaultEdge(i,t,r=null){if(r==null)r=[[t,1]];this.addEdge(new st(i,t,r))}removeEdge(i,t){let r=this.nodes[i],n=r.neighbors.indexOf(t);r.neighbors.splice(n,1),delete this.edges[`${i},${t}`]}neighbors(i){return this.nodes[i].neighbors}setNodeUtilities(i){for(let[t,r]of Object.entries(i))this.nodes[t].utility=r}utility(i){return this.nodes[i].utility}reward(i){return this.nodes[i].reward}isTerminal(i){return this.nodes[i].isTerminal}mapNodes(i){for(let t of Object.values(this.nodes))i(t)}mapEdges(i){for(let t of Object.values(this.edges))i(t)}}function R(i){return i[Math.floor(Math.random()*i.length)]}function a(i,t,r,n){let s=i.getEdge(t,r).probability,o=s.length,f=0;for(let u=0;u<o;++u){let[p,y]=s[u];f+=y*(i.reward(p)+n*i.utility(p))}return f}function Wi(i,t,r){let n=i.getNode(t);if(n.isTerminal)return 0;let s=n.neighbors,o=s.length,f=-1/0;for(let u=0;u<o;++u)f=Math.max(f,a(i,t,s[u],r));return f}function ot(i){for(let t in i.nodes)i.nodes[t].utility=0}function ft(i){let t={};for(let r in i.nodes)if(!i.getNode(r).isTerminal)t[r]=[...i.neighbors(r)];return t}function ut(i,t){let r={};for(let n in i.nodes){if(i.getNode(n).isTerminal)continue;let s=-1/0,o=[];for(let f of i.neighbors(n)){let u=a(i,n,f,t);if(u===s)o.push(f);else if(u>s)s=u,o.length=0,o.push(f)}r[n]=o}return r}function or(i,t,r,n){for(let s=0;s<n;++s)for(let o in i.nodes){let f=i.getNode(o);if(!f.isTerminal)f.utility=a(i,o,R(t[o]),r)}}function fr(i,t,r,n){for(let s=0;s<n;++s){let o={};for(let f in i.nodes)if(!i.getNode(f).isTerminal)o[f]=a(i,f,R(t[f]),r);i.setNodeUtilities(o)}}function ur(i,t,r,n){for(let s=0;s<n;++s)for(let o in i.nodes)i.getNode(o).utility=Wi(i,o,r)}function hr(i,t,r,n){for(let s=0;s<n;++s){let o={};for(let f in i.nodes)o[f]=Wi(i,f,r);i.setNodeUtilities(o)}}function It(i,t,r){let n=!1;for(let s in i.nodes){if(i.getNode(s).isTerminal)continue;let o=null,f=-1/0;for(let u of i.neighbors(s)){let p=a(i,s,u,r);if(p===f);else if(p>f)o=u,f=p}if(R(t[s])!==o)t[s].length=0,t[s].push(o),n=!0}return n}function ht(i,t,r=!1,n=!1,s=10,o=!0){if(o)ot(i);let f=ft(i),u;if(r&&n)u=or;else if(r&&!n)u=fr;else if(!r&&n)u=ur;else u=hr;let p=!0;while(p)u(i,f,t,s),p=It(i,f,t);return u(i,f,t,s),It(i,f,t),ut(i,t)}class l extends hi{visitedCount;sumPercentCompleted;depth;designerReward;playerReward;constructor(i,t,r,n,s,o){super(i,t,r,n,s);this.designerReward=t,this.playerReward=0,this.depth=o,this.visitedCount=1,this.sumPercentCompleted=1}updateReward(){this.reward=this.designerReward*this.visitedCount}}var h=new ji;h.addNode(new l(U,0,0,!1,[],-1));h.addNode(new l(e,-1,0,!0,[],-1));h.addNode(new l(si,1,0,!0,[],-1));h.addNode(new l("1-a",-0.95,0,!1,[],1));h.addNode(new l("2-a",-0.925,0,!1,[],2));h.addNode(new l("2-b",-0.925,0,!1,[],2));h.addNode(new l("3-a",-0.9,0,!1,[],3));h.addNode(new l("3-b",-0.9,0,!1,[],3));h.addNode(new l("4-a",-0.825,0,!1,[],4));h.addNode(new l("4-b",-0.825,0,!1,[],4));h.addNode(new l("5-a",-0.8,0,!1,[],5));h.addNode(new l("5-b",-0.8,0,!1,[],5));h.addNode(new l("5-c",-0.8,0,!1,[],5));h.addNode(new l("6-a",-0.775,0,!1,[],6));h.addNode(new l("7-a",-0.75,0,!1,[],7));h.addNode(new l("6-b",-0.775,0,!1,[],6));h.addNode(new l("1-b",-0.95,0,!1,[],1));h.addDefaultEdge(U,"1-a",[["1-a",0.99],[e,0.01]]);h.addDefaultEdge("1-a","2-b",[["2-b",0.99],[e,0.01]]);h.addDefaultEdge("1-a","2-a",[["2-a",0.99],[e,0.01]]);h.addDefaultEdge("2-a","3-a",[["3-a",0.99],[e,0.01]]);h.addDefaultEdge("2-b","3-b",[["3-b",0.99],[e,0.01]]);h.addDefaultEdge("3-a","4-b",[["4-b",0.99],[e,0.01]]);h.addDefaultEdge("3-a","4-a",[["4-a",0.99],[e,0.01]]);h.addDefaultEdge("3-b","4-b",[["4-b",0.99],[e,0.01]]);h.addDefaultEdge("3-b","4-a",[["4-a",0.99],[e,0.01]]);h.addDefaultEdge("4-a","5-b",[["5-b",0.99],[e,0.01]]);h.addDefaultEdge("4-a","5-a",[["5-a",0.99],[e,0.01]]);h.addDefaultEdge("4-a","5-c",[["5-c",0.99],[e,0.01]]);h.addDefaultEdge("4-b","5-b",[["5-b",0.99],[e,0.01]]);h.addDefaultEdge("4-b","5-a",[["5-a",0.99],[e,0.01]]);h.addDefaultEdge("4-b","5-c",[["5-c",0.99],[e,0.01]]);h.addDefaultEdge("5-a","6-a",[["6-a",0.99],[e,0.01]]);h.addDefaultEdge("5-a","6-b",[["6-b",0.99],[e,0.01]]);h.addDefaultEdge("5-b","6-a",[["6-a",0.99],[e,0.01]]);h.addDefaultEdge("5-b","6-b",[["6-b",0.99],[e,0.01]]);h.addDefaultEdge("5-c","6-a",[["6-a",0.99],[e,0.01]]);h.addDefaultEdge("5-c","6-b",[["6-b",0.99],[e,0.01]]);h.addDefaultEdge("6-a","7-a",[["7-a",0.99],[e,0.01]]);h.addDefaultEdge("7-a","end",[["end",0.99],[e,0.01]]);h.addDefaultEdge("6-b","7-a",[["7-a",0.99],[e,0.01]]);h.addDefaultEdge(U,"1-b",[["1-b",0.99],[e,0.01]]);h.addDefaultEdge("1-b","2-b",[["2-b",0.99],[e,0.01]]);h.addDefaultEdge("1-b","2-a",[["2-a",0.99],[e,0.01]]);var c={"1-a":["------------XXX-","-------------T--","----------------","----------------","----------------","----------------","----------------","----------------","-----X-C-----X--","--------------b-","-----------o----","--------o-XX----","------o-XXXX----","------XXXXXX----","XXXXXXXXXXXX^XXX"],"2-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-------XXXXXXXX-------","----------------------","-------V--o---V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"2-b":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"3-a":["----------------------","----------------------","----------------------","----------------------","-----------o----------","----------------------","---------XXXXX--------","-----------o----------","----------------------","-------X-H-----X------","---XX--XXXXXXXXX--XX--","----------------------","-------V---o---V----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"3-b":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","--------V---V---------","----------o-----------","----------------------","------XXXXXXXXX-------","----------------------","----------o---------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"4-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------XXX---","-----------------V----","-------X---XX-----V---","------XX------o-V---o-","-----XXX--------------","XXXXXXXX---XXXXXXXXXXX"],"4-b":["--------------------XX","--------------------XX","--------------------XX","--------------------XX","--------------------XX","-----------X-H---o--XX","-----------------o--XX","---------o----------XX","-----------XXXXXXX--XX","--------------------XX","-------X------------XX","------XXX-----------XX","-----XXXXX-----------o","----XXXXXXX-----------","XXXXXXXXXXXXXXXX--XXXX"],"5-a":["--------XXXXXXXXXXXXXX--------","-------------------ooX--------","---------------------X--------","---------------------X--------","------------------XXXX--------","------------------X-----------","-----------o--XXXXX-----------","------------------------------","---------XX-----------------o-","------------------------------","--------------XX---XXX----XXXX","------------------------------","----------XX------------------","------------------------------","XXXXXXXX----------------------"],"5-b":["------------------------------","-o----------------------------","------------------------------","XXX---------------------------","------------------------------","-----XXX----------------------","------------------------------","-----------XXX----------------","-o--------------------------o-","------XXX---------------------","XXX-----------------------XXXX","------------XXX-------XX------","------------------XX----------","------------------------------","XXXXXXXX---XXXXX--------------"],"5-c":["o-----------------------------","------------------------------","X---XX------------------------","------------------------------","------------------------------","XX----------------------------","--------XXXXX-----------------","--------Xoo-------------------","XXX-----Xoo----o------------o-","--------X---------------------","--------XXX---XX----XX----XXXX","XXXX--------------------------","------------------------------","------------------------------","XXXXXXXX----------------------"],"6-a":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","-------oo---XXXXXXXX----------","-o----------XXXXXXXX----------","------XXXX--XXXXXXXX----------","--------------o---------------","XXXX--------------------------","-------------XXXX-----------o-","---------------------XX-------","XXXXXXXX-----------------XXXXX"],"7-a":["-------------------V---------------","-----------------o---o-------------","------------X-H------------H--XXX--","-----V------XXXXXXXXXXXXXXXXXXXXX--","--------XX----o--------------------","-----------------------------------","-----------XXXXXX---Ho-------------","-----------------------------------","-------------V------XX--------H----","-----------------------------------","XX--------o------XXXXX----H--------","-----------------------------------","---X----H----H-X-----------------o-","---XXXXXXXXXXXXX-------------------","XXXX--------------------------XXXXX"],end:["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----oooooooooooooooooo","XXXXXXXXXXXXXXXXXXXXXX"],"6-b":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX--o-------","-o--------XXXXXXXXXX----------","----------XXXXXXXXXX--X-------","----------XXXXXXXXXX----------","XXX-------XXXXXXXXXXX---------","------XX-----oooo-----------o-","------------------------------","XXXX--------XXXXXX---XX---XXXX"],"1-b":["---------XXX----","----------T-----","----------------","----------------","----------------","----------------","----------------","----X-----X-----","-------oo------C","----------------","-------XX-------","----o-XXXX-o----","-----XXXXXX-----","---XXXXXXXXXX---","XXXXXXXXXXXXXXXX"]};class D{moveRight;moveLeft;jump;constructor(i,t,r){this.moveRight=i,this.moveLeft=t,this.jump=r}}var pt=[new D(!0,!1,!1),new D(!1,!0,!1),new D(!1,!1,!0),new D(!0,!1,!0),new D(!1,!0,!0)],Lt=pt.length;class bt{queue=[];insert(i,t){if(this.queue.length==0){this.queue.push([i,t]);return}let r=0,n=this.queue.length,s;while(r<n)if(s=Math.floor((r+n)/2),i>=this.queue[s][0])n=s;else r=s+1;this.queue.splice(r,0,[i,t])}pop(){return this.queue.pop()[1]}length(){return this.queue.length}}var pi=2,dt=0.01666*pi;class Yi{depth;model;action;pastNode;constructor(i,t,r,n=void 0){this.depth=i,this.model=t,this.action=r,this.pastNode=n}}function pr(i,t=0){let r=new Set;r.add(i.hash());let n=new bt;n.insert(0,new Yi(0,i,null));let s=void 0,o=0;while(n.length()>0){let p=n.pop(),y=p.depth+1;for(o=0;o<Lt;++o){let q=pt[o],g=p.model.clone();if(g.protaganist().agent.set(q),g.update(dt,pi),g.coins[t].dead){console.log("found coin!"),s=new Yi(y,g,q,p),n.queue.length=0;break}if(g.protaganist().dead)continue;let ii=g.hash();if(r.has(ii))continue;r.add(ii),n.insert(y+A(g.protaganist().pos,g.coins[t].pos),new Yi(y,g,q,p))}}if(s===void 0)return console.error("A* Error: Could not find target."),[i,void 0];let f=s.model,u=[];while(s.pastNode!==void 0)u.push(s.action),s=s.pastNode;return u.reverse(),[f,u]}function at(i){let t=i.clone(),r=i.clone(),n=[],s=i.coins.length;while(t.protaganist().coinsCollected<s){let[o,f]=pr(t);if(f===void 0){console.error(`Pathing failed for coin at (${$t(t.coins[0].pos)})`);return}t=o,n=n.concat(f)}return n}class bi{startCol=0;offsetX=0;colsPerScreen=Math.ceil(V/w);update(i){let t=i-this.colsPerScreen/2;this.startCol=Math.max(0,Math.floor(t)),this.offsetX=-t*w+this.startCol*w}columnToScreen(i){return(i-this.startCol)*w+this.offsetX}rowToScreen(i){return i*w}}class di{game;pos;type;dead=!1;velocity=new d(0,0);gravity=new d(0,100);constructor(i,t){this.pos=i,this.type=t}physicsUpdate(i){Ai(this.velocity,z(this.gravity,i)),this.velocity.y=Math.min(this.velocity.y,30),Ai(this.pos,z(this.velocity,i))}}class m extends di{size;constructor(i,t,r){super(i,r);this.size=t}collision(i){if(i instanceof m){if(zt(this.pos,this.size,i.pos,i.size))this.handleCollision(i),i.handleCollision(this)}else if(i instanceof ei){if(Qi(this.pos,this.size,i.pos,i.r))this.handleCollision(i),i.handleCollision(this)}}}class ei extends di{r;constructor(i,t,r){super(i,r);this.r=t}collision(i){if(i instanceof m){if(Qi(i.pos,i.size,this.pos,this.r))this.handleCollision(i),i.handleCollision(this)}}}var T=0,k=1,Ci=2,Y=3,Ni=4,C=5;class yi extends ei{angle;start;constructor(i,t,r,n){super(i,Ct,Y);this.gravity.y=0,this.angle=t,this.start=r,this.velocity=n}static defaultConstructor(i){return new yi(i,0,v(i),new d(0,0))}clone(){return new yi(v(this.pos),this.angle,this.start,v(this.velocity))}update(i){this.angle+=i,this.velocity.x=2*ai*Math.cos(this.angle),this.velocity.y=ai*Math.sin(this.angle)}handleCollision(i){this.dead=i.type===C}render(i,t){i.fillStyle=$,i.beginPath(),i.arc(t.columnToScreen(this.pos.x),t.rowToScreen(this.pos.y),Li,0,Zt),i.fill()}}class xi extends m{constructor(i,t){super(i,Gt,C);this.gravity.y=0,this.velocity=t}static defaultConstructor(i,t){let r=P(t,i);return gt(r),wt(r,At),new xi(i,r)}clone(){return new xi(v(this.pos),v(this.velocity))}update(i){}handleCollision(i){this.dead=!0}render(i,t){i.fillStyle=$,i.fillRect(t.columnToScreen(this.pos.x),t.rowToScreen(this.pos.y),Ht,St)}}class Ri extends m{playerPos;color;time;state;constructor(i,t=0,r=0){super(i,M,k);this.color=J,this.gravity.y=0,this.time=t,this.state=r}clone(){return new Ri(v(this.pos),this.time,this.state)}update(i){switch(this.state){case 0:{if(A(this.pos,this.game.protaganist().pos)<=Ot)this.color=$,this.state=1;break}case 1:{if(this.time+=i,this.time>=Kt)this.time=0,this.state=2;break}case 2:{this.state=0,this.color=J;let t=this.game.protaganist().pos,r=Hi(this.pos,t),n=Math.cos(r),s=Math.sin(r);this.game.dynamicEntities.push(xi.defaultConstructor(new d(this.pos.x+(Ui+K)*n,this.pos.y+(Ui+K)*s),t));break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(i){}render(i,t){i.strokeStyle=this.color;let r=t.columnToScreen(this.pos.x),n=t.rowToScreen(this.pos.y),s=W/2,o=2*s,f=new d(r+s,n);i.lineWidth=2,i.beginPath(),i.arc(f.x,f.y,s,0,Math.PI),i.stroke();let u=Hi(this.pos,this.game.protaganist().pos),p=Math.cos(u),y=Math.sin(u);i.lineWidth=4,i.beginPath(),i.moveTo(f.x+s*p,f.y+s*y),i.lineTo(f.x+o*p,f.y+o*y),i.stroke(),i.lineWidth=1}}class et extends m{constructor(i){super(i,M,k)}clone(){throw new Error("Block.clone should not have been called!")}update(i){}handleCollision(i){}render(i,t){i.lineWidth=1.3,i.strokeStyle=S,i.strokeRect(t.columnToScreen(this.pos.x),t.rowToScreen(this.pos.y),W,ti)}}var br=1000,dr=2;class vi extends m{minY;maxY;yMod;timeGone;constructor(i,t,r,n,s,o){super(i,Xi,Ni);this.gravity.y=0,this.yMod=t,this.minY=r,this.maxY=n,this.velocity.y=s,this.timeGone=o}static defaultConstructor(i){let t=Math.random()*0.5;return gi(i,0.25),new vi(i,t,i.y+0.15,i.y+0.3,t,0)}clone(){return new vi(v(this.pos),this.yMod,this.minY,this.maxY,this.velocity.y,this.timeGone)}update(i){if(this.pos.y>100){if(this.timeGone+=i,this.timeGone>=dr)this.pos.y=this.maxY,this.velocity.y=-this.yMod}else if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(i){if(i.type===T)this.pos.y=br,this.timeGone=0}render(i,t){i.fillStyle=Vt,i.fillRect(t.columnToScreen(this.pos.x),t.rowToScreen(this.pos.y),I,L)}}class _ extends m{minY;maxY;yMod;constructor(i,t,r,n,s,o=!1){super(i,Xi,Ci);this.gravity.y=0,this.yMod=t,this.maxY=r,this.minY=n,this.velocity.y=s,this.dead=o}static defaultConstructor(i){return i.x+=0.25,new _(i,0.1,i.y+0.3,i.y+0.15,0.1)}clone(){return new _(v(this.pos),this.yMod,this.maxY,this.minY,this.velocity.y,this.dead)}update(i){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(i){if(i.type===T)Qt(),this.dead=!0}render(i,t){i.fillStyle=J,i.fillRect(t.columnToScreen(this.pos.x),t.rowToScreen(this.pos.y),I,L)}}class mi extends m{maxColumns;constructor(i,t,r){super(i,Wt,Y);this.maxColumns=t,this.velocity.x=r,this.gravity.y=0}static defaultConstructor(i,t){return gi(i,0.25),new mi(i,t,3)}clone(){return new mi(v(this.pos),this.maxColumns,this.velocity.x)}update(i){this.velocity.x*=qi(this.pos.x>=0&&this.pos.x<=this.maxColumns)}handleCollision(i){if(i.type===k){let t=P(Q(this.pos,z(this.size,0.5)),Q(i.pos,z(i.size,0.5))),r=Q(this.size,i.size);if(z(r,0.5),Math.abs(t.x/this.size.x)>Math.abs(t.y/this.size.y))if(this.velocity.x*=-1,t.x<0)this.pos.x=i.pos.x-this.size.x;else this.pos.x=i.pos.x+i.size.x}else if(i.type===C)this.dead=!0}render(i,t){i.fillStyle=$,i.fillRect(t.columnToScreen(this.pos.x),t.rowToScreen(this.pos.y),ri,ni)}}class wi extends m{time;constructor(i,t,r){super(i,t,Y);this.gravity.y=0,this.time=r}static defaultConstructor(i,t){return i.x+=(K-ci)/2,new wi(i,new d(ci,t),0)}clone(){return new wi(this.pos,this.size,this.time)}update(i){Jt(),this.time+=i,this.dead=this.time>=ki}handleCollision(i){}render(i,t){i.fillStyle=$,i.fillRect(t.columnToScreen(this.pos.x),t.rowToScreen(this.pos.y),Nt,this.size.y*w)}}class Ki extends m{color;time=0;state=0;constructor(i,t=0,r=0){super(i,M,k);this.color=J,this.gravity.y=0,this.state=t,this.time=r}clone(){return new Ki(v(this.pos),this.state,this.time)}update(i){if(A(this.pos,this.game.protaganist().pos)>150)this.state=0;switch(this.time+=i,this.state){case 0:{if(this.time>=ki)this.time=0,this.state=1,this.color=J;break}case 1:{if(this.time>=Rt){this.time=0,this.state=0,this.color=$;let t=this.game.raycastUp(this.pos),r=t===null?j:this.pos.y-t.pos.y-1;this.game.dynamicEntities.push(wi.defaultConstructor(new d(this.pos.x,this.pos.y-r),r))}break}default:{console.error(`Should not be able to enter state ${this.state}`),this.state=0;break}}}handleCollision(i){}render(i,t){i.strokeStyle=this.color;let r=t.columnToScreen(this.pos.x),n=t.rowToScreen(this.pos.y),s=n+ti;i.beginPath(),i.moveTo(r,s),i.lineTo(r+W/2,n),i.lineTo(r+W,s),i.lineTo(r,s),i.stroke(),i.strokeStyle=S,i.beginPath(),i.moveTo(r,n),i.lineTo(r+W,n),i.stroke()}}var ct=6,er=0.4;class Oi extends m{movingRight;movingLeft;moveMod;jumpTime;squash;stretch;coinsCollected;maxColumn;agent;constructor(i,t,r,n=!1,s=!1,o=0,f=0,u=1,p=1,y=0,q=0){super(i,Bt,T);this.velocity=t,this.agent=r,this.movingRight=n,this.movingLeft=s,this.moveMod=o,this.jumpTime=f,this.squash=u,this.stretch=p,this.coinsCollected=y,this.maxColumn=q}clone(){return new Oi(v(this.pos),v(this.velocity),this.agent,this.movingRight,this.movingLeft,this.moveMod,this.jumpTime,this.squash,this.stretch,this.coinsCollected,this.maxColumn)}update(i){if(this.pos.y>kt){this.dead=!0;return}if(this.movingLeft=!1,this.movingRight=!1,this.velocity.x=0,this.agent.update(i),this.agent.movingRight)this.movingRight=!0,this.velocity.x=ct,this.moveMod=4;if(this.agent.movingLeft)if(this.movingRight)this.movingRight=!1,this.velocity.x=0;else this.movingLeft=!0,this.velocity.x=-ct,this.moveMod=4;if(this.jumpTime<er&&this.agent.jumping){if(this.jumpTime===0)this.velocity.y=-15;else if(this.jumpTime<0.2)this.velocity.y-=2;this.velocity.y=Math.max(-20,this.velocity.y),this.squash=Math.min(1.03,this.squash+0.01),this.stretch=Math.max(0.97,this.stretch-0.01),this.jumpTime+=i}else if(this.squash!=this.stretch)this.squash+=0.01,this.stretch-=0.01;this.maxColumn=Math.max(this.pos.x,this.maxColumn)}handleCollision(i){switch(i.type){case k:{let t=i,r=P(Q(this.pos,z(this.size,0.5)),Q(t.pos,z(t.size,0.5))),n=Q(this.size,t.size);z(n,0.5);let s=Math.abs(Math.atan(r.y/r.x));if(!(s<0.96&&s>0.698)&&Math.abs(r.x/this.size.x)>Math.abs(r.y/this.size.y))if(r.x<0)this.pos.x=t.pos.x-this.size.x;else this.pos.x=t.pos.x+t.size.x;else if(r.y>0)this.pos.y=t.pos.y+t.size.y;else this.pos.y=t.pos.y-this.size.y,this.velocity.y=0,this.jumpTime=0,this.stretch=1.01,this.squash=0.99;break}case Ci:{++this.coinsCollected;break}case C:case Y:{this.dead=!0;break}case Ni:{this.jumpTime=0,this.velocity.y=Math.min(this.velocity.y,0);break}default:{console.warn(`Player unhandled collision type: ${i.type}.`);break}}}render(i,t){i.fillStyle=Xt;let r=t.columnToScreen(this.pos.x),n=t.rowToScreen(this.pos.y),s=Ii*this.squash,o=Mi*this.stretch;if(this.movingRight){let f=new Path2D;f.moveTo(r,n),f.lineTo(r-this.moveMod,n+s),f.lineTo(r+o-this.moveMod,n+s),f.lineTo(r+o,n),f.closePath(),i.fill(f,"evenodd")}else if(this.movingLeft){let f=new Path2D;f.moveTo(r,n),f.lineTo(r+this.moveMod,n+s),f.lineTo(r+o+this.moveMod,n+s),f.lineTo(r+o,n),f.closePath(),i.fill(f,"evenodd")}else i.fillRect(r,n,o,s)}}class li extends m{constructor(i,t){super(i,Yt,Y);this.velocity.y=t,this.gravity.y=0}static defaultConstructor(i){return i.x+=0.25,i.y+=0.1,new li(i,3)}clone(){return new li(v(this.pos),this.velocity.y)}update(i){this.velocity.y*=qi(this.pos.y>0&&this.pos.y<=j)}handleCollision(i){if(i.type===k){let t=P(Q(this.pos,z(this.size,0.5)),Q(i.pos,z(i.size,0.5))),r=Q(this.size,i.size);if(z(r,0.5),Math.abs(t.x/this.size.x)<Math.abs(t.y/this.size.y))if(this.velocity.y*=-1,t.y>0)this.pos.y=i.pos.y+i.size.y;else this.pos.y=i.pos.y-this.size.y}else if(i.type===C)this.dead=!0}render(i,t){i.fillStyle=$,i.fillRect(t.columnToScreen(this.pos.x),t.rowToScreen(this.pos.y),ni,ri)}}class E{staticEntities=[];dynamicEntities=[];coins=[];constructor(i,t){if(i===null)return;let r=i.length;if(r!==j){console.error("Level should have 15 rows!");return}this.dynamicEntities.push(new Oi(new d(2,12),new d(0,0),Mt(t,this)));let n=i[0].length;for(let o=0;o<r;++o){let f=i[o];if(n!==f.length){console.error(`Every row in the level should have the same number of columns! (${n} !== ${f.length}).`);return}for(let u=0;u<n;++u){let p=f[u];if(p==="X")this.staticEntities.push(new et(new d(u,o)));else if(p==="^")this.dynamicEntities.push(new Ki(new d(u,o)));else if(p==="T")this.dynamicEntities.push(new Ri(new d(u,o)));else if(p==="o"){let y=_.defaultConstructor(new d(u,o));this.dynamicEntities.push(y),this.coins.push(y)}else if(p=="b")this.dynamicEntities.push(vi.defaultConstructor(new d(u,o)));else if(p==="H")this.dynamicEntities.push(mi.defaultConstructor(new d(u,o),n));else if(p==="V")this.dynamicEntities.push(li.defaultConstructor(new d(u,o)));else if(p==="C")this.dynamicEntities.push(yi.defaultConstructor(new d(u,o)));else if(p!=="-")console.error(`Unhandled tile type: ${f[u]}`)}}let s=0;for(;s<this.staticEntities.length;++s)this.staticEntities[s].game=this;for(let o=0;o<this.dynamicEntities.length;++o)this.dynamicEntities[o].game=this;this.coins.sort((o,f)=>{return o.pos.x-f.pos.x})}clone(){let i=new E(null,ui),t=this.dynamicEntities.length,r=0;for(;r<t;++r){let n=this.dynamicEntities[r];if(n.dead)continue;let s=n.clone();if(s.game=i,i.dynamicEntities.push(s),s instanceof _)i.coins.push(s)}return i.coins.sort((n,s)=>{return n.pos.x-s.pos.x}),i.staticEntities=this.staticEntities,i}hash(){let i=this.dynamicEntities[0].pos;return Math.round(i.x*100)+Math.round(i.y*100)*1e6}update(i,t=1){i=i/t;for(let r=0;r<t;++r){let n=this.dynamicEntities.length,s=this.staticEntities.length,o,f=0;for(;f<n;++f){let u=this.dynamicEntities[f];if(u.update(i),u.dead){if(f==0)break;this.dynamicEntities.splice(f,1),--f,--n}u.physicsUpdate(i);for(o=f+1;o<n;++o)u.collision(this.dynamicEntities[o]);for(o=0;o<s;++o)u.collision(this.staticEntities[o])}}}render(i,t){t.update(this.dynamicEntities[0].pos.x);let r=this.staticEntities.length,n=0;for(;n<r;++n)this.staticEntities[n].render(i,t);r=this.dynamicEntities.length;for(n=0;n<r;++n)this.dynamicEntities[n].render(i,t)}state(){let i=this.dynamicEntities[0];if(i.coinsCollected>=this.coins.length)return Vi;if(i.dead)return Ji;return G}protaganist(){return this.dynamicEntities[0]}fitness(){return 1-this.dynamicEntities[0].coinsCollected/this.coins.length}raycastUp(i){let t=v(i);t.y-=1;let r=this.staticEntities.length,n;while(t.y>=0){for(n=0;n<r;++n){let s=this.staticEntities[n];if(mt(t,s.pos))return s}t.y-=1}return null}}var yr=dt/pi;class yt extends Z{ctx;transitionScene;camera;game;actions=[];actionIndex;frame;constructor(i,t){super();this.ctx=i,this.transitionScene=t,this.camera=new bi}onEnter(){let i=qt(c);console.log(c[i]);let t=["1-a","1-b","2-a","3-b","4-a","4-b","6-a"],r=t[zi(0,t.length-1)];this.game=new E(c[r],ui),this.actions=at(this.game),this.actionIndex=0,this.frame=0}update(i){if(this.game.state()!==G)this.onEnter();if(x.isKeyDown(14))this.transitionScene.targetScene=N,this.changeScene=B;if(this.frame>=pi)this.frame=0,++this.actionIndex;++this.frame,this.game.protaganist().agent.set(this.actions[this.actionIndex]),this.game.update(yr)}render(){this.ctx.clearRect(0,0,V,X),this.game.render(this.ctx,this.camera),this.ctx.fillStyle="black",this.ctx.fillRect(240,60,240,47),this.ctx.fillRect(210,234,295,39),this.ctx.fillStyle=J,this.ctx.font="48px Arial",this.ctx.fillText("Recformer",247,100),this.ctx.font="30px Arial",this.ctx.fillText("Press 'space' to start",220,X*0.55)}_onExit(){}}class xt{playerIsOnLastLevel=!1;keys;columnsPerLevel;lossesInARow=0;playerWonLastRound=!1;constructor(){}update(i,t){let r=this.keys.length,n=[];if(i){for(let o=0;o<r;++o)n.push(1);this.lossesInARow=0}else{let o=t;for(let f=0;f<r;++f)if(o>this.columnsPerLevel[f])n[f]=1,o-=this.columnsPerLevel[f];else{n[f]=o/this.columnsPerLevel[f];break}}let s=n.length;for(let o=0;o<s;++o){let f=n[o],u=this.keys[o],p=h.getNode(u);if(f===1){if(!h.hasEdge(U,u))h.addDefaultEdge(U,u,[[u,1],[e,0]])}++p.visitedCount,p.sumPercentCompleted+=f,p.updateReward();let y=p.sumPercentCompleted/p.visitedCount,q=1-y;h.mapEdges((g)=>{if(g.tgt===u)g.probability[0][1]=y,g.probability[1][1]=q})}if(!i){++this.lossesInARow;for(let o=0;o<this.lossesInARow;++o){let f=h.getNode(U).neighbors,u=f.length;if(u===1)break;let p="",y=-1e4;for(let q=0;q<u;++q){let g=f[q],ii=h.getNode(g).depth;if(ii>y)p=g,y=ii}console.log("removing edge:",p,y),h.removeEdge(U,p)}}this.playerWonLastRound=i}get(i){let t=ht(h,0.95,!0,!0,20);if(this.columnsPerLevel=[],this.playerWonLastRound)this.keys=[R(t[U])];else this.keys=[U];for(let s=0;s<i;++s){let o=R(t[this.keys[s]]);if(this.keys.push(o),o===si)break}this.keys.splice(0,1),this.playerIsOnLastLevel=this.keys.includes(si);let r=Array(j).fill(""),n=this.keys.length;for(let s=0;s<n;++s){let o=c[this.keys[s]];this.columnsPerLevel.push(o[0].length);for(let f=0;f<j;++f)r[f]+=o[f]}return r}}class vt extends Z{ctx;transitionScene;agentType;game;camera;levelDirector;constructor(i,t,r){super();this.ctx=i,this.agentType=r,this.transitionScene=t,this.camera=new bi,this.levelDirector=new xt}onEnter(){let i=this.levelDirector.get(Ut);this.game=new E(i,this.agentType)}update(i){this.game.update(i);let t=this.game.state();switch(t){case G:break;case Ji:{this.transitionScene.targetScene=Bi,this.changeScene=B;break}case Vi:{if(this.levelDirector.playerIsOnLastLevel)this.transitionScene.targetScene=Zi;else this.transitionScene.targetScene=fi;this.changeScene=B;break}default:{console.error(`Unhandled game state type: ${t}`);break}}}render(){this.ctx.clearRect(0,0,V,X),this.game.render(this.ctx,this.camera)}_onExit(){let i=this.game.fitness();console.log(`Fitness: ${i}`),this.levelDirector.update(this.transitionScene.targetScene===fi,i)}}window.addEventListener("load",()=>{Ft(()=>{x.init();let i=document.createElement("canvas");i.setAttribute("id","canvas"),i.width=V,i.height=X;let t=i.getContext("2d");document.getElementById("game").appendChild(i);let r=new Gi,n=new it(t);r.registerScene(B,n),r.registerScene(oi,new yt(t,n)),r.registerScene(N,new vt(t,n,nt)),r.registerScene(Zi,new Di(t)),r.registerScene(fi,new Ti(t,n)),r.registerScene(Bi,new _i(t,n));let s=r.getScene(oi);s.onEnter();let o=0,f=(u)=>{let p=Math.min(0.05,(u-o)/1000);o=u,s.update($i(p,0.01,0.2)),s.render();let y=s.changeScene;if(y!==void 0)s.onExit(),s=r.getScene(y),s.onEnter();window.requestAnimationFrame(f)};window.requestAnimationFrame(f)})});
