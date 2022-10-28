import { ImageNames } from '../constants/images';
import Scene from '../Engine/Scene';

export default class MenuScene extends Scene {
  constructor(game) {
    super(game);
  }

  init() {
    super.init();
  }

  update(time: number) {
    if (this.game.control.fire) {
      this.finish(Scene.START_GAME);
    }
  }

  render(time: number): void {
    this.update(time);
    this.game.screen.drawImage(0, 0, ImageNames.menu_bg);
    this.game.screen.print(250, 500, 'Нажмите пробел');
    super.render(time);
  }
}
