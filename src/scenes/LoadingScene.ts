import { ImagePaths, IMAGE_NAME_ARR } from '../constants/images';
import { SceneNames } from '../constants/scenes';
import Game from '../Engine/game/Game';
import Scene from '../Engine/scene/Scene';

export default class LoadingScene extends Scene {
  loadedAt: number;

  constructor(game: Game) {
    super(game, SceneNames.loading);
    this.loadedAt = 0;
  }
  init(): void {
    this.loadedAt = 0;

    IMAGE_NAME_ARR.forEach((name) => {
      this.game.loader.loadImage(name, ImagePaths[name]);
    });
  }

  update(time: number) {
    if (this.loadedAt === 0
      // && this.game.screen.isImagesLoaded === true
    ) {
      this.loadedAt = time;
    }
    if (this.loadedAt !== 0 && (time - this.loadedAt) > 1000) {
      this.game.nextScene(SceneNames.menu);
    }
  }

  render(time: number) {
    this.update(time);
    this.game.screen.fill('#000');
    this.game.screen.print(50, 70, 'Loading...');
    super.render(time);
  }
}
