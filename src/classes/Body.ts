import { PERSON_ANIMATIONS_ARR } from '../constants/images';
import { DIRECTIONS } from '../Engine/physics/physicsType';
import Vector from '../Engine/physics/Vector';
import SpriteAnimation from '../Engine/sprites/SpriteAnimation';
import PersonSheet from './PersonSheet';

export default class Body {
  x: number;
  y: number;
  speed: number;
  velocity: Vector;
  lastTime: number;
  animations: Record<string, SpriteAnimation>;
  view: SpriteAnimation;
  constructor({ imageName, speed }: { imageName: string, speed: number }) {
    this.x = 0;
    this.y = 0;
    this.speed = speed;
    this.velocity = new Vector(DIRECTIONS.DOWN, 0);
    this.lastTime = 0;
    this.animations = {} as Record<string, SpriteAnimation>;
    this.view = {} as SpriteAnimation;

    const animationSheet = new PersonSheet({ imageName });
    PERSON_ANIMATIONS_ARR.forEach((name) => {
      this.animations[name] = animationSheet.getPersonAnimation(name, speed);
    });
    this.stand(DIRECTIONS.DOWN);
  }

  walk(direction: DIRECTIONS) {
    this.velocity.setDirection(direction, this.speed);
    this.view = this.animations[`walk_${direction}`];
    this.view.run();
  }

  stand(direction: DIRECTIONS) {
    this.velocity.setDirection(direction, 0);
    this.view = this.animations[`walk_${direction}`];
    this.view.stop();
  }

  update(time: number) {
    if (this.lastTime === 0) {
      this.lastTime = time;
      return;
    }
    console.log(this.velocity.x);
    this.x += (time - this.lastTime) * (this.velocity.x / 1000);
    this.y += (time - this.lastTime) * (this.velocity.y / 1000);
    this.lastTime = time;
    this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
    this.view.update(time);
  }
}
