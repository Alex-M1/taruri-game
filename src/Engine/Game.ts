import Scene from './Scene';
import Screen from './Screen';

export default class Game {
  screen: Screen;
  scenes: Map<string, typeof Scene | Function>;
  currentScene: any;

  constructor({ height, width, scenes }: GameOptions) {
    this.screen = new Screen(width, height);
    this.scenes = new Map();
    this.currentScene = new scenes[0]();
    this.setScenes(scenes);
  }

  private setScenes(scenes: Array<typeof Function>) {
    scenes.forEach((SceneConstr) => {
      const scene = new SceneConstr();
      this.scenes.set(scene.name, scene);
    });
  }

  changeScene(name: string) {
    this.currentScene = this.scenes.get(name);
  }

  frame(time: number) {
    // if (this.currentScene.isActive === false) {
    //   this.currentScene = this.scenes[this.currentScene.nextScene];
    //   this.currentScene.init();
    // }
    // this.currentScene.render(time);
    // requestAnimationFrame((time) => this.frame(time));
  }

  run() {
    // requestAnimationFrame((time) => this.frame(time));
  }
}

export interface GameOptions {
  width: number;
  height: number;
  scenes: Array<typeof Function>;
}
