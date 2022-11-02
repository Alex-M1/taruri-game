import Game from '../Game';

export default class Scene {
  game: Game;
  isActive: boolean;
  nextScene: string;
  status: string;
  name: string;

  constructor(game: Game, name: string) {
    this.game = game;
    this.isActive = true;
    this.nextScene = '';
    this.status = Scene.WORKING;
    this.name = name;
  }

  static get WORKING() { return 'WORKING'; }
  static get LOADED() { return 'LOADED'; }
  static get START_GAME() { return 'START_GAME'; }
  static get GAME_OVER() { return 'GAME_OVER'; }
  static get GAME_WIN() { return 'GAME_WIN'; }
  static get FINISHED() { return 'FINISHED'; }

  init() {
    this.status = Scene.WORKING;
  }

  finish(status: string) {
    this.status = status;
  }
  render(time: number) { }
}
