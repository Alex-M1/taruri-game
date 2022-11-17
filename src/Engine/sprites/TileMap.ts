import Sprite from './Sprite';
import { Tiled, TileMapConstructor } from './spritesType';

export default class TileMap extends Sprite {
  readonly hitBoxes: Tiled.Hitboxes[];

  constructor(props: TileMapConstructor) {
    super(props);
    this.hitBoxes = props.hitBoxes || [];
  }

  getHitboxesByName(name: string) {
    return this.hitBoxes.filter((hitBox) => hitBox.name === name);
  }
}
