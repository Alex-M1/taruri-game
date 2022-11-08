import Game from '../game/Game';

export default class Scene {
  game: Game;
  isActive: boolean;
  nextScene: string;
  name: string;

  constructor(game: Game, name: string) {
    this.game = game;
    this.isActive = true;
    this.nextScene = '';
    this.name = name;
  }

  init() {
  }

  render(time: number) { }
}
