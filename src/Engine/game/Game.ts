import ControllEvents from '../ControllEvents';
import Scene from '../scene/Scene';
import Loader from './Loader';
import Screen from './Screen';

export default class Game<Scenes extends typeof Scene = typeof Scene> {
  screen: Screen;
  scenes: Map<string, Scene>;
  currentScene: Scene;
  control: ControllEvents;
  loader: Loader;

  constructor({ height = 640, width = 640, scenes }: GameOptions<Scenes>) {
    this.screen = new Screen(width, height, this);
    this.control = new ControllEvents();
    this.loader = new Loader();

    this.scenes = this.configScenes(scenes);
    this.currentScene = new scenes[0](this, '');
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
