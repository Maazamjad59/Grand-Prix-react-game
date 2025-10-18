
export const GAME_WIDTH = 350;
export const GAME_HEIGHT = 600;

export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 80;
export const PLAYER_INITIAL_X = GAME_WIDTH / 2 - PLAYER_WIDTH / 2;
export const PLAYER_INITIAL_Y = GAME_HEIGHT - PLAYER_HEIGHT - 20;
export const PLAYER_SPEED = 250; // pixels per second

export const OBSTACLE_WIDTH = 45;
export const OBSTACLE_HEIGHT = 90;
export const OBSTACLE_SPEED_MIN = 150;
export const OBSTACLE_SPEED_MAX = 350;
export const OBSTACLE_SPAWN_INTERVAL = 1200; // milliseconds

export const LANES = [
    GAME_WIDTH * 0.2 - OBSTACLE_WIDTH / 2,
    GAME_WIDTH * 0.5 - OBSTACLE_WIDTH / 2,
    GAME_WIDTH * 0.8 - OBSTACLE_WIDTH / 2,
];

export const OBSTACLE_COLORS = [
    '#3b82f6', // blue-500
    '#22c55e', // green-500
    '#eab308', // yellow-500
    '#8b5cf6', // violet-500
];
