import Game from '../Engine/Game';
import Scene from '../Engine/Scene';
import { SceneNames } from '../scenes';

export default class LoadingScene extends Scene {
  constructor() {
    super(SceneNames.loading);
  }
  init(): void {

  }
  render(time: number) {
    this.game.screen.fill('#000');
  }
}
