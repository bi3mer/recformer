// src/DataStructures/point.ts
class Point {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
function pointClone(p) {
  return new Point(p.x, p.y);
}
function pointAdd(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y);
}
function pointAddInPlace(p1, p2) {
  p1.x += p2.x;
  p1.y += p2.y;
}
function pointSubtract(p1, p2) {
  return new Point(p1.x - p2.x, p1.y - p2.y);
}
function pointAddScalarInPlace(p, n) {
  p.x += n;
  p.y += n;
}
function pointMultiplyScalar(p, scalar) {
  return new Point(p.x * scalar, p.y * scalar);
}
function pointMultiplyScalarInPlace(p, scalar) {
  p.x *= scalar;
  p.y *= scalar;
}
function pointSquareComponents(p) {
  return p.x * p.x + p.y * p.y;
}
function pointMagnitude(p) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}
function pointNormalizeInPlace(p) {
  const M = pointMagnitude(p);
  p.x /= M;
  p.y /= M;
}
function pointSquareDistance(p1, p2) {
  const x = p1.x - p2.x;
  const y = p1.y - p2.y;
  return x * x + y * y;
}
function pointAngle(p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}
function pointFloor(p) {
  return new Point(Math.floor(p.x), Math.floor(p.y));
}

// src/core/util.ts
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function boolToSign(val) {
  return val * 2 - 1;
}
function randomBool() {
  return Math.random() < 0.5;
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function rectangleIntersectCircle(rec, dimensions, circle, radius) {
  return pointSquareComponents(pointSubtract(circle, new Point(clamp(circle.x, rec.x, rec.x + dimensions.x), clamp(circle.y, rec.y, rec.y + dimensions.y)))) < radius * radius;
}
function rectangleIntersect(a, sizeA, b, sizeB) {
  const ax1 = a.x;
  const ay1 = a.y;
  const ax2 = ax1 + sizeA.x;
  const ay2 = ay1 + sizeA.y;
  const bx1 = b.x;
  const by1 = b.y;
  const bx2 = bx1 + sizeB.x;
  const by2 = by1 + sizeB.y;
  return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
}
function randomKey(d) {
  const keys = Object.keys(d);
  return keys[Math.floor(Math.random() * keys.length)];
}

// src/core/audio.ts
var IS_BROWSER = typeof window !== "undefined";
var sounds = [];
function audioLoad(callback) {
  if (IS_BROWSER) {
    sounds.push(new Audio("audio/coin_1.wav"));
    sounds.push(new Audio("audio/coin_2.wav"));
    sounds.push(new Audio("audio/coin_3.wav"));
    sounds.push(new Audio("audio/coin_4.wav"));
    sounds.push(new Audio("audio/coin_5.wav"));
    sounds.push(new Audio("audio/laser.wav"));
    const waitForAudioToLoad = () => {
      let audioLoaded = true;
      for (let i = 0;i < sounds.length; ++i) {
        if (!sounds[i].readyState) {
          audioLoaded = false;
          break;
        }
      }
      if (audioLoaded) {
        sounds[5].volume = 0.4;
        callback();
      } else {
        setTimeout(waitForAudioToLoad, 100);
      }
    };
    waitForAudioToLoad();
  } else {
    callback();
  }
}
function audioCoin() {
  if (IS_BROWSER) {
    const coinIndex = randomInt(0, 4);
    sounds[coinIndex].currentTime = 0.15;
    sounds[coinIndex].play();
  }
}
function audioLaser() {
  if (IS_BROWSER) {
    sounds[5].currentTime = 0;
    sounds[5].play();
  }
}

// src/core/inputManager.ts
var Key;
((Key2) => {
  Key2[Key2["LEFT"] = 0] = "LEFT";
  Key2[Key2["RIGHT"] = 1] = "RIGHT";
  Key2[Key2["DOWN"] = 2] = "DOWN";
  Key2[Key2["UP"] = 3] = "UP";
  Key2[Key2["A"] = 4] = "A";
  Key2[Key2["D"] = 5] = "D";
  Key2[Key2["E"] = 6] = "E";
  Key2[Key2["G"] = 7] = "G";
  Key2[Key2["H"] = 8] = "H";
  Key2[Key2["I"] = 9] = "I";
  Key2[Key2["Q"] = 10] = "Q";
  Key2[Key2["R"] = 11] = "R";
  Key2[Key2["S"] = 12] = "S";
  Key2[Key2["W"] = 13] = "W";
  Key2[Key2["SPACE"] = 14] = "SPACE";
  Key2[Key2["ESCAPE"] = 15] = "ESCAPE";
  Key2[Key2["ENTER"] = 16] = "ENTER";
  Key2[Key2["SHIFT"] = 17] = "SHIFT";
  Key2[Key2["INVALID"] = 18] = "INVALID";
})(Key ||= {});

class InputManager {
  static _keys = [];
  static init() {
    for (let i = 0;i < Object.keys(Key).length; ++i) {
      InputManager._keys.push(false);
    }
    window.addEventListener("keydown", InputManager.onKeyDown);
    window.addEventListener("keyup", InputManager.onKeyUp);
  }
  static isKeyDown(...keys) {
    const size = keys.length;
    for (let i = 0;i < size; ++i) {
      if (InputManager._keys[keys[i]]) {
        return true;
      }
    }
    return false;
  }
  static keyStrToKey(key) {
    switch (key) {
      case "Down":
      case "ArrowDown":
        return 2 /* DOWN */;
      case "Up":
      case "ArrowUp":
        return 3 /* UP */;
      case "Right":
      case "ArrowRight":
        return 1 /* RIGHT */;
      case "Left":
      case "ArrowLeft":
        return 0 /* LEFT */;
      case " ":
      case "Space":
        return 14 /* SPACE */;
      case "Escape":
        return 15 /* ESCAPE */;
      case "a":
      case "A":
        return 4 /* A */;
      case "e":
      case "E":
        return 6 /* E */;
      case "s":
      case "S":
        return 12 /* S */;
      case "d":
      case "D":
        return 5 /* D */;
      case "w":
      case "W":
        return 13 /* W */;
      case "r":
      case "R":
        return 11 /* R */;
      case "q":
      case "Q":
        return 10 /* Q */;
      case "g":
      case "G":
        return 7 /* G */;
      case "h":
      case "H":
        return 8 /* H */;
      case "i":
      case "I":
        return 9 /* I */;
      case "Shift":
        return 17 /* SHIFT */;
      case "Enter":
        return 16 /* ENTER */;
      default:
        console.warn(`Unhandled key: ${key}.`);
        return 18 /* INVALID */;
    }
  }
  static onKeyDown(event) {
    const k = InputManager.keyStrToKey(event.key);
    InputManager._keys[k] = true;
    if (k == 2 /* DOWN */ || k == 3 /* UP */ || k == 0 /* LEFT */ || k == 1 /* RIGHT */) {
      event.preventDefault();
    }
    return false;
  }
  static onKeyUp(event) {
    InputManager._keys[InputManager.keyStrToKey(event.key)] = false;
    return false;
  }
  static clear() {
    for (let i = 0;i < InputManager._keys.length; ++i) {
      InputManager._keys[i] = false;
    }
  }
}

// src/core/sceneManager.ts
class SceneManager {
  scenes = {};
  registerScene(name, scene) {
    if (this.scenes[name] === undefined) {
      this.scenes[name] = scene;
    } else {
      console.error(`Key "${name}" for scene already exists! Scene not added to SceneManager.`);
    }
  }
  getScene(name) {
    return this.scenes[name];
  }
}

// src/colorPalette.ts
var COLOR_ORANGE = "#fe546f";
var COLOR_YELLOW = "#ffd080";
var COLOR_WHITE = "#fffdff";
var COLOR_LIGHT_BLUE = "#0bffe6";
var COLOR_LIGHT_PURPLE = "#9696ff";

// src/core/constants.ts
var SCREEN_WIDTH = 720;
var SCREEN_HEIGHT = 480;
var TILE_SIZE = 32;
var NUM_ROWS = 15;
var DEATH_HEIGHT = NUM_ROWS + 2;
var LEVEL_SEGMENTS_PER_LEVEL = 3;
var TWO_PI = 2 * Math.PI;
var GAME_STATE_PLAYING = 0;
var GAME_STATE_LOST = 1;
var GAME_STATE_WON = 2;
var PLAYER_SCREEN_WIDTH = 20;
var PLAYER_SCREEN_HEIGHT = 30;
var PLAYER_WIDTH = PLAYER_SCREEN_WIDTH / TILE_SIZE;
var PLAYER_HEIGHT = PLAYER_SCREEN_HEIGHT / TILE_SIZE;
var PLAYER_SIZE = new Point(PLAYER_WIDTH, PLAYER_HEIGHT);
var BLOCK_SCREEN_WIDTH = 31;
var BLOCK_SCREEN_HEIGHT = 31;
var BLOCK_WIDTH = BLOCK_SCREEN_WIDTH / TILE_SIZE;
var BLOCK_HEIGHT = BLOCK_SCREEN_HEIGHT / TILE_SIZE;
var BLOCK_SIZE = new Point(BLOCK_WIDTH, BLOCK_HEIGHT);
var COIN_SCREEN_WIDTH = 16;
var COIN_SCREEN_HEIGHT = 16;
var COIN_WIDTH = COIN_SCREEN_WIDTH / TILE_SIZE;
var COIN_HEIGHT = COIN_SCREEN_HEIGHT / TILE_SIZE;
var COIN_SIZE = new Point(COIN_WIDTH, COIN_HEIGHT);
var ENEMY_SCREEN_WIDTH = 25;
var ENEMY_SCREEN_HEIGHT = 15;
var ENEMY_WIDTH = ENEMY_SCREEN_WIDTH / TILE_SIZE;
var ENEMY_HEIGHT = ENEMY_SCREEN_HEIGHT / TILE_SIZE;
var HORIZONTAL_ENEMY_SIZE = new Point(ENEMY_WIDTH, ENEMY_HEIGHT);
var VERTICAL_ENEMY_SIZE = new Point(ENEMY_HEIGHT, ENEMY_WIDTH);
var CIRCLE_SCREEN_RADIUS = 10;
var CIRCLE_RADIUS = CIRCLE_SCREEN_RADIUS / TILE_SIZE;
var CIRCLE_MOVE_RADIUS = 2.5;
var LASER_WIDTH = BLOCK_WIDTH / 8;
var LASER_SCREEN_WIDTH = BLOCK_SCREEN_WIDTH / 8;
var LASER_LIFE_TIME = 0.6;
var LASER_CHARGE_TIME = 2;
var TURRET_LOAD_TIME = 2.5;
var TURRET_SQUARED_RANGE = 150;
var BULLET_SPEED = 10;
var BULLET_SCREEN_WIDTH = 10;
var BULLET_SCREEN_HEIGHT = 10;
var BULLET_WIDTH = COIN_SCREEN_WIDTH / TILE_SIZE;
var BULLET_HEIGHT = COIN_SCREEN_HEIGHT / TILE_SIZE;
var BULLET_SIZE = new Point(BULLET_WIDTH, BULLET_HEIGHT);
var KEY_START = "start";
var KEY_END = "end";
var KEY_DEATH = "death";

// src/core/scene.ts
class Scene {
  changeScene;
  onExit() {
    this.changeScene = undefined;
    this._onExit();
  }
}

// src/Scenes/playerBeatTheGameScene.ts
class PlayerBeatTheGameScene extends Scene {
  ctx;
  constructor(ctx) {
    super();
    this.ctx = ctx;
  }
  onEnter() {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = COLOR_WHITE;
    this.ctx.fillText("You won! Congratulations!", 170, SCREEN_HEIGHT / 2);
  }
  update(dt) {
  }
  render() {
  }
  _onExit() {
  }
}

// src/Scenes/sceneKeys.ts
var KEY_MAIN_MENU = "main menu";
var KEY_GAME = "game";
var KEY_PLAYER_BEAT_THE_GAME = "player won";
var KEY_TRANSITION = "transition";
var KEY_PLAYER_LOST = "lost";
var KEY_PLAYER_WON = "won";

// src/Scenes/playerBeatLevelScene.ts
class PlayerBeatLevelScene extends Scene {
  ctx;
  transitionScene;
  constructor(ctx, transitionScene) {
    super();
    this.ctx = ctx;
    this.transitionScene = transitionScene;
  }
  onEnter() {
    InputManager.clear();
    this.ctx.fillStyle = COLOR_YELLOW;
    this.ctx.font = "48px Arial";
    this.ctx.fillText("YOU WON", 250, 200);
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Press 'space' to keep going.", 180, 400);
  }
  update(dt) {
    if (InputManager.isKeyDown(14 /* SPACE */)) {
      this.transitionScene.targetScene = KEY_GAME;
      this.changeScene = KEY_TRANSITION;
    }
  }
  render() {
  }
  _onExit() {
  }
}

// src/Scenes/playerLostLevelScene.ts
class PlayerLostLevelScene extends Scene {
  ctx;
  transitionScene;
  constructor(ctx, transitionScene) {
    super();
    this.ctx = ctx;
    this.transitionScene = transitionScene;
  }
  onEnter() {
    InputManager.clear();
    this.ctx.fillStyle = COLOR_ORANGE;
    this.ctx.font = "48px Arial";
    this.ctx.fillText("YOU LOST", 243, 200);
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Press 'space' to try again.", 195, 400);
  }
  update(dt) {
    if (InputManager.isKeyDown(14 /* SPACE */)) {
      this.transitionScene.targetScene = KEY_GAME;
      this.changeScene = KEY_TRANSITION;
    }
  }
  render() {
  }
  _onExit() {
  }
}

// src/Core/scene.ts
class Scene2 {
  changeScene;
  onExit() {
    this.changeScene = undefined;
    this._onExit();
  }
}

// src/Scenes/transitionScene.ts
class TransitionScene extends Scene2 {
  targetScene = KEY_MAIN_MENU;
  timer = 0;
  ctx;
  constructor(ctx) {
    super();
    this.ctx = ctx;
  }
  onEnter() {
  }
  update(dt) {
    this.timer += dt;
    if (this.timer > 0.5) {
      this.changeScene = this.targetScene;
    }
  }
  render() {
    const t = this.timer / 0.5;
    this.ctx.fillStyle = `rgba(0,0,0, ${t})`;
    this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }
  _onExit() {
    this.timer = 0;
  }
}

// src/Agents/agent.ts
class Agent {
  movingRight = false;
  movingLeft = false;
  jumping = false;
  set(a) {
    this.movingRight = a.moveRight;
    this.movingLeft = a.moveLeft;
    this.jumping = a.jump;
  }
}

// src/Agents/randomAgent.ts
class RandomAgent extends Agent {
  time = 0;
  name() {
    return "random";
  }
  update(dt) {
    this.time += dt;
    if (this.time > 0.2) {
      this.time = 0;
      this.movingRight = randomBool();
      this.movingLeft = randomBool();
      this.jumping = randomBool();
    }
  }
}

// src/Agents/player.ts
class Player extends Agent {
  name() {
    return "player";
  }
  update(dt) {
    this.movingRight = InputManager.isKeyDown(5 /* D */, 1 /* RIGHT */);
    this.movingLeft = InputManager.isKeyDown(4 /* A */, 0 /* LEFT */);
    this.jumping = InputManager.isKeyDown(14 /* SPACE */, 3 /* UP */);
  }
}

// src/Agents/emptyAgent.ts
class EmptyAgent extends Agent {
  name() {
    return "empty";
  }
  update(dt) {
  }
}

// src/Agents/agentType.ts
var AGENT_RANDOM = 0;
var AGENT_PLAYER = 1;
var AGENT_EMPTY = 2;
function typeToAgent(type, model) {
  switch (type) {
    case AGENT_RANDOM:
      return new RandomAgent;
    case AGENT_PLAYER:
      return new Player;
    case AGENT_EMPTY:
      return new EmptyAgent;
    default:
      console.error(`Unhandled agent type: ${type}. Defaulted to player agent.`);
      return new Player;
  }
}

// src/LevelGeneration/GDM-TS/src/Graph/edge.ts
class Edge {
  src;
  tgt;
  probability;
  constructor(src, tgt, probability) {
    this.src = src;
    this.tgt = tgt;
    this.probability = probability;
  }
}

// src/LevelGeneration/GDM-TS/src/Graph/node.ts
class Node {
  name;
  reward;
  utility;
  isTerminal;
  neighbors;
  constructor(name, reward, utility, is_terminal, neighbors) {
    this.name = name;
    this.reward = reward;
    this.utility = utility;
    this.isTerminal = is_terminal;
    this.neighbors = neighbors;
  }
}

// src/LevelGeneration/GDM-TS/src/Graph/graph.ts
class Graph {
  nodes;
  edges;
  constructor() {
    this.nodes = {};
    this.edges = {};
  }
  getNode(nodeName) {
    return this.nodes[nodeName];
  }
  hasNode(nodeName) {
    return nodeName in this.nodes;
  }
  addNode(node) {
    this.nodes[node.name] = node;
  }
  addDefaultNode(nodeName, reward = 1, utility = 0, terminal = false, neighbors = null) {
    if (neighbors == null) {
      neighbors = [];
    }
    this.nodes[nodeName] = new Node(nodeName, reward, utility, terminal, neighbors);
  }
  removeNode(nodeName) {
    const edgesToRemove = [];
    for (const e of Object.values(this.edges)) {
      if (e.src == nodeName || e.tgt == nodeName) {
        edgesToRemove.push(e);
      }
      const probabilities = e.probability;
      let index = -1;
      for (let i = 0;i < probabilities.length; i++) {
        const [name, _] = probabilities[i];
        if (name == nodeName) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        continue;
      }
      const pValue = probabilities[index][1];
      probabilities.splice(index, 1);
      const len = probabilities.length;
      const pValueNew = pValue / len;
      e.probability = probabilities.map(([name, p]) => [name, p + pValueNew]);
    }
    for (const e of edgesToRemove) {
      this.removeEdge(e.src, e.tgt);
    }
    delete this.nodes[nodeName];
  }
  getEdge(srcName, tgtName) {
    return this.edges[`${srcName},${tgtName}`];
  }
  hasEdge(srcName, tgtName) {
    return `${srcName},${tgtName}` in this.edges;
  }
  addEdge(edge) {
    this.edges[`${edge.src},${edge.tgt}`] = edge;
    const neighbors = this.nodes[edge.src].neighbors;
    if (!neighbors.includes(edge.tgt)) {
      neighbors.push(edge.tgt);
    }
  }
  addDefaultEdge(srcName, tgtName, p = null) {
    if (p == null) {
      p = [[tgtName, 1]];
    }
    this.addEdge(new Edge(srcName, tgtName, p));
  }
  removeEdge(srcNode, tgtNode) {
    const src = this.nodes[srcNode];
    const index = src.neighbors.indexOf(tgtNode);
    src.neighbors.splice(index, 1);
    delete this.edges[`${srcNode},${tgtNode}`];
  }
  neighbors(nodeName) {
    return this.nodes[nodeName].neighbors;
  }
  setNodeUtilities(utilities) {
    for (const [nodeName, utility] of Object.entries(utilities)) {
      this.nodes[nodeName].utility = utility;
    }
  }
  utility(nodeName) {
    return this.nodes[nodeName].utility;
  }
  reward(nodeName) {
    return this.nodes[nodeName].reward;
  }
  isTerminal(nodeName) {
    return this.nodes[nodeName].isTerminal;
  }
  mapNodes(lambda) {
    for (const n of Object.values(this.nodes)) {
      lambda(n);
    }
  }
  mapEdges(lambda) {
    for (const e of Object.values(this.edges)) {
      lambda(e);
    }
  }
}
// src/LevelGeneration/customNode.ts
class CustomNode extends Node {
  visitedCount;
  sumPercentCompleted;
  depth;
  designerReward;
  playerReward;
  constructor(name, reward, utility, isTerminal, neighbors, depth) {
    super(name, reward, utility, isTerminal, neighbors);
    this.designerReward = reward;
    this.playerReward = 0;
    this.depth = depth;
    this.visitedCount = 1;
    this.sumPercentCompleted = 1;
  }
  updateReward() {
    this.reward = this.designerReward * this.visitedCount;
  }
}

// src/LevelGeneration/levels.ts
var MDP = new Graph;
MDP.addNode(new CustomNode(KEY_START, 0, 0, false, [], -1));
MDP.addNode(new CustomNode(KEY_DEATH, -1, 0, true, [], -1));
MDP.addNode(new CustomNode(KEY_END, 1, 0, true, [], -1));
MDP.addNode(new CustomNode("1-a", -0.95, 0, false, [], 1));
MDP.addNode(new CustomNode("2-a", -0.925, 0, false, [], 2));
MDP.addNode(new CustomNode("2-b", -0.925, 0, false, [], 2));
MDP.addNode(new CustomNode("3-a", -0.9, 0, false, [], 3));
MDP.addNode(new CustomNode("3-b", -0.9, 0, false, [], 3));
MDP.addNode(new CustomNode("4-a", -0.825, 0, false, [], 4));
MDP.addNode(new CustomNode("4-b", -0.825, 0, false, [], 4));
MDP.addNode(new CustomNode("5-a", -0.8, 0, false, [], 5));
MDP.addNode(new CustomNode("5-b", -0.8, 0, false, [], 5));
MDP.addNode(new CustomNode("5-c", -0.8, 0, false, [], 5));
MDP.addNode(new CustomNode("6-a", -0.775, 0, false, [], 6));
MDP.addNode(new CustomNode("7-a", -0.75, 0, false, [], 7));
MDP.addNode(new CustomNode("6-b", -0.775, 0, false, [], 6));
MDP.addNode(new CustomNode("1-b", -0.95, 0, false, [], 1));
MDP.addDefaultEdge(KEY_START, "1-a", [
  ["1-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("1-a", "2-b", [
  ["2-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("1-a", "2-a", [
  ["2-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("2-a", "3-a", [
  ["3-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("2-b", "3-b", [
  ["3-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("3-a", "4-b", [
  ["4-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("3-a", "4-a", [
  ["4-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("3-b", "4-b", [
  ["4-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("3-b", "4-a", [
  ["4-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("4-a", "5-b", [
  ["5-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("4-a", "5-a", [
  ["5-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("4-a", "5-c", [
  ["5-c", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("4-b", "5-b", [
  ["5-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("4-b", "5-a", [
  ["5-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("4-b", "5-c", [
  ["5-c", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("5-a", "6-a", [
  ["6-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("5-a", "6-b", [
  ["6-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("5-b", "6-a", [
  ["6-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("5-b", "6-b", [
  ["6-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("5-c", "6-a", [
  ["6-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("5-c", "6-b", [
  ["6-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("6-a", "7-a", [
  ["7-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("7-a", "end", [
  ["end", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("6-b", "7-a", [
  ["7-a", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge(KEY_START, "1-b", [
  ["1-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("1-b", "2-b", [
  ["2-b", 0.99],
  [KEY_DEATH, 0.01]
]);
MDP.addDefaultEdge("1-b", "2-a", [
  ["2-a", 0.99],
  [KEY_DEATH, 0.01]
]);
var idToLevel = {
  "1-a": [
    "------------XXX-",
    "-------------T--",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "-----X-C-----X--",
    "--------------b-",
    "-----------o----",
    "--------o-XX----",
    "------o-XXXX----",
    "------XXXXXX----",
    "XXXXXXXXXXXX^XXX"
  ],
  "2-a": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-------XXXXXXXX-------",
    "----------------------",
    "-------V--o---V-----o-",
    "----------------------",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "2-b": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-----------o----------",
    "--------------------o-",
    "-----X---H-----X------",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "3-a": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "-----------o----------",
    "----------------------",
    "---------XXXXX--------",
    "-----------o----------",
    "----------------------",
    "-------X-H-----X------",
    "---XX--XXXXXXXXX--XX--",
    "----------------------",
    "-------V---o---V----o-",
    "----------------------",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "3-b": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------o-----------",
    "----------------------",
    "--------XXXXX---------",
    "--------V---V---------",
    "----------o-----------",
    "----------------------",
    "------XXXXXXXXX-------",
    "----------------------",
    "----------o---------o-",
    "-----X---H-----X------",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "4-a": [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------XXX---",
    "-----------------V----",
    "-------X---XX-----V---",
    "------XX------o-V---o-",
    "-----XXX--------------",
    "XXXXXXXX---XXXXXXXXXXX"
  ],
  "4-b": [
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "--------------------XX",
    "-----------X-H---o--XX",
    "-----------------o--XX",
    "---------o----------XX",
    "-----------XXXXXXX--XX",
    "--------------------XX",
    "-------X------------XX",
    "------XXX-----------XX",
    "-----XXXXX-----------o",
    "----XXXXXXX-----------",
    "XXXXXXXXXXXXXXXX--XXXX"
  ],
  "5-a": [
    "--------XXXXXXXXXXXXXX--------",
    "-------------------ooX--------",
    "---------------------X--------",
    "---------------------X--------",
    "------------------XXXX--------",
    "------------------X-----------",
    "-----------o--XXXXX-----------",
    "------------------------------",
    "---------XX-----------------o-",
    "------------------------------",
    "--------------XX---XXX----XXXX",
    "------------------------------",
    "----------XX------------------",
    "------------------------------",
    "XXXXXXXX----------------------"
  ],
  "5-b": [
    "------------------------------",
    "-o----------------------------",
    "------------------------------",
    "XXX---------------------------",
    "------------------------------",
    "-----XXX----------------------",
    "------------------------------",
    "-----------XXX----------------",
    "-o--------------------------o-",
    "------XXX---------------------",
    "XXX-----------------------XXXX",
    "------------XXX-------XX------",
    "------------------XX----------",
    "------------------------------",
    "XXXXXXXX---XXXXX--------------"
  ],
  "5-c": [
    "o-----------------------------",
    "------------------------------",
    "X---XX------------------------",
    "------------------------------",
    "------------------------------",
    "XX----------------------------",
    "--------XXXXX-----------------",
    "--------Xoo-------------------",
    "XXX-----Xoo----o------------o-",
    "--------X---------------------",
    "--------XXX---XX----XX----XXXX",
    "XXXX--------------------------",
    "------------------------------",
    "------------------------------",
    "XXXXXXXX----------------------"
  ],
  "6-a": [
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "-------oo---XXXXXXXX----------",
    "-o----------XXXXXXXX----------",
    "------XXXX--XXXXXXXX----------",
    "--------------o---------------",
    "XXXX--------------------------",
    "-------------XXXX-----------o-",
    "---------------------XX-------",
    "XXXXXXXX-----------------XXXXX"
  ],
  "7-a": [
    "-------------------V---------------",
    "-----------------o---o-------------",
    "------------X-H------------H--XXX--",
    "-----V------XXXXXXXXXXXXXXXXXXXXX--",
    "--------XX----o--------------------",
    "-----------------------------------",
    "-----------XXXXXX---Ho-------------",
    "-----------------------------------",
    "-------------V------XX--------H----",
    "-----------------------------------",
    "XX--------o------XXXXX----H--------",
    "-----------------------------------",
    "---X----H----H-X-----------------o-",
    "---XXXXXXXXXXXXX-------------------",
    "XXXX--------------------------XXXXX"
  ],
  end: [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----oooooooooooooooooo",
    "XXXXXXXXXXXXXXXXXXXXXX"
  ],
  "6-b": [
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX----------",
    "----------XXXXXXXXXX---o------",
    "----------XXXXXXXXXX----------",
    "-o--------XXXXXXXXXX----------",
    "----------XXXXXXXXXX---X------",
    "----------XXXXXXXXXX----------",
    "XXX-------XXXXXXXXXXX---------",
    "------XX-----oooo-----------o-",
    "------------------------------",
    "XXXX--------XXXXXX---XXX--XXXX"
  ],
  "1-b": [
    "---------XXX----",
    "----------T-----",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "----------------",
    "----X-----X-----",
    "-------oo------C",
    "----------------",
    "-------XX-------",
    "----o-XXXX-o----",
    "-----XXXXXX-----",
    "---XXXXXXXXXX---",
    "XXXXXXXXXXXXXXXX"
  ]
};

// src/Agents/action.ts
class Action {
  moveRight;
  moveLeft;
  jump;
  constructor(moveRight, moveLeft, jump) {
    this.moveRight = moveRight;
    this.moveLeft = moveLeft;
    this.jump = jump;
  }
}
var ACTIONS = [
  new Action(true, false, false),
  new Action(false, true, false),
  new Action(false, false, true),
  new Action(true, false, true),
  new Action(false, true, true)
];
var NUM_ACTIONS = ACTIONS.length;

// src/replays.ts
var REPLAY_FRAME_TIME = 0.049980000000000004;
var REPLAY_UPDATES_PER_FRAME = 3;
var replays = {
  "1-a": [
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false)
  ],
  "2-a": [
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false)
  ],
  "2-b": [
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false)
  ],
  "3-a": [
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(false, false, true),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(false, false, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false)
  ],
  "3-b": [
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(true, false, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false)
  ],
  "4-a": [
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(false, false, true),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, true),
    new Action(true, false, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false)
  ],
  "4-b": [
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false)
  ],
  "5-a": [
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false)
  ],
  "5-b": [
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false)
  ],
  "5-c": [
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, false, true)
  ],
  "6-a": [
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false)
  ],
  "7-a": [
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(false, true, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, false, true),
    new Action(false, false, true),
    new Action(false, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(true, false, false)
  ],
  end: [
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false)
  ],
  "6-b": [
    new Action(false, true, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(false, false, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, true),
    new Action(false, true, true),
    new Action(false, true, false),
    new Action(false, true, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(false, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false)
  ],
  "1-b": [
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, true),
    new Action(true, false, true),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false),
    new Action(true, false, false)
  ]
};

// src/core/camera.ts
class Camera {
  startCol = 0;
  offsetX = 0;
  colsPerScreen = Math.ceil(SCREEN_WIDTH / TILE_SIZE);
  update(x) {
    const halfX = x - this.colsPerScreen / 2;
    this.startCol = Math.max(0, Math.floor(halfX));
    this.offsetX = -halfX * TILE_SIZE + this.startCol * TILE_SIZE;
  }
  columnToScreen(col) {
    return (col - this.startCol) * TILE_SIZE + this.offsetX;
  }
  rowToScreen(row) {
    return row * TILE_SIZE;
  }
}

// src/core/gameObject.ts
class GameObject {
  game;
  pos;
  type;
  dead = false;
  velocity = new Point(0, 0);
  gravity = new Point(0, 100);
  leftX;
  rightX;
  constructor(position, type) {
    this.pos = position;
    this.type = type;
  }
  physicsUpdate(dt) {
    pointAddInPlace(this.velocity, pointMultiplyScalar(this.gravity, dt));
    this.velocity.y = Math.min(this.velocity.y, 30);
    pointAddInPlace(this.pos, pointMultiplyScalar(this.velocity, dt));
    this.updateLeftRight();
  }
}

// src/core/rectangleGameObject.ts
class RectangleGameObject extends GameObject {
  size;
  constructor(pos, size, type) {
    super(pos, type);
    this.size = size;
    this.leftX = this.pos.x;
    this.rightX = this.pos.x + size.x;
  }
  updateLeftRight() {
    this.leftX = this.pos.x;
    this.rightX = this.pos.x + this.size.x;
  }
  collision(other) {
    if (other instanceof RectangleGameObject) {
      if (rectangleIntersect(this.pos, this.size, other.pos, other.size)) {
        this.handleCollision(other);
        other.handleCollision(this);
      }
    } else if (other instanceof CircleGameObject) {
      if (rectangleIntersectCircle(this.pos, this.size, other.pos, other.r)) {
        this.handleCollision(other);
        other.handleCollision(this);
      }
    }
  }
}

// src/core/circleGameObject.ts
class CircleGameObject extends GameObject {
  r;
  constructor(pos, radius, type) {
    super(pos, type);
    this.r = radius;
    this.leftX = this.pos.x - radius;
    this.rightX = this.pos.x + radius;
  }
  updateLeftRight() {
    this.leftX = this.pos.x - this.r;
    this.rightX = this.pos.x + this.r;
  }
  collision(other) {
    if (other instanceof RectangleGameObject) {
      if (rectangleIntersectCircle(other.pos, other.size, this.pos, this.r)) {
        this.handleCollision(other);
        other.handleCollision(this);
      }
    }
  }
}

// src/GameObjects/gameObjectTypes.ts
var TYPE_PLAYER = 0;
var TYPE_BLOCK = 1;
var TYPE_COIN = 2;
var TYPE_ENEMY = 3;
var TYPE_JUMP_RESET = 4;
var TYPE_BULLET = 5;

// src/logger.ts
class Logger {
  static playerID;
  static version;
  static condition;
  static result;
  static coinsCollected;
  static coinsInLevel;
  static timePlayed;
  static levels;
  static order;
  static pathX;
  static pathY;
  static velX;
  static velY;
  static init() {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "") {
      Logger.playerID = "local-dev";
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("id")) {
        Logger.playerID = crypto.randomUUID();
      } else {
        Logger.playerID = "browser-dev";
      }
    }
    console.log(Logger.playerID);
    Logger.version = "0.0.0";
    Logger.result = "RESULT NOT ASSIGNED";
    Logger.coinsCollected = 0;
    Logger.timePlayed = 0;
    Logger.order = -1;
    Logger.pathX = [];
    Logger.pathY = [];
    Logger.velX = [];
    Logger.velY = [];
  }
  static pushPlayerPositionAndVelocity(position, velocity) {
    this.pathX.push(position.x);
    this.pathY.push(position.y);
    this.velX.push(velocity.x);
    this.velY.push(velocity.y);
  }
  static getLog() {
    return {
      id: Logger.playerID,
      version: Logger.version,
      condition: Logger.condition,
      result: Logger.result,
      coinsCollected: Logger.coinsCollected,
      coinsInLevel: Logger.coinsInLevel,
      timePlayed: Logger.timePlayed,
      levels: Logger.levels,
      order: Logger.order,
      pathX: Logger.pathX,
      pathY: Logger.pathY,
      velX: Logger.velX,
      velY: Logger.velY
    };
  }
  static resetLog() {
    ++Logger.order;
    Logger.levels = [];
    Logger.result = "RESULT NOT ASSIGNED";
    Logger.coinsCollected = 0;
    Logger.timePlayed = 0;
    Logger.levels = [];
    Logger.pathX = [];
    Logger.pathY = [];
    Logger.velX = [];
    Logger.velY = [];
  }
}

// src/GameObjects/CircleEnemy.ts
class CircleEnemy extends CircleGameObject {
  angle;
  start;
  constructor(pos, angle, startPos, velocity) {
    super(pos, CIRCLE_RADIUS, TYPE_ENEMY);
    this.gravity.y = 0;
    this.angle = angle;
    this.start = startPos;
    this.velocity = velocity;
  }
  static defaultConstructor(pos) {
    return new CircleEnemy(pos, 0, pointClone(pos), new Point(0, 0));
  }
  clone() {
    return new CircleEnemy(pointClone(this.pos), this.angle, this.start, pointClone(this.velocity));
  }
  update(dt) {
    this.angle += dt;
    this.velocity.x = 2 * CIRCLE_MOVE_RADIUS * Math.cos(this.angle);
    this.velocity.y = CIRCLE_MOVE_RADIUS * Math.sin(this.angle);
  }
  handleCollision(other) {
    if (other.type === TYPE_PLAYER) {
      Logger.result = "lost - circle enemy";
    } else {
      this.dead = other.type === TYPE_BULLET;
    }
  }
  render(ctx, camera) {
    ctx.fillStyle = COLOR_ORANGE;
    ctx.beginPath();
    ctx.arc(camera.columnToScreen(this.pos.x), camera.rowToScreen(this.pos.y), CIRCLE_SCREEN_RADIUS, 0, TWO_PI);
    ctx.fill();
  }
}

// src/GameObjects/bullet.ts
class Bullet extends RectangleGameObject {
  constructor(pos, velocity) {
    super(pos, BULLET_SIZE, TYPE_BULLET);
    this.gravity.y = 0;
    this.velocity = velocity;
  }
  static defaultConstructor(pos, target) {
    const velocity = pointSubtract(target, pos);
    pointNormalizeInPlace(velocity);
    pointMultiplyScalarInPlace(velocity, BULLET_SPEED);
    return new Bullet(pos, velocity);
  }
  clone() {
    return new Bullet(pointClone(this.pos), pointClone(this.velocity));
  }
  update(dt) {
  }
  handleCollision(other) {
    if (other.type === TYPE_PLAYER) {
      Logger.result = "lost - bullet";
    }
    this.dead = true;
  }
  render(ctx, camera) {
    ctx.fillStyle = COLOR_ORANGE;
    ctx.fillRect(camera.columnToScreen(this.pos.x), camera.rowToScreen(this.pos.y), BULLET_SCREEN_WIDTH, BULLET_SCREEN_HEIGHT);
  }
}

// src/GameObjects/Turret.ts
class Turret extends RectangleGameObject {
  playerPos;
  color;
  time;
  state;
  constructor(pos, time = 0, state = 0) {
    super(pos, BLOCK_SIZE, TYPE_BLOCK);
    this.color = COLOR_YELLOW;
    this.gravity.y = 0;
    this.time = time;
    this.state = state;
  }
  clone() {
    return new Turret(pointClone(this.pos), this.time, this.state);
  }
  update(dt) {
    switch (this.state) {
      case 0: {
        if (pointSquareDistance(this.pos, this.game.protaganist().pos) <= TURRET_SQUARED_RANGE) {
          this.color = COLOR_ORANGE;
          this.state = 1;
        }
        break;
      }
      case 1: {
        this.time += dt;
        if (this.time >= TURRET_LOAD_TIME) {
          this.time = 0;
          this.state = 2;
        }
        break;
      }
      case 2: {
        this.state = 0;
        this.color = COLOR_YELLOW;
        const playerPos = this.game.protaganist().pos;
        const angle = pointAngle(this.pos, playerPos);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        this.game.dynamicEntities.push(Bullet.defaultConstructor(new Point(this.pos.x + (BULLET_WIDTH + BLOCK_WIDTH) * cos, this.pos.y + (BULLET_WIDTH + BLOCK_WIDTH) * sin), playerPos));
        break;
      }
      default: {
        console.error(`Should not be able to enter state ${this.state}`);
        this.state = 0;
        break;
      }
    }
  }
  handleCollision(other) {
  }
  render(ctx, camera) {
    ctx.strokeStyle = this.color;
    const X = camera.columnToScreen(this.pos.x);
    const Y = camera.rowToScreen(this.pos.y);
    const R = BLOCK_SCREEN_WIDTH / 2;
    const RR = 2 * R;
    const T = new Point(X + R, Y);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(T.x, T.y, R, 0, Math.PI);
    ctx.stroke();
    const angle = pointAngle(this.pos, this.game.protaganist().pos);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(T.x + R * cos, T.y + R * sin);
    ctx.lineTo(T.x + RR * cos, T.y + RR * sin);
    ctx.stroke();
    ctx.lineWidth = 1;
  }
}

// src/GameObjects/block.ts
class Block extends RectangleGameObject {
  constructor(pos) {
    super(pos, BLOCK_SIZE, TYPE_BLOCK);
  }
  clone() {
    throw new Error("Block.clone should not have been called!");
  }
  update(dt) {
  }
  handleCollision(other) {
  }
  render(ctx, camera) {
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = COLOR_WHITE;
    ctx.strokeRect(camera.columnToScreen(this.pos.x), camera.rowToScreen(this.pos.y), BLOCK_SCREEN_WIDTH, BLOCK_SCREEN_HEIGHT);
  }
}

// src/GameObjects/blueBlock.ts
var OFF_SCREEN_POS_Y = 1000;
var TIME_OFF_SCREEN = 2;

class BlueBlock extends RectangleGameObject {
  minY;
  maxY;
  yMod;
  timeGone;
  constructor(pos, yMod, minY, maxY, velocityY, timeGone) {
    super(pos, COIN_SIZE, TYPE_JUMP_RESET);
    this.gravity.y = 0;
    this.yMod = yMod;
    this.minY = minY;
    this.maxY = maxY;
    this.velocity.y = velocityY;
    this.timeGone = timeGone;
  }
  static defaultConstructor(pos) {
    pointAddScalarInPlace(pos, 0.25);
    return new BlueBlock(pos, 0.25, pos.y + 0.15, pos.y + 0.3, 0.25, 0);
  }
  clone() {
    return new BlueBlock(pointClone(this.pos), this.yMod, this.minY, this.maxY, this.velocity.y, this.timeGone);
  }
  update(dt) {
    if (this.pos.y > 100) {
      this.timeGone += dt;
      if (this.timeGone >= TIME_OFF_SCREEN) {
        this.pos.y = this.maxY;
        this.velocity.y = -this.yMod;
      }
    } else {
      if (this.pos.y >= this.maxY) {
        this.velocity.y = -this.yMod;
      } else if (this.pos.y <= this.minY) {
        this.velocity.y = this.yMod;
      }
    }
  }
  handleCollision(other) {
    if (other.type === TYPE_PLAYER) {
      this.pos.y = OFF_SCREEN_POS_Y;
      this.timeGone = 0;
    }
  }
  render(ctx, camera) {
    ctx.fillStyle = COLOR_LIGHT_BLUE;
    ctx.fillRect(camera.columnToScreen(this.pos.x), camera.rowToScreen(this.pos.y), COIN_SCREEN_WIDTH, COIN_SCREEN_HEIGHT);
  }
}

// src/GameObjects/coin.ts
class Coin extends RectangleGameObject {
  minY;
  maxY;
  yMod;
  constructor(pos, yMod, maxY, minY, velocityY, dead = false) {
    super(pos, COIN_SIZE, TYPE_COIN);
    this.gravity.y = 0;
    this.yMod = yMod;
    this.maxY = maxY;
    this.minY = minY;
    this.velocity.y = velocityY;
    this.dead = dead;
  }
  static defaultConstructor(pos) {
    pos.x += 0.25;
    return new Coin(pos, 0.1, pos.y + 0.3, pos.y + 0.15, 0.1);
  }
  clone() {
    return new Coin(pointClone(this.pos), this.yMod, this.maxY, this.minY, this.velocity.y, this.dead);
  }
  update(dt) {
    if (this.pos.y >= this.maxY) {
      this.velocity.y = -this.yMod;
    } else if (this.pos.y <= this.minY) {
      this.velocity.y = this.yMod;
    }
  }
  handleCollision(other) {
    if (other.type === TYPE_PLAYER) {
      audioCoin();
      this.dead = true;
    }
  }
  render(ctx, camera) {
    ctx.fillStyle = COLOR_YELLOW;
    ctx.fillRect(camera.columnToScreen(this.pos.x), camera.rowToScreen(this.pos.y), COIN_SCREEN_WIDTH, COIN_SCREEN_HEIGHT);
  }
}

// src/GameObjects/horizontalEnemy.ts
class HorizontalEnemy extends RectangleGameObject {
  maxColumns;
  constructor(pos, maxColumns, velocityX) {
    super(pos, HORIZONTAL_ENEMY_SIZE, TYPE_ENEMY);
    this.maxColumns = maxColumns;
    this.velocity.x = velocityX;
    this.gravity.y = 0;
  }
  static defaultConstructor(pos, maxColumns) {
    pointAddScalarInPlace(pos, 0.25);
    return new HorizontalEnemy(pos, maxColumns, 3);
  }
  clone() {
    return new HorizontalEnemy(pointClone(this.pos), this.maxColumns, this.velocity.x);
  }
  update(dt) {
    this.velocity.x *= boolToSign(this.pos.x >= 0 && this.pos.x <= this.maxColumns);
  }
  handleCollision(other) {
    if (other.type === TYPE_BLOCK) {
      const d = pointSubtract(pointAdd(this.pos, pointMultiplyScalar(this.size, 0.5)), pointAdd(other.pos, pointMultiplyScalar(other.size, 0.5)));
      const averageSize = pointAdd(this.size, other.size);
      pointMultiplyScalar(averageSize, 0.5);
      if (Math.abs(d.x / this.size.x) > Math.abs(d.y / this.size.y)) {
        this.velocity.x *= -1;
        if (d.x < 0) {
          this.pos.x = other.pos.x - this.size.x;
        } else {
          this.pos.x = other.pos.x + other.size.x;
        }
      }
    } else if (other.type === TYPE_BULLET) {
      this.dead = true;
    } else if (other.type === TYPE_PLAYER) {
      Logger.result = "lost - horizontal enemy";
    }
  }
  render(ctx, camera) {
    ctx.fillStyle = COLOR_ORANGE;
    ctx.fillRect(camera.columnToScreen(this.pos.x), camera.rowToScreen(this.pos.y), ENEMY_SCREEN_WIDTH, ENEMY_SCREEN_HEIGHT);
  }
}

// src/GameObjects/laser.ts
class Laser extends RectangleGameObject {
  time;
  constructor(pos, size, time) {
    super(pos, size, TYPE_ENEMY);
    this.gravity.y = 0;
    this.time = time;
  }
  static defaultConstructor(pos, height) {
    pos.x += (BLOCK_WIDTH - LASER_WIDTH) / 2;
    return new Laser(pos, new Point(LASER_WIDTH, height), 0);
  }
  clone() {
    return new Laser(this.pos, this.size, this.time);
  }
  update(dt) {
    audioLaser();
    this.time += dt;
    this.dead = this.time >= LASER_LIFE_TIME;
  }
  handleCollision(other) {
    if (other.type === TYPE_PLAYER) {
      Logger.result = "lost - laser";
    }
  }
  render(ctx, camera) {
    ctx.fillStyle = COLOR_ORANGE;
    ctx.fillRect(camera.columnToScreen(this.pos.x), camera.rowToScreen(this.pos.y), LASER_SCREEN_WIDTH, this.size.y * TILE_SIZE);
  }
}

// src/GameObjects/laserBlock.ts
class LaserBlock extends RectangleGameObject {
  color;
  time = 0;
  state = 0;
  constructor(pos, state = 0, time = 0) {
    super(pos, BLOCK_SIZE, TYPE_BLOCK);
    this.color = COLOR_YELLOW;
    this.gravity.y = 0;
    this.state = state;
    this.time = time;
  }
  clone() {
    return new LaserBlock(pointClone(this.pos), this.state, this.time);
  }
  update(dt) {
    if (pointSquareDistance(this.pos, this.game.protaganist().pos) > 150) {
      this.state = 0;
    }
    this.time += dt;
    switch (this.state) {
      case 0: {
        if (this.time >= LASER_LIFE_TIME) {
          this.time = 0;
          this.state = 1;
          this.color = COLOR_YELLOW;
        }
        break;
      }
      case 1: {
        if (this.time >= LASER_CHARGE_TIME) {
          this.time = 0;
          this.state = 0;
          this.color = COLOR_ORANGE;
          const foundObject = this.game.raycastUp(this.pos);
          const height = foundObject === null ? NUM_ROWS : this.pos.y - foundObject.pos.y - 1;
          this.game.dynamicEntities.push(Laser.defaultConstructor(new Point(this.pos.x, this.pos.y - height), height));
        }
        break;
      }
      default: {
        console.error(`Should not be able to enter state ${this.state}`);
        this.state = 0;
        break;
      }
    }
  }
  handleCollision(other) {
  }
  render(ctx, camera) {
    ctx.strokeStyle = this.color;
    const x = camera.columnToScreen(this.pos.x);
    const topY = camera.rowToScreen(this.pos.y);
    const botY = topY + BLOCK_SCREEN_HEIGHT;
    ctx.beginPath();
    ctx.moveTo(x, botY);
    ctx.lineTo(x + BLOCK_SCREEN_WIDTH / 2, topY);
    ctx.lineTo(x + BLOCK_SCREEN_WIDTH, botY);
    ctx.lineTo(x, botY);
    ctx.stroke();
    ctx.strokeStyle = COLOR_WHITE;
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x + BLOCK_SCREEN_WIDTH, topY);
    ctx.stroke();
  }
}

// src/GameObjects/protaganist.ts
var MOVE = 6;
var MAX_JUMP_TIME = 0.4;

class Protaganist extends RectangleGameObject {
  movingRight;
  movingLeft;
  moveMod;
  jumpTime;
  squash;
  stretch;
  coinsCollected;
  maxColumn;
  agent;
  constructor(pos, velocity, agent, movingRight = false, movingLeft = false, moveMod = 0, jumpTime = 0, squash = 1, stretch = 1, coinsCollected = 0, maxColumn = 0) {
    super(pos, PLAYER_SIZE, TYPE_PLAYER);
    this.velocity = velocity;
    this.agent = agent;
    this.movingRight = movingRight;
    this.movingLeft = movingLeft;
    this.moveMod = moveMod;
    this.jumpTime = jumpTime;
    this.squash = squash;
    this.stretch = stretch;
    this.coinsCollected = coinsCollected;
    this.maxColumn = maxColumn;
  }
  clone() {
    return new Protaganist(pointClone(this.pos), pointClone(this.velocity), this.agent, this.movingRight, this.movingLeft, this.moveMod, this.jumpTime, this.squash, this.stretch, this.coinsCollected, this.maxColumn);
  }
  update(dt) {
    if (this.pos.y > DEATH_HEIGHT) {
      Logger.result = "lost - fell";
      this.dead = true;
      return;
    }
    this.movingLeft = false;
    this.movingRight = false;
    this.velocity.x = 0;
    this.agent.update(dt);
    if (this.agent.movingRight) {
      this.movingRight = true;
      this.velocity.x = MOVE;
      this.moveMod = 4;
    }
    if (this.agent.movingLeft) {
      if (this.movingRight) {
        this.movingRight = false;
        this.velocity.x = 0;
      } else {
        this.movingLeft = true;
        this.velocity.x = -MOVE;
        this.moveMod = 4;
      }
    }
    if (this.jumpTime < MAX_JUMP_TIME && this.agent.jumping) {
      if (this.jumpTime === 0) {
        this.velocity.y = -15;
      } else if (this.jumpTime < 0.2) {
        this.velocity.y -= 2;
      }
      this.velocity.y = Math.max(-20, this.velocity.y);
      this.squash = Math.min(1.03, this.squash + dt);
      this.stretch = Math.max(0.97, this.stretch - dt);
      this.jumpTime += dt;
    } else if (this.squash != this.stretch) {
      this.squash = Math.min(1.03, this.squash + dt);
      this.stretch = Math.max(0.97, this.stretch - dt);
    }
    this.maxColumn = Math.max(this.pos.x, this.maxColumn);
  }
  handleCollision(other) {
    switch (other.type) {
      case TYPE_BLOCK: {
        const block = other;
        const d = pointSubtract(pointAdd(this.pos, pointMultiplyScalar(this.size, 0.5)), pointAdd(block.pos, pointMultiplyScalar(block.size, 0.5)));
        const averageSize = pointAdd(this.size, block.size);
        pointMultiplyScalar(averageSize, 0.5);
        const theta = Math.abs(Math.atan(d.y / d.x));
        const isCorner = theta < 0.96 && theta > 0.698;
        if (!isCorner && Math.abs(d.x / this.size.x) > Math.abs(d.y / this.size.y)) {
          if (d.x < 0) {
            this.pos.x = block.pos.x - this.size.x;
          } else {
            this.pos.x = block.pos.x + block.size.x;
          }
        } else {
          if (d.y > 0) {
            this.pos.y = block.pos.y + block.size.y;
          } else {
            this.pos.y = block.pos.y - this.size.y;
            this.velocity.y = 0;
            this.jumpTime = 0;
            this.stretch = 1.01;
            this.squash = 0.99;
          }
        }
        break;
      }
      case TYPE_COIN: {
        ++this.coinsCollected;
        break;
      }
      case TYPE_BULLET:
      case TYPE_ENEMY: {
        this.dead = true;
        break;
      }
      case TYPE_JUMP_RESET: {
        this.jumpTime = 0;
        this.velocity.y = Math.min(this.velocity.y, 0);
        break;
      }
      default: {
        console.warn(`Player unhandled collision type: ${other.type}.`);
        break;
      }
    }
  }
  render(ctx, camera) {
    ctx.fillStyle = COLOR_LIGHT_PURPLE;
    const x = camera.columnToScreen(this.pos.x);
    const y = camera.rowToScreen(this.pos.y);
    const H = PLAYER_SCREEN_HEIGHT * this.squash;
    const W = PLAYER_SCREEN_WIDTH * this.stretch;
    if (this.movingRight) {
      let region = new Path2D;
      region.moveTo(x, y);
      region.lineTo(x - this.moveMod, y + H);
      region.lineTo(x + W - this.moveMod, y + H);
      region.lineTo(x + W, y);
      region.closePath();
      ctx.fill(region, "evenodd");
    } else if (this.movingLeft) {
      let region = new Path2D;
      region.moveTo(x, y);
      region.lineTo(x + this.moveMod, y + H);
      region.lineTo(x + W + this.moveMod, y + H);
      region.lineTo(x + W, y);
      region.closePath();
      ctx.fill(region, "evenodd");
    } else {
      ctx.fillRect(x, y, W, H);
    }
  }
}

// src/GameObjects/verticalEnemy.ts
class VerticalEnemy extends RectangleGameObject {
  constructor(pos, velocityY) {
    super(pos, VERTICAL_ENEMY_SIZE, TYPE_ENEMY);
    this.velocity.y = velocityY;
    this.gravity.y = 0;
  }
  static defaultConstructor(pos) {
    pos.x += 0.25;
    pos.y += 0.1;
    return new VerticalEnemy(pos, 3);
  }
  clone() {
    return new VerticalEnemy(pointClone(this.pos), this.velocity.y);
  }
  update(dt) {
    this.velocity.y *= boolToSign(this.pos.y > 0 && this.pos.y <= NUM_ROWS);
  }
  handleCollision(other) {
    if (other.type === TYPE_BLOCK) {
      const d = pointSubtract(pointAdd(this.pos, pointMultiplyScalar(this.size, 0.5)), pointAdd(other.pos, pointMultiplyScalar(other.size, 0.5)));
      const averageSize = pointAdd(this.size, other.size);
      pointMultiplyScalar(averageSize, 0.5);
      if (Math.abs(d.x / this.size.x) < Math.abs(d.y / this.size.y)) {
        this.velocity.y *= -1;
        if (d.y > 0) {
          this.pos.y = other.pos.y + other.size.y;
        } else {
          this.pos.y = other.pos.y - this.size.y;
        }
      }
    } else if (other.type === TYPE_BULLET) {
      this.dead = true;
    } else if (other.type === TYPE_PLAYER) {
      Logger.result = "lost - vertical enemy";
    }
  }
  render(ctx, camera) {
    ctx.fillStyle = COLOR_ORANGE;
    ctx.fillRect(camera.columnToScreen(this.pos.x), camera.rowToScreen(this.pos.y), ENEMY_SCREEN_HEIGHT, ENEMY_SCREEN_WIDTH);
  }
}

// src/gameModel.ts
class GameModel {
  staticEntitiesRenderLocations = [];
  staticEntities;
  dynamicEntities = [];
  coins = [];
  constructor(level, agentType) {
    if (level === null) {
      return;
    }
    const rows = level.length;
    if (rows !== NUM_ROWS) {
      console.error("Level should have 15 rows!");
      return;
    }
    this.dynamicEntities.push(new Protaganist(new Point(2, 12), new Point(0, 0), typeToAgent(agentType, this)));
    const columns = level[0].length;
    let r, c;
    this.staticEntities = [];
    for (r = 0;r < rows; ++r) {
      const a = new Array(columns);
      a.fill(false);
      this.staticEntities.push(a);
    }
    for (r = 0;r < rows; ++r) {
      const row = level[r];
      if (columns !== row.length) {
        console.error(`Every row in the level should have the same number of columns! (${columns} != ${row.length}).`);
        return;
      }
      for (c = 0;c < columns; ++c) {
        const tile = row[c];
        if (tile === "X") {
          this.staticEntities[r][c] = true;
          this.staticEntitiesRenderLocations.push(new Point(c, r));
        } else if (tile === "^") {
          this.dynamicEntities.push(new LaserBlock(new Point(c, r)));
        } else if (tile === "T") {
          this.dynamicEntities.push(new Turret(new Point(c, r)));
        } else if (tile === "o") {
          const coin = Coin.defaultConstructor(new Point(c, r));
          this.dynamicEntities.push(coin);
          this.coins.push(coin);
        } else if (tile == "b") {
          this.dynamicEntities.push(BlueBlock.defaultConstructor(new Point(c, r)));
        } else if (tile === "H") {
          this.dynamicEntities.push(HorizontalEnemy.defaultConstructor(new Point(c, r), columns));
        } else if (tile === "V") {
          this.dynamicEntities.push(VerticalEnemy.defaultConstructor(new Point(c, r)));
        } else if (tile === "C") {
          this.dynamicEntities.push(CircleEnemy.defaultConstructor(new Point(c, r)));
        } else if (tile !== "-") {
          console.error(`Unhandled tile type: ${tile}`);
        }
      }
    }
    for (let i = 0;i < this.dynamicEntities.length; ++i) {
      this.dynamicEntities[i].game = this;
    }
    const playerPosition = this.dynamicEntities[0].pos;
    this.coins.sort((a, b) => {
      return pointSquareDistance(playerPosition, a.pos) - pointSquareDistance(playerPosition, b.pos);
    });
  }
  clone() {
    const clone = new GameModel(null, AGENT_EMPTY);
    const dLength = this.dynamicEntities.length;
    let i = 0;
    for (;i < dLength; ++i) {
      const currentEntity = this.dynamicEntities[i];
      if (currentEntity.dead) {
        continue;
      }
      const de = currentEntity.clone();
      de.game = clone;
      clone.dynamicEntities.push(de);
      if (de instanceof Coin) {
        clone.coins.push(de);
      }
    }
    const playerPosition = clone.dynamicEntities[0].pos;
    clone.coins.sort((a, b) => {
      return pointSquareDistance(playerPosition, a.pos) - pointSquareDistance(playerPosition, b.pos);
    });
    clone.staticEntities = this.staticEntities;
    return clone;
  }
  hash() {
    const pos = this.dynamicEntities[0].pos;
    return Math.round(pos.x * 100) + Math.round(pos.y * 100) * 1e6;
  }
  update(dt, divisor = 1) {
    dt = dt / divisor;
    for (let subframe = 0;subframe < divisor; ++subframe) {
      let deSize = this.dynamicEntities.length;
      for (let i = 0;i < deSize; ++i) {
        const e = this.dynamicEntities[i];
        e.update(dt);
        e.physicsUpdate(dt);
      }
      const sortedIndices = Array.from(this.dynamicEntities.keys()).sort((a, b) => this.dynamicEntities[a].leftX - this.dynamicEntities[b].leftX);
      for (let i = 0;i < sortedIndices.length; ++i) {
        const obj1 = this.dynamicEntities[sortedIndices[i]];
        for (let jj = i + 1;jj < sortedIndices.length; ++jj) {
          const obj2 = this.dynamicEntities[sortedIndices[jj]];
          if (obj2.leftX > obj1.rightX) {
            break;
          }
          obj1.collision(obj2);
        }
        if (obj1 instanceof RectangleGameObject) {
          const positions = [
            obj1.pos,
            pointAdd(obj1.pos, new Point(BLOCK_SIZE.x, 0)),
            pointAdd(obj1.pos, new Point(0, BLOCK_SIZE.y)),
            pointAdd(obj1.pos, BLOCK_SIZE)
          ];
          for (let jj = 0;jj < 4; ++jj) {
            const point = pointFloor(positions[jj]);
            if (point.y >= 0 && point.y < this.staticEntities.length && point.x >= 0 && point.x <= this.staticEntities[0].length && this.staticEntities[point.y][point.x]) {
              obj1.collision(new Block(point));
            }
          }
        }
      }
      for (let i = 0;i < deSize; ++i) {
        if (this.dynamicEntities[i].dead) {
          if (i == 0) {
            return;
          }
          this.dynamicEntities.splice(i, 1);
          --deSize;
        }
      }
    }
  }
  render(ctx, camera) {
    camera.update(this.dynamicEntities[0].pos.x);
    let size = this.staticEntitiesRenderLocations.length;
    let i = 0;
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = COLOR_WHITE;
    for (;i < size; ++i) {
      const pos = this.staticEntitiesRenderLocations[i];
      ctx.strokeRect(camera.columnToScreen(pos.x), camera.rowToScreen(pos.y), BLOCK_SCREEN_WIDTH, BLOCK_SCREEN_HEIGHT);
    }
    size = this.dynamicEntities.length;
    for (i = 0;i < size; ++i) {
      this.dynamicEntities[i].render(ctx, camera);
    }
  }
  state() {
    const player = this.dynamicEntities[0];
    if (player.coinsCollected >= this.coins.length)
      return GAME_STATE_WON;
    if (player.dead)
      return GAME_STATE_LOST;
    return GAME_STATE_PLAYING;
  }
  protaganist() {
    return this.dynamicEntities[0];
  }
  fitness() {
    const protaganist = this.dynamicEntities[0];
    return 1 - protaganist.coinsCollected / this.coins.length;
  }
  raycastUp(start) {
    const p = pointClone(start);
    p.y -= 1;
    while (p.y >= 0) {
      if (this.staticEntities[p.y][p.x]) {
        return new Block(p);
      }
      p.y -= 1;
    }
    return null;
  }
}

// src/Scenes/mainMenuScene.ts
var DT = REPLAY_FRAME_TIME / REPLAY_UPDATES_PER_FRAME;

class MainMenuScene extends Scene {
  ctx;
  transitionScene;
  camera;
  game;
  actions = [];
  actionIndex;
  frame;
  time;
  previousKey = "";
  constructor(ctx, transitionScene) {
    super();
    this.ctx = ctx;
    this.transitionScene = transitionScene;
    this.camera = new Camera;
  }
  onEnter() {
    let levelID = randomKey(replays);
    while (levelID == this.previousKey) {
      levelID = randomKey(replays);
    }
    this.previousKey = levelID;
    this.actions = replays[levelID];
    this.game = new GameModel(idToLevel[levelID], AGENT_EMPTY);
    this.actionIndex = 0;
    this.frame = 0;
    this.time = 0;
  }
  update(dt) {
    if (this.game.state() !== GAME_STATE_PLAYING) {
      this.onEnter();
    }
    if (InputManager.isKeyDown(14 /* SPACE */)) {
      this.transitionScene.targetScene = KEY_GAME;
      this.changeScene = KEY_TRANSITION;
    }
    this.time += dt;
    if (this.time >= 0.0166666) {
      this.time = this.time - 0.016666;
      if (this.frame >= REPLAY_UPDATES_PER_FRAME) {
        this.frame = 0;
        ++this.actionIndex;
      }
      ++this.frame;
      this.game.protaganist().agent.set(this.actions[this.actionIndex]);
      this.game.update(DT);
    }
  }
  render() {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.game.render(this.ctx, this.camera);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(240, 60, 240, 47);
    this.ctx.fillRect(210, 234, 295, 39);
    this.ctx.fillStyle = COLOR_YELLOW;
    this.ctx.font = "48px Arial";
    this.ctx.fillText("Recformer", 247, 100);
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Press 'space' to start", 220, SCREEN_HEIGHT * 0.55);
  }
  _onExit() {
  }
}

// src/LevelGeneration/singleLevelDirector.ts
class SingleLevelDirector {
  playerWonLastRound = false;
  constructor() {
  }
  playerBeatGame() {
    return true;
  }
  update(playerWon, playerColumn) {
  }
  get(levelSegments) {
    return [
      "----------------------------------------------------------------------------------XXXXXXXX--------",
      "-------------------------C---------------------------------------------------------XXXXXXX--------",
      "-----------------------------------------------------------------------------------XXXXXXX--------",
      "-------------------XXXXXXXXXXXXXXX----XXXXXX---------------------------------------XXXXXXX--------",
      "---------------------------------------------------------------------------------------T----------",
      "--------------------------------------------------------------------------------------------------",
      "----------------------------------XXXX^XXXX^XXXX--------------------------------------------------",
      "------------------------------------------V---VX-------------H--------X---------------------------",
      "----------------------------------------------------XXXXXXXXXXXXXXXXXXX---------------------------",
      "--------------------------------XX-------------------------------------------XXXXXXXX-------------",
      "-------------------------XXX-----------XXXXXXXXXX----------------------------C------C-------------",
      "--------------------------------------------------------------------------------------------------",
      "-------------------------V-V----------------------------------------------------------------------",
      "--------X---H---X---------V---------------------------------------------------------------------o-",
      "XXXXXXXXXXXXXXXXXX---XXXXXXXXXXXXXXXXXX^XXXXX^XXXX---XXXXX---XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
  }
}

// src/core/repeatingTimer.ts
class RepeatingTimer {
  runTime;
  callback;
  startTime;
  constructor(runTime, callback) {
    this.runTime = runTime;
    this.callback = callback;
    this.startTime = 0;
  }
  update(dt) {
    this.startTime += dt;
    if (this.runTime <= this.startTime) {
      this.startTime = 0;
      this.callback();
    }
  }
}

// src/Scenes/gameScene.ts
class GameScene extends Scene {
  ctx;
  transitionScene;
  agentType;
  game;
  camera;
  levelDirector;
  timer;
  timePlayed;
  constructor(ctx, transitionScene, agentType) {
    super();
    this.ctx = ctx;
    this.agentType = agentType;
    this.transitionScene = transitionScene;
    this.camera = new Camera;
    this.levelDirector = new SingleLevelDirector;
  }
  onEnter() {
    const lvl = this.levelDirector.get(LEVEL_SEGMENTS_PER_LEVEL);
    this.game = new GameModel(lvl, this.agentType);
    this.timer = new RepeatingTimer(0.1, () => {
      const player = this.game.dynamicEntities[0];
      Logger.pushPlayerPositionAndVelocity(player.pos, player.velocity);
    });
    this.timePlayed = 0;
    Logger.coinsInLevel = this.game.coins.length;
  }
  update(dt) {
    this.game.update(dt);
    this.timer.update(dt);
    this.timePlayed += dt;
    const state = this.game.state();
    switch (state) {
      case GAME_STATE_PLAYING:
        break;
      case GAME_STATE_LOST: {
        Logger.timePlayed = this.timePlayed;
        Logger.coinsCollected = this.game.dynamicEntities[0].coinsCollected;
        ++Logger.order;
        console.log(Logger.timePlayed);
        this.transitionScene.targetScene = KEY_PLAYER_LOST;
        this.changeScene = KEY_TRANSITION;
        break;
      }
      case GAME_STATE_WON: {
        Logger.result = "won";
        Logger.timePlayed = this.timePlayed;
        Logger.coinsCollected = this.game.dynamicEntities[0].coinsCollected;
        ++Logger.order;
        console.log(Logger.timePlayed);
        if (this.levelDirector.playerBeatGame()) {
          this.transitionScene.targetScene = KEY_PLAYER_BEAT_THE_GAME;
        } else {
          this.transitionScene.targetScene = KEY_PLAYER_WON;
        }
        this.changeScene = KEY_TRANSITION;
        break;
      }
      default: {
        console.error(`Unhandled game state type: ${state}`);
        break;
      }
    }
  }
  render() {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.game.render(this.ctx, this.camera);
  }
  _onExit() {
    const fitness = this.game.fitness();
    console.log(`Fitness: ${fitness}`);
    this.levelDirector.update(this.transitionScene.targetScene === KEY_PLAYER_WON, fitness);
  }
}

// src/index.ts
window.addEventListener("load", () => {
  audioLoad(() => {
    InputManager.init();
    Logger.init();
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const ctx = canvas.getContext("2d");
    document.getElementById("game").appendChild(canvas);
    const sceneManager = new SceneManager;
    const transitionScene = new TransitionScene(ctx);
    sceneManager.registerScene(KEY_TRANSITION, transitionScene);
    sceneManager.registerScene(KEY_MAIN_MENU, new MainMenuScene(ctx, transitionScene));
    sceneManager.registerScene(KEY_GAME, new GameScene(ctx, transitionScene, AGENT_PLAYER));
    sceneManager.registerScene(KEY_PLAYER_BEAT_THE_GAME, new PlayerBeatTheGameScene(ctx));
    sceneManager.registerScene(KEY_PLAYER_WON, new PlayerBeatLevelScene(ctx, transitionScene));
    sceneManager.registerScene(KEY_PLAYER_LOST, new PlayerLostLevelScene(ctx, transitionScene));
    let currentScene = sceneManager.getScene(KEY_MAIN_MENU);
    currentScene.onEnter();
    let previousTimeStamp = 0;
    const gameLoop = (timeStamp) => {
      const dt = Math.min(0.05, (timeStamp - previousTimeStamp) / 1000);
      previousTimeStamp = timeStamp;
      currentScene.update(clamp(dt, 0.01, 0.2));
      currentScene.render();
      const scene = currentScene.changeScene;
      if (scene !== undefined) {
        currentScene.onExit();
        currentScene = sceneManager.getScene(scene);
        currentScene.onEnter();
      }
      window.requestAnimationFrame(gameLoop);
    };
    window.requestAnimationFrame(gameLoop);
  });
});
