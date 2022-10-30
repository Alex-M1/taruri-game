import { ImageNames, IMAGES_PATH } from '../constants/images';
import { SceneNames } from '../constants/scenes';
import LoadingScene from '../scenes/LoadingScene';
import MenuScene from '../scenes/MenuScene';
import VillageScene from '../scenes/VillageScene';
import ControllEvents from './ControllEvents';
import Scene from './scene/Scene';
import Screen from './Screen';

export default class Game {
  screen: Screen;
  scenes: ScenesType;
  currentScene: Scene;
  control: ControllEvents;

  constructor({ height = 640, width = 640 }: GameOptions) {
    this.screen = new Screen(width, height);
    this.control = new ControllEvents();

    this.screen.loadImages({
      [ImageNames.cross_menu]: IMAGES_PATH.cross_menu,
      [ImageNames.menu_bg]: IMAGES_PATH.menu_bg,
      [ImageNames.menu_button]: IMAGES_PATH.menu_button,
      [ImageNames.basetiles]: IMAGES_PATH.basetiles,
      [ImageNames.character_sprites]: IMAGES_PATH.character_sprites,
      [ImageNames.addwork]: IMAGES_PATH.addwork,
      [ImageNames.water]: IMAGES_PATH.water,
    });

    this.scenes = {
      [SceneNames.loading]: new LoadingScene(this),
      [SceneNames.menu]: new MenuScene(this),
      [SceneNames.village]: new VillageScene(this),
    };
    this.currentScene = this.scenes.loading;
    this.currentScene.init();
  }

  changeScene(status: string) {
    switch (status) {
      case Scene.LOADED:
        return this.scenes.menu;
      case Scene.START_GAME:
        return this.scenes.village;
      default: return this.scenes.menu;
    }
  }

  frame(time: number) {
    if (this.currentScene.status !== Scene.WORKING) {
      this.currentScene = this.changeScene(this.currentScene.status);
      this.currentScene.init();
    }
    this.currentScene.render(time);
    this.control = new ControllEvents();
    requestAnimationFrame((time) => this.frame(time));
  }

  run() {
    requestAnimationFrame((time) => this.frame(time));
  }
}

export interface GameOptions {
  width: number;
  height: number;
}

export interface ScenesType {
  [key: string]: Scene
}
