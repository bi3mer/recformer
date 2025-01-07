export const SCREEN_WIDTH = 720;
export const SCREEN_HEIGHT = 480;
export const TILE_SIZE = 32;
export const NUM_ROWS = 15;
export const DEATH_HEIGHT = NUM_ROWS + 2;

export const PLAYER_SCREEN_WIDTH = 20;
export const PLAYER_SCREEN_HEIGHT = 30;
export const PLAYER_WIDTH = PLAYER_SCREEN_WIDTH / TILE_SIZE;
export const PLAYER_HEIGHT = PLAYER_SCREEN_HEIGHT / TILE_SIZE;

export const BLOCK_SCREEN_WIDTH = 31;
export const BLOCK_SCREEN_HEIGHT = 31;
export const BLOCK_WIDTH = BLOCK_SCREEN_WIDTH / TILE_SIZE;
export const BLOCK_HEIGHT = BLOCK_SCREEN_HEIGHT / TILE_SIZE;

export const COIN_SCREEN_WIDTH = 16;
export const COIN_SCREEN_HEIGHT = 16;
export const COIN_WIDTH = COIN_SCREEN_WIDTH / TILE_SIZE;
export const COIN_HEIGHT = COIN_SCREEN_HEIGHT / TILE_SIZE;

export const ENEMY_SCREEN_WIDTH = 25;
export const ENEMY_SCREEN_HEIGHT = 15;
export const ENEMY_WIDTH = ENEMY_SCREEN_WIDTH / TILE_SIZE;
export const ENEMY_HEIGHT = ENEMY_SCREEN_HEIGHT / TILE_SIZE;

export const LEVEL_SEGMENTS_PER_LEVEL = 3;

// Laser config
export const LASER_WIDTH = BLOCK_WIDTH / 8.0;
export const LASER_SCREEN_WIDTH = BLOCK_SCREEN_WIDTH / 8.0;
export const LASER_LIFE_TIME = 0.6;
export const LASER_CHARGE_TIME = 2.0;

// Turret config
export const TURRET_LOAD_TIME = 2.5;
export const TURRET_SQUARED_RANGE = 150.0;

// Bullet config
export const BULLET_SPEED = 10.0;
export const BULLET_SCREEN_WIDTH = 10;
export const BULLET_SCREEN_HEIGHT = 10;
export const BULLET_WIDTH = COIN_SCREEN_WIDTH / TILE_SIZE;
export const BULLET_HEIGHT = COIN_SCREEN_HEIGHT / TILE_SIZE;

// MDP keys
export const KEY_START = "start";
export const KEY_END = "end";
export const KEY_DEATH = "death";
