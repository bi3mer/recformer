class E{scenes={};registerScene(X,F){if(this.scenes[X]===void 0)this.scenes[X]=F;else console.error(`Key "${X}" for scene already exists! Scene not added to SceneManager.`)}getScene(X){return this.scenes[X]}}class x{changeScene;onExit(){this.changeScene=void 0,this._onExit()}}var Y="main menu",u="game";class d extends x{constructor(){super()}onEnter(){}update(X){this.changeScene=u}render(){}_onExit(){}}var S=720,T=480,I=32,H=15,qX=17,QX=20,$X=30,JX=0.625,ZX=0.9375,VX=31,BX=31,kX=0.96875,zX=0.96875,wX=16,WX=16,UX=0.5,vX=0.5,N=25,M=15,_=0.78125,h=0.46875,j="start",K="end",z="death";class y{startCol=0;endCol=0;offsetX=0;colsPerScreen=Math.ceil(S/I);update(X){const F=X-this.colsPerScreen/2;this.startCol=Math.max(0,Math.floor(F)),this.endCol=this.startCol+this.colsPerScreen,this.offsetX=-F*I+this.startCol*I}columnToScreen(X){return(X-this.startCol)*I+this.offsetX}rowToScreen(X){return X*I}}class O{x;y;constructor(X,F){this.x=X,this.y=F}copy(){return new O(this.x,this.y)}zero(){this.x=0,this.y=0}equals(X){return this.x==X.x&&this.y==X.y}add(X){return new O(this.x+X.x,this.y+X.y)}addInPlace(X){this.x+=X.x,this.y+=X.y}subtract(X){return new O(this.x-X.x,this.y-X.y)}subtractInPlace(X){this.x-=X.x,this.y-=X.y}scalarAdd(X){this.x+=X,this.y+=X}scalarSubtract(X){this.x-=X,this.y-=X}scalarMultiply(X){return new O(this.x*X,this.y*X)}scalarMultiplyInPlace(X){this.x*=X,this.y*=X}dot(X){return this.x*X.x+this.y+X.y}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}}function LX(X,F,f,q){const{x:Q,y:J}=X,$=Q+F.x,k=J+F.y,w=f.x,v=f.y,A=w+q.x,R=v+q.y;return Q<A&&$>w&&J<R&&k>v}class L{pos;size;type;dead=!1;velocity=new O(0,0);gravity=new O(0,100);constructor(X,F,f,q,Q){this.pos=new O(X,F),this.size=new O(f,q),this.type=Q}collision(X){if(LX(this.pos,this.size,X.pos,X.size))this.handleCollision(X),X.handleCollision(this)}physicsUpdate(X){this.velocity.addInPlace(this.gravity.scalarMultiply(X)),this.velocity.y=Math.min(this.velocity.y,30),this.pos.addInPlace(this.velocity.scalarMultiply(X))}}var G=0,C=1,g=2,b=3;var B;(function(V){V[V["LEFT"]=0]="LEFT";V[V["RIGHT"]=1]="RIGHT";V[V["DOWN"]=2]="DOWN";V[V["UP"]=3]="UP";V[V["A"]=4]="A";V[V["D"]=5]="D";V[V["E"]=6]="E";V[V["G"]=7]="G";V[V["H"]=8]="H";V[V["I"]=9]="I";V[V["Q"]=10]="Q";V[V["R"]=11]="R";V[V["S"]=12]="S";V[V["W"]=13]="W";V[V["SPACE"]=14]="SPACE";V[V["ESCAPE"]=15]="ESCAPE";V[V["ENTER"]=16]="ENTER";V[V["SHIFT"]=17]="SHIFT";V[V["INVALID"]=18]="INVALID"})(B||(B={}));class W{static _keys=[];static init(){for(let X=0;X<Object.keys(B).length;++X)W._keys.push(!1);window.addEventListener("keydown",W.onKeyDown),window.addEventListener("keyup",W.onKeyUp)}static isKeyDown(...X){const F=X.length;for(let f=0;f<F;++f)if(W._keys[X[f]])return!0;return!1}static keyStrToKey(X){switch(X){case"Down":case"ArrowDown":return B.DOWN;case"Up":case"ArrowUp":return B.UP;case"Right":case"ArrowRight":return B.RIGHT;case"Left":case"ArrowLeft":return B.LEFT;case" ":case"Space":return B.SPACE;case"Escape":return B.ESCAPE;case"a":case"A":return B.A;case"e":case"E":return B.E;case"s":case"S":return B.S;case"d":case"D":return B.D;case"w":case"W":return B.W;case"r":case"R":return B.R;case"q":case"Q":return B.Q;case"g":case"G":return B.G;case"h":case"H":return B.H;case"i":case"I":return B.I;case"Shift":return B.SHIFT;case"Enter":return B.ENTER;default:return console.warn(`Unhandled key: ${X}.`),B.INVALID}}static onKeyDown(X){const F=W.keyStrToKey(X.key);if(W._keys[F]=!0,F==B.DOWN||F==B.UP||F==B.LEFT||F==B.RIGHT)X.preventDefault();return!1}static onKeyUp(X){return W._keys[W.keyStrToKey(X.key)]=!1,!1}static clear(){for(let X=0;X<W._keys.length;++X)W._keys[X]=!1}}var RX=6,jX=8,HX=0.4;class l extends L{movingRight=!1;movingLeft=!1;moveMod=0;jumpTime=0;squash=1;stretch=1;coinsCollected=0;maxColumn=0;constructor(X,F){super(X,F,JX,ZX,G)}update(X){if(this.pos.y>qX){this.dead=!0,console.log("Player fell...");return}if(this.velocity.x=0,W.isKeyDown(B.D,B.RIGHT))this.movingRight=!0,this.velocity.x=RX,this.moveMod=Math.min(jX,this.moveMod+X);if(W.isKeyDown(B.A,B.LEFT))if(this.movingRight)this.movingRight=!1,this.velocity.x=0;else this.movingLeft=!0,this.velocity.x=-RX,this.moveMod=Math.min(jX,this.moveMod+X);if(this.jumpTime<HX&&W.isKeyDown(B.SPACE,B.UP)){if(this.jumpTime===0)this.velocity.y=-15;else if(this.jumpTime<0.2)this.velocity.y-=2;this.squash+=0.01,this.stretch-=0.01,this.jumpTime+=X}else if(this.squash!=this.stretch)this.squash+=0.01,this.stretch-=0.01;this.maxColumn=Math.max(this.pos.x,this.maxColumn)}handleCollision(X){switch(X.type){case C:{const F=this.pos.add(this.size.scalarMultiply(0.5)),f=X.pos.add(X.size.scalarMultiply(0.5)),q=F.subtract(f);this.size.add(X.size).scalarMultiply(0.5);const J=Math.abs(Math.atan(q.y/q.x));if(!(J<0.96&&J>0.698)&&Math.abs(q.x/this.size.x)>Math.abs(q.y/this.size.y))if(q.x<0)this.pos.x=X.pos.x-this.size.x;else this.pos.x=X.pos.x+X.size.x;else if(q.y>0)this.pos.y=X.pos.y+X.size.y;else this.pos.y=X.pos.y-this.size.y,this.velocity.y=0,this.jumpTime=0,this.stretch=1.03,this.squash=0.97;break}case g:{++this.coinsCollected;break}case b:{this.dead=!0,console.log("Ran into an enemy! :/");break}default:{console.warn(`Player unhandled collision type: ${X.type}.`);break}}}render(X,F){X.fillStyle="rgba(150,150,255,1)";const f=F.columnToScreen(this.pos.x),q=F.rowToScreen(this.pos.y),Q=$X*this.squash,J=QX*this.stretch;if(this.movingRight){let $=new Path2D;$.moveTo(f,q),$.lineTo(f-this.moveMod,q+Q),$.lineTo(f+J-this.moveMod,q+Q),$.lineTo(f+J,q),$.closePath(),X.fill($,"evenodd"),this.movingRight=!1}else if(this.movingLeft){let $=new Path2D;$.moveTo(f,q),$.lineTo(f+this.moveMod,q+Q),$.lineTo(f+J+this.moveMod,q+Q),$.lineTo(f+J,q),$.closePath(),X.fill($,"evenodd"),this.movingLeft=!1}else X.fillRect(f,q,J,Q)}}class c extends L{constructor(X,F){super(X,F,kX,zX,C)}update(X){}handleCollision(X){}render(X,F){X.strokeStyle="white",X.strokeRect(F.columnToScreen(this.pos.x),F.rowToScreen(this.pos.y),VX,BX)}}class m extends L{minY;maxY;yMod;constructor(X,F){super(X+0.25,F+0.25,UX,vX,g);this.gravity.y=0,this.yMod=Math.random()*0.5,this.maxY=F+0.3,this.minY=F+0.15,this.velocity.y=this.yMod}update(X){if(this.pos.y>=this.maxY)this.velocity.y=-this.yMod;else if(this.pos.y<=this.minY)this.velocity.y=this.yMod}handleCollision(X){if(X.type===G)this.dead=!0}render(X,F){X.fillStyle="yellow",X.fillRect(F.columnToScreen(this.pos.x),F.rowToScreen(this.pos.y),wX,WX)}}class r extends L{maxColumns;constructor(X,F,f){super(X+0.25,F+0.25,_,h,b);this.velocity.x=3,this.gravity.y=0,this.maxColumns=f}update(X){if(this.pos.x<0||this.pos.x>this.maxColumns)this.velocity.x*=-1}handleCollision(X){if(X.type===C){const F=this.pos.add(this.size.scalarMultiply(0.5)),f=X.pos.add(X.size.scalarMultiply(0.5)),q=F.subtract(f);if(this.size.add(X.size).scalarMultiply(0.5),Math.abs(q.x/this.size.x)>Math.abs(q.y/this.size.y))if(this.velocity.x*=-1,q.x<0)this.pos.x=X.pos.x-this.size.x;else this.pos.x=X.pos.x+X.size.x}}render(X,F){X.fillStyle="red",X.fillRect(F.columnToScreen(this.pos.x),F.rowToScreen(this.pos.y),N,M)}}class n extends L{constructor(X,F){super(X,F+0.1,h,_,b);this.velocity.y=3,this.gravity.y=0,this.pos.x+=0.25}update(X){if(this.pos.y<0||this.pos.y>=H)this.velocity.y*=-1}handleCollision(X){if(X.type===C){const F=this.pos.add(this.size.scalarMultiply(0.5)),f=X.pos.add(X.size.scalarMultiply(0.5)),q=F.subtract(f);if(this.size.add(X.size).scalarMultiply(0.5),Math.abs(q.x/this.size.x)<Math.abs(q.y/this.size.y))if(this.velocity.y*=-1,q.y>0)this.pos.y=X.pos.y+X.size.y;else this.pos.y=X.pos.y-this.size.y}}render(X,F){X.fillStyle="red",X.fillRect(F.columnToScreen(this.pos.x),F.rowToScreen(this.pos.y),M,N)}}class o{src;tgt;probability;constructor(X,F,f){this.src=X,this.tgt=F,this.probability=f}}class D{name;reward;utility;isTerminal;neighbors;constructor(X,F,f,q,Q){this.name=X,this.reward=F,this.utility=f,this.isTerminal=q,this.neighbors=Q}}class s{nodes;edges;constructor(){this.nodes={},this.edges={}}getNode(X){return this.nodes[X]}hasNode(X){return X in this.nodes}addNode(X){this.nodes[X.name]=X}addDefaultNode(X,F=1,f=0,q=!1,Q=null){if(Q==null)Q=[];this.nodes[X]=new D(X,F,f,q,Q)}removeNode(X){const F=[];for(let f of Object.values(this.edges)){if(f.src==X||f.tgt==X)F.push(f);const q=f.probability;let Q=-1;for(let w=0;w<q.length;w++){const[v,A]=q[w];if(v==X){Q=w;break}}if(Q==-1)continue;const J=q[Q][1];q.splice(Q,1);const $=q.length,k=J/$;f.probability=q.map(([w,v])=>[w,v+k])}for(let f of F)this.removeEdge(f.src,f.tgt);delete this.nodes[X]}getEdge(X,F){return this.edges[`${X},${F}`]}hasEdge(X,F){return`${X},${F}`in this.edges}addEdge(X){this.edges[`${X.src},${X.tgt}`]=X;const F=this.nodes[X.src].neighbors;if(!F.includes(X.tgt))F.push(X.tgt)}addDefaultEdge(X,F,f=null){if(f==null)f=[[F,1]];this.addEdge(new o(X,F,f))}removeEdge(X,F){const f=this.nodes[X],q=f.neighbors.indexOf(F);f.neighbors.splice(q,1),delete this.edges[`${X},${F}`]}neighbors(X){return this.nodes[X].neighbors}setNodeUtilities(X){for(let[F,f]of Object.entries(X))this.nodes[F].utility=f}utility(X){return this.nodes[X].utility}reward(X){return this.nodes[X].reward}isTerminal(X){return this.nodes[X].isTerminal}mapNodes(X){for(let F of Object.values(this.nodes))X(F)}mapEdges(X){for(let F of Object.values(this.edges))X(F)}}function OX(X){return X[Math.floor(Math.random()*X.length)]}function P(X,F,f,q){const Q=X.getEdge(F,f).probability,J=Q.length;let $=0;for(let k=0;k<J;++k){const[w,v]=Q[k];$+=v*(X.reward(w)+q*X.utility(w))}return $}function p(X,F,f){const q=X.getNode(F);if(q.isTerminal)return 0;const Q=q.neighbors,J=Q.length;let $=(-Infinity);for(let k=0;k<J;++k)$=Math.max($,P(X,F,Q[k],f));return $}function i(X){for(let F in X.nodes)X.nodes[F].utility=0}function t(X){const F={};for(let f in X.nodes)if(!X.getNode(f).isTerminal)F[f]=OX(X.neighbors(f));return F}var YX=function(X,F,f,q){for(let Q=0;Q<q;++Q)for(let J in X.nodes){const $=X.getNode(J);if(!$.isTerminal)$.utility=P(X,J,F[J],f)}},SX=function(X,F,f,q){for(let Q=0;Q<q;++Q){const J={};for(let $ in X.nodes)if(!X.getNode($).isTerminal)J[$]=P(X,$,F[$],f);X.setNodeUtilities(J)}},IX=function(X,F,f,q){for(let Q=0;Q<q;++Q)for(let J in X.nodes)X.getNode(J).utility=p(X,J,f)},bX=function(X,F,f,q){for(let Q=0;Q<q;++Q){const J={};for(let $ in X.nodes)J[$]=p(X,$,f);X.setNodeUtilities(J)}},CX=function(X,F,f){let q=!1;for(let Q in X.nodes){if(X.getNode(Q).isTerminal)continue;let J=null,$=(-Infinity);for(let k of X.neighbors(Q)){const w=P(X,Q,k,f);if(w>$)J=k,$=w}if(F[Q]!==J)F[Q]=J,q=!0}return q};function a(X,F,f=!1,q=!1,Q=10,J=!0){if(J)i(X);const $=t(X);let k;if(f&&q)k=YX;else if(f&&!q)k=SX;else if(!f&&q)k=IX;else k=bX;let w=!0;while(w)k(X,$,F,Q),w=CX(X,$,F);return k(X,$,F,Q),CX(X,$,F),$}class U extends D{visitedCount;sumPercentCompleted;designerReward;playerReward;constructor(X,F,f,q,Q){super(X,F,f,q,Q);this.designerReward=F,this.playerReward=0,this.visitedCount=1,this.sumPercentCompleted=1}updateReward(){this.reward=this.designerReward*this.visitedCount}}var Z=new s;Z.addNode(new U(j,0,0,!1,[]));Z.addNode(new U(z,-1,0,!0,[]));Z.addNode(new U(K,1,0,!0,[]));Z.addNode(new U("4-b",-0.5454545454545454,0,!1,[]));Z.addNode(new U("2-b",-0.7272727272727273,0,!1,[]));Z.addNode(new U("3-b",-0.6363636363636364,0,!1,[]));Z.addNode(new U("4-a",-0.5454545454545454,0,!1,[]));Z.addNode(new U("3-a",-0.6363636363636364,0,!1,[]));Z.addNode(new U("2-a",-0.7272727272727273,0,!1,[]));Z.addNode(new U("1-a",-0.8181818181818182,0,!1,[]));Z.addNode(new U("5-c",-0.45454545454545453,0,!1,[]));Z.addNode(new U("5-a",-0.45454545454545453,0,!1,[]));Z.addNode(new U("5-b",-0.45454545454545453,0,!1,[]));Z.addNode(new U("6-a",-0.2727272727272727,0,!1,[]));Z.addNode(new U("7-a",-0.18181818181818182,0,!1,[]));Z.addDefaultEdge("4-b","5-a",[["5-a",0.99],[z,0.01]]);Z.addDefaultEdge("4-b","5-b",[["5-b",0.99],[z,0.01]]);Z.addDefaultEdge("4-b","5-c",[["5-c",0.99],[z,0.01]]);Z.addDefaultEdge("2-b","3-a",[["3-a",0.99],[z,0.01]]);Z.addDefaultEdge("3-b","4-a",[["4-a",0.99],[z,0.01]]);Z.addDefaultEdge("3-b","4-b",[["4-b",0.99],[z,0.01]]);Z.addDefaultEdge("4-a","5-a",[["5-a",0.99],[z,0.01]]);Z.addDefaultEdge("4-a","5-b",[["5-b",0.99],[z,0.01]]);Z.addDefaultEdge("4-a","5-c",[["5-c",0.99],[z,0.01]]);Z.addDefaultEdge("3-a","4-a",[["4-a",0.99],[z,0.01]]);Z.addDefaultEdge("3-a","4-b",[["4-b",0.99],[z,0.01]]);Z.addDefaultEdge("2-a","3-b",[["3-b",0.99],[z,0.01]]);Z.addDefaultEdge(j,"1-a",[["1-a",0.99],[z,0.01]]);Z.addDefaultEdge("1-a","2-a",[["2-a",0.99],[z,0.01]]);Z.addDefaultEdge("1-a","2-b",[["2-b",0.99],[z,0.01]]);Z.addDefaultEdge("5-c","5-a",[["5-a",0.99],[z,0.01]]);Z.addDefaultEdge("5-c","5-b",[["5-b",0.99],[z,0.01]]);Z.addDefaultEdge("5-c","6-a",[["6-a",0.99],[z,0.01]]);Z.addDefaultEdge("5-a","5-b",[["5-b",0.99],[z,0.01]]);Z.addDefaultEdge("5-a","5-c",[["5-c",0.99],[z,0.01]]);Z.addDefaultEdge("5-a","6-a",[["6-a",0.99],[z,0.01]]);Z.addDefaultEdge("5-b","5-a",[["5-a",0.99],[z,0.01]]);Z.addDefaultEdge("5-b","6-a",[["6-a",0.99],[z,0.01]]);Z.addDefaultEdge("6-a","7-a",[["7-a",0.99],[z,0.01]]);Z.addDefaultEdge("7-a","end",[["end",0.99],[z,0.01]]);var AX={"4-b":["--------------------XX","--------------------XX","--------------------XX","--------------------XX","--------------------XX","-----------X-H---o--XX","-----------------o--XX","---------o----------XX","-----------XXXXXXX--XX","--------------------XX","-------X------------XX","------XXX-----------XX","-----XXXXX-----------o","----XXXXXXX-----------","XXXXXXXXXXXXXXXX--XXXX"],"2-b":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"3-b":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","--------V---V---------","----------o-----------","----------------------","------XXXXXXXXX-------","-----------o----------","--------------------o-","-----X---H-----X------","XXXXXXXXXXXXXXXXXXXXXX"],"4-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------XXX---","-----------------V----","-------X---XX-----V---","------XX------o-V---o-","-----XXX--------------","XXXXXXXX---XXXXXXXXXXX"],"3-a":["----------------------","----------------------","----------------------","----------------------","----------o-----------","----------------------","--------XXXXX---------","----------o-----------","----------------------","-------X-H----X-------","-------XXXXXXXX--XX---","----------------------","-------V--oo--V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],end:["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----oooooooooooooooooo","XXXXXXXXXXXXXXXXXXXXXX"],"2-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","-------XXXXXXXX-------","----------------------","-------V--o---V-----o-","----------------------","XXXXXXXXXXXXXXXXXXXXXX"],"1-a":["----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","----------------------","--------------X-------","-----o-----o--X------o","XXXXXXXXXXXXXXXXXXXXXX"],"5-c":["0-----------------------------","------------------------------","X---XX------------------------","------------------------------","--------XX--------------------","XX----------------------------","--------XXXXX-----------------","--------Xoo-------------------","XXX-----Xoo----o------------o-","--------X---------------------","--------XXX---XX----XX----XXXX","XXXX--------------------------","------------------------------","------------------------------","XXXXXXXX----------------------"],"5-a":["--------XXXXXXXXXXXXXX--------","-------------------ooX--------","---------------------X--------","---------------------X--------","------------------XXXX--------","------------------X-----------","-----------o--XXXXX-----------","------------------------------","---------XX-----------------o-","------------------------------","--------------XX---XXX----XXXX","------------------------------","----------XX------------------","------------------------------","XXXXXXXX----------------------"],"5-b":["------------------------------","-o----------------------------","------------------------------","XXX---------------------------","------------------------------","-----XXX----------------------","------------------------------","-----------XXX----------------","-o--------------------------o-","------XXX---------------------","XXX-----------------------XXXX","------------XXX-------XX------","------------------XX----------","------------------------------","XXXXXXXX---XXXXX--------------"],"6-a":["----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","----------XXXXXXXXXX----------","-------oo-XXXXXXXXXX----------","-o----------XXXXXXXX----------","------XXXX--XXXXXXXX----------","--------------o---------------","XXXX--------------------------","-------------XXXX-----------o-","---------------------XX-------","XXXXXXXX-----------------XXXXX"],"7-a":["-------------------V---------------","-----------------o---o-------------","------------X-H------------H--XXX--","-----V------XXXXXXXXXXXXXXXXXXXXX--","--------XX----o--------------------","-----------------------------------","-----------XXXXXX---Ho-------------","-----------------------------------","-------------V------XX--------H----","-----------------------------------","XX--------o------XXXXX----H--------","-----------------------------------","---X----H----H-X-----------------o-","---XXXXXXXXXXXXX-------------------","XXXX--------------------------XXXXX"]};class e{keys;columnsPerLevel;lossesInARow=0;playerWonLastRound=!0;constructor(){}update(X,F){const f=this.keys.length,q=[];if(X){for(let J=0;J<f;++J)q.push(1);this.lossesInARow=0}else{let J=F;for(let $=0;$<f;++$)if(J>this.columnsPerLevel[$])q[$]=1,J-=this.columnsPerLevel[$];else{q[$]=J/this.columnsPerLevel[$];break}++this.lossesInARow;for(let $=0;$<this.lossesInARow;++$){const k=Z.getNode(j).neighbors,w=k.length;if(w===1)break;let v="",A=-1e4;for(let R=0;R<w;++R){const fX=Z.getNode(k[R]).reward;if(fX>A)v=k[R],A=fX}Z.removeEdge(j,v)}}const Q=q.length;for(let J=0;J<Q;++J){const $=q[J],k=this.keys[J],w=Z.getNode(k);if($===1){if(!Z.hasEdge(j,k))Z.addDefaultEdge(j,k,[[k,1],[z,0]])}++w.visitedCount,w.sumPercentCompleted+=$,w.updateReward();const v=w.sumPercentCompleted/w.visitedCount,A=1-v;Z.mapEdges((R)=>{if(R.tgt===k)R.probability[0][1]=v,R.probability[1][1]=A})}this.playerWonLastRound=X}get(X){const F=a(Z,0.95,!0,!0,20);if(this.columnsPerLevel=[],this.playerWonLastRound)this.keys=[F[j]];else this.keys=[j];for(let Q=0;Q<X;++Q){const J=F[this.keys[Q]];if(this.keys.push(J),J===K)break}this.keys.splice(0,1);const f=Array(H).fill(""),q=this.keys.length;for(let Q=0;Q<q;++Q){const J=AX[this.keys[Q]];this.columnsPerLevel.push(J[0].length);for(let $=0;$<H;++$)f[$]+=J[$]}return f}}class XX extends x{ctx;camera;numCoins;levelDirector;staticEntities;dynamicEntities;constructor(X){super();this.ctx=X,this.camera=new y,this.levelDirector=new e}onEnter(){this.dynamicEntities=[],this.staticEntities=[],this.numCoins=0,this.dynamicEntities.push(new l(2,12));const X=this.levelDirector.get(3),F=X.length;if(F!==H){console.error("Level should have 15 rows!");return}const f=X[0].length;for(let q=0;q<F;++q){const Q=X[q];if(f!==Q.length){console.error(`Every row in the level should have the same number of columns! (${f} !== ${Q.length}).`);return}for(let J=0;J<f;++J)if(Q[J]==="X")this.staticEntities.push(new c(J,q));else if(Q[J]==="o")++this.numCoins,this.dynamicEntities.push(new m(J,q));else if(Q[J]==="H")this.dynamicEntities.push(new r(J,q,f));else if(Q[J]==="V")this.dynamicEntities.push(new n(J,q))}}update(X){let F=this.dynamicEntities.length,f=0;for(;f<F;++f)if(this.dynamicEntities[f].dead)this.dynamicEntities.splice(f,1),--F,--f;const q=this.staticEntities.length;let Q;for(f=0;f<F;++f){const $=this.dynamicEntities[f];$.update(X),$.physicsUpdate(X);for(Q=f+1;Q<F;++Q)$.collision(this.dynamicEntities[Q]);for(Q=0;Q<q;++Q)$.collision(this.staticEntities[Q])}const J=this.dynamicEntities[0];if(J.coinsCollected>=this.numCoins)console.log("Player won!"),this.changeScene=Y;if(J.dead)this.changeScene=Y}render(){this.ctx.clearRect(0,0,S,T),this.camera.update(this.dynamicEntities[0].pos.x);let X=this.staticEntities.length,F=0;for(;F<X;++F)this.staticEntities[F].render(this.ctx,this.camera);X=this.dynamicEntities.length;for(F=0;F<X;++F)this.dynamicEntities[F].render(this.ctx,this.camera)}_onExit(){const X=this.dynamicEntities[0];this.levelDirector.update(!X.dead,Math.floor(X.maxColumn))}}class FX{canvas;ctx;currentScene;sceneManager;constructor(){this.canvas=document.createElement("canvas"),this.canvas.setAttribute("id","canvas"),this.canvas.width=S,this.canvas.height=T,this.ctx=this.canvas.getContext("2d"),document.getElementById("game").appendChild(this.canvas),this.sceneManager=new E,this.sceneManager.registerScene(Y,new d),this.sceneManager.registerScene(u,new XX(this.ctx)),this.currentScene=this.sceneManager.getScene(Y),this.currentScene.onEnter()}start(){let X=0;const F=(f)=>{const q=Math.min(0.05,(f-X)/1000);X=f,this.currentScene.update(q),this.currentScene.render();const Q=this.currentScene.changeScene;if(Q!==void 0)this.currentScene.onExit(),this.currentScene=this.sceneManager.getScene(Q),this.currentScene.onEnter();window.requestAnimationFrame(F)};window.requestAnimationFrame(F)}}window.addEventListener("load",()=>{W.init(),new FX().start()});
