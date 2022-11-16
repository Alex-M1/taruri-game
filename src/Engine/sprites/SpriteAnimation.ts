import Sprite from './Sprite';
import { FrameType, SpriteAnimationConstructor } from './spritesType';

export default class SpriteAnimation extends Sprite {
  frames: Array<FrameType>;
  speed: number;
  repeat: boolean;
  running: boolean;
  lastTime: number;
  currentFrame: number;
  totalFrames: number;

  constructor({
    width,
    speed,
    repeat = true,
    height,
    frames,
    autorun = true,
    imageName,
  }: SpriteAnimationConstructor) {
    super({
      width,
      height,
      imageName,
      sourceX: frames[0].sx,
      sourceY: frames[0].sy,
    });

    this.frames = frames;
    this.speed = speed;
    this.repeat = repeat;
    this.running = autorun;
    this.lastTime = 0;
    this.currentFrame = 0;
    this.totalFrames = this.frames.length;
  }

  setFrame(index: number) {
    this.currentFrame = index;
    this.sourceX = this.frames[index].sx;
    this.sourceY = this.frames[index].sy;
  }

  run() {
    if (!this.running) {
      this.setFrame(0);
      this.running = true;
    }
  }

  stop() {
    this.setFrame(0);
    this.running = false;
  }

  nextFrame() {
    if ((this.currentFrame + 1) === this.totalFrames) {
      if (this.repeat) {
        this.setFrame(0);
        return;
      }
      this.stop();
      return;
    }
    this.setFrame(this.currentFrame + 1);
  }

  update(time: number) {
    if (!this.running) return;
    if (this.lastTime === 0) {
      this.lastTime = time;
      return;
    }
    if ((time - this.lastTime) > this.speed) {
      this.nextFrame();
      this.lastTime = time;
    }
  }
}
