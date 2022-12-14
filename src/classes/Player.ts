import { ImageNames } from '../constants/images';
import { PLAYER_SPEED } from '../constants/player';
import ControllEvents from '../Engine/ControllEvents';
import { DIRECTIONS } from '../Engine/physics/physicsType';
import Body from './Body';

export default class Player extends Body {
  control: ControllEvents;

  constructor(control: ControllEvents) {
    super({ imageName: ImageNames.character_sprites, speed: PLAYER_SPEED });
    this.control = control;
  }

  update(time: number): void {
    console.log(this.velocity.direction);
    if (this.control.up) {
      this.walk(DIRECTIONS.UP);
    } else if (this.control.down) {
      this.walk(DIRECTIONS.DOWN);
    } else if (this.control.left) {
      this.walk(DIRECTIONS.LEFT);
    } else if (this.control.right) {
      this.walk(DIRECTIONS.RIGHT);
    } else {
      this.stand(this.velocity.direction);
    }

    super.update(time);
  }
}
