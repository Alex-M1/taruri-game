import { ImageNames } from '../constants/images';
import { SceneNames } from '../constants/scenes';
import Game from '../Engine/Game';
import Scene from '../Engine/scene/Scene';

export default class MenuScene extends Scene {
  constructor(game: Game) {
    super(game, SceneNames.menu);
  }

  init() {
    super.init();
  }

  update(time: number) {
    if (this.game.control.fire) {
      this.game.nextScene(SceneNames.village);
    }
  }

  render(time: number): void {
    this.update(time);
    this.game.screen.drawImage(0, 0, ImageNames.menu_bg);
    this.game.screen.print(250, 500, 'Нажмите пробел');
    super.render(time);
  }
}
