import { ImageNames, IMAGES_PATH } from '../constants/images';
import ControllEvents from './ControllEvents';
import Scene from './scene/Scene';
import Screen from './Screen';

export default class Game<Scenes extends typeof Scene = typeof Scene> {
  screen: Screen;
  scenes: Map<string, Scene>;
  currentScene: Scene;
  control: ControllEvents;

  constructor({ height = 640, width = 640, scenes }: GameOptions<Scenes>) {
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

    this.scenes = this.configScenes(scenes);
    this.currentScene = this.scenes.get('loading') as Scene;
    this.currentScene.init();
  }

  nextScene(name: string) {
    const scene = this.scenes.get(name);
    if (scene) {
      this.currentScene = scene;
      this.currentScene.init();
    } else {
      throw new Error('Wrong scene name');
    }
  }

  frame(time: number) {
    this.currentScene.render(time);
    this.control = new ControllEvents();
    requestAnimationFrame((time) => this.frame(time));
  }

  run() {
    requestAnimationFrame((time) => this.frame(time));
  }

  private configScenes(scenes: ScenesType): Map<string, Scene> {
    const scenesArr: Array<[string, Scene]> = scenes.map((Scene) => {
      const scene = new Scene(this, '');
      return [scene.name, scene];
    });
    return new Map(scenesArr);
  }
}

export interface GameOptions<Scenes extends typeof Scene = typeof Scene> {
  width: number;
  height: number;
  scenes: ScenesType<Scenes>
}

type ScenesType<Scenes extends typeof Scene = typeof Scene> = Array<Scenes>
