export default class Camera {
  width: number;
  height: number;
  limitX: number;
  limitY: number;
  x: number;
  y: number;
  watchObject: boolean;
  obj: any;
  scrollEdge: number;
  constructor({
    width = 640,
    height = 640,
    limitX = 50000,
    limitY = 50000,
    scrollEdge = 200,
  }: Partial<CameraProps>) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.limitX = limitX;
    this.limitY = limitY;
    this.watchObject = false;
    this.obj = null;
    this.scrollEdge = scrollEdge;
  }

  watch(obj: any) {
    this.watchObject = true;
    this.obj = obj;
  }

  update(time: number) {
    if (this.watchObject) {
      if (this.obj.x > (this.x + this.width - this.scrollEdge)) {
        this.x = Math.min(this.limitX, this.obj.x - this.width + this.scrollEdge);
      } else if (this.obj.x < (this.x + this.scrollEdge)) {
        this.x = Math.max(0, this.obj.x - this.scrollEdge);
      } else if (this.obj.y > (this.y + this.height - this.scrollEdge)) {
        this.y = Math.min(this.limitY, this.obj.y - this.height + this.scrollEdge);
      } else if (this.obj.y < (this.y + this.scrollEdge)) {
        this.y = Math.max(0, this.obj.y - this.scrollEdge);
      }
    }
  }
}
export interface CameraProps {
  width: number;
  height: number;
  limitX: number;
  limitY: number;
  scrollEdge: number;
}
