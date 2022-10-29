import { SpriteConstructor } from './spritesType';

export default class Sprite {
  imageName: string;
  sourceX: number;
  sourceY: number;
  width: number;
  height: number;
  x: number;
  y: number;

  constructor({
    imageName, sourceX, sourceY, width, height,
  }: SpriteConstructor) {
    this.imageName = imageName;
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
  }

  setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
