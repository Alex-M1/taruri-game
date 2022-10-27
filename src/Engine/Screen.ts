import { IS_ENV } from '../constants';

export default class Screen {
  width: number;
  height: number;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  private createCanvas() {
    const elements = document.getElementsByTagName('canvas');
    if (elements.length) return elements[0];

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
}
