import { DIRECTIONS } from './physicsType';

export default class Vector {
  direction: DIRECTIONS;
  speed: number;
  x: number;
  y: number;

  constructor(direction: DIRECTIONS, speed: number) {
    this.direction = direction;
    this.speed = speed;
    this.x = 0;
    this.y = 0;

    this.setDirection(direction, speed);
  }

  setDirection(direction: DIRECTIONS, speed: number) {
    this.x = 0;
    this.y = 0;
    this.speed = speed;

    switch (direction) {
      case DIRECTIONS.UP:
        this.y = -speed;
        break;
      case DIRECTIONS.DOWN:
        this.y = speed;
        break;
      case DIRECTIONS.LEFT:
        this.x = -speed;
        break;
      case DIRECTIONS.RIGHT:
        this.x = speed;
        break;
      default:
        this.x = 0;
        this.y = 0;
        break;
    }
  }
}
