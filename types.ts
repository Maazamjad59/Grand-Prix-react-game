
export enum GameState {
  Menu,
  Playing,
  GameOver,
}

export interface Position {
  x: number;
  y: number;
}

export interface Obstacle extends Position {
  id: number;
  color: string;
  speed: number;
}
