import Game from './Game';

export default class Scene {
  // game: Game;
  isActive: boolean;
  name: string;

  constructor(name: string) {
    // this.game = game;
    this.name = name;
    this.isActive = true;
  }

  init() {
    this.isActive = true;
  }
  render() { }

  nextScene(name: string) { console.log(name); }
}
