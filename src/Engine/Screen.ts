import { IS_ENV } from '../constants/constants';
import ImageLoader from './ImageLoader';
import Sprite from './sprites/Sprite';

export default class Screen {
  readonly width: number;
  readonly height: number;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  images: Record<string, HTMLImageElement>;
  isImagesLoaded: boolean;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.images = {};
    this.isImagesLoaded = false;
  }

  loadImages(imagefiles: any) {
    const loader = new ImageLoader(imagefiles);
    loader.load().then(() => {
      this.images = Object.assign(this.images, loader.images);
      this.isImagesLoaded = true;
    });
  }

  private createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;

    if (IS_ENV) {
      canvas.style.border = '1px solid black';
    }

    document.body.appendChild(canvas);

    return canvas;
  }

  fill(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  print(x: number, y: number, text: string) {
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '22px Georgia';
    this.ctx.fillText(text, x, y);
  }

  drawImage(x: number, y: number, imageName: string) {
    this.ctx.drawImage(this.images[imageName], x, y);
  }

  drawSprite(sprite: Sprite) {
    this.ctx.drawImage(
      this.images[sprite.imageName],
      sprite.sourceX,
      sprite.sourceY,
      sprite.width,
      sprite.height,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
    );
  }
}
