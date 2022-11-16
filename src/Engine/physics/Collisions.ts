import Body from '../../classes/Body';
import { Tiled } from '../sprites/spritesType';

export default class Collisions {
  staticShapes: Tiled.Object[];
  bodies: Bodies[];

  constructor() {
    this.staticShapes = [];
    this.bodies = [];
  }

  addStaticShapes(data: Tiled.TileMapType) {
    data.layers.forEach((layer) => {
      if (layer.type === 'objectgroup') {
        this.staticShapes.push(...layer.objects);
      }
    });
  }

  addKinematicBody(body: Body) {
    this.bodies.push({
      x: body.x,
      y: body.y,
      obj: body,
    });
  }

  update(time: number) {
    this.checkStatic(time);
  }

  checkStatic(time: number) {
    this.bodies.forEach((body, i) => {
      const oldX = body.x;
      const oldY = body.y;
      let { x } = body.obj;
      let { y } = body.obj;

      // moving right
      if (x > oldX) {
        this.staticShapes.forEach((shape) => {
          if (
            ((oldX - 1 + body.obj.collisionShape.x + body.obj.collisionShape.width) < shape.x)
            && ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
            && ((y + body.obj.collisionShape.y) < (shape.y + shape.height))
            && ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
          ) {
            x = Math.min(x + body.obj.collisionShape.x + body.obj.collisionShape.width, shape.x)
              - body.obj.collisionShape.x - body.obj.collisionShape.width;
          }
        });
      }
      // moving left
      if (x < oldX) {
        this.staticShapes.forEach((shape) => {
          if (
            ((oldX + 1 + body.obj.collisionShape.x) > (shape.x + shape.width))
            && ((x + body.obj.collisionShape.x) < (shape.x + shape.width))
            && ((y + body.obj.collisionShape.y) < (shape.y + shape.height))
            && ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
          ) {
            x = Math.max(x + body.obj.collisionShape.x, shape.x + shape.width)
              - body.obj.collisionShape.x;
          }
        });
      }

      // moving down
      if (y > oldY) {
        this.staticShapes.forEach((shape) => {
          if (
            ((oldY - 1 + body.obj.collisionShape.y + body.obj.collisionShape.height) < shape.y)
            && ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
            && ((x + body.obj.collisionShape.x) < (shape.x + shape.width))
            && ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
          ) {
            y = Math.min(y + body.obj.collisionShape.y + body.obj.collisionShape.height, shape.y)
              - body.obj.collisionShape.y - body.obj.collisionShape.height;
          }
        });
      }

      // moving up
      if (y < oldY) {
        this.staticShapes.forEach((shape) => {
          if (
            ((oldY + 1 + body.obj.collisionShape.y) > (shape.y + shape.height))
            && ((y + body.obj.collisionShape.y) < (shape.y + shape.height))
            && ((x + body.obj.collisionShape.x) < (shape.x + shape.width))
            && ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
          ) {
            y = Math.max(y + body.obj.collisionShape.y, shape.y + shape.height)
              - body.obj.collisionShape.y;
          }
        });
      }

      this.bodies[i].x = x;
      this.bodies[i].y = y;
      this.bodies[i].obj.x = x;
      this.bodies[i].obj.y = y;
    });
  }
}

export interface Bodies {
  x: number;
  y: number;
  obj: Body;
}
