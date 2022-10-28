import Sprite from './Sprite';
import SpriteAnimation from './SpriteAnimation';

export default class SpriteSheet {
  imageName: string;
  imageWidth: number;
  imageHeight: number;
  spriteWidth: number;
  spriteHeight: number;
  constructor({
    imageHeight, imageName, imageWidth, spriteHeight, spriteWidth,
  }: SpriteSheetConstructor) {
    this.imageName = imageName;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
  }

  getAnimation(indexes: Array<number>, speed: number, repeat = true, autorun = true) {
    return new SpriteAnimation({
      imageName: this.imageName,
      frames: indexes.map((index) => ({ sx: this.getSourceX(index), sy: this.getSourceY(index) })),
      speed,
      repeat,
      autorun,
      width: this.spriteWidth,
      height: this.spriteHeight,
    });
  }

  getSprite(index: number): Sprite {
    return new Sprite({
      imageName: this.imageName,
      height: this.spriteHeight,
      width: this.spriteWidth,
      sourceX: this.getSourceX(index),
      sourceY: this.getSourceY(index),
    });
  }

  getSourceX(index: number): number {
    return ((index - 1) * this.spriteWidth) % this.imageWidth;
  }

  getSourceY(index: number): number {
    return Math.trunc(((index - 1) * this.spriteWidth) / this.imageWidth) * this.spriteHeight;
  }
}

export interface SpriteSheetConstructor {
  imageName: string;
  imageWidth: number;
  imageHeight: number;
  spriteWidth: number;
  spriteHeight: number;
}
