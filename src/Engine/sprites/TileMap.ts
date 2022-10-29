import Sprite from './Sprite';
import { TileMapConstructor } from './spritesType';

export default class TileMap extends Sprite {
  hitBoxes: any;
  constructor(props: TileMapConstructor) {
    super(props);
    this.hitBoxes = props.hitBoxes || [];
  }
}
