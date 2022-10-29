import { IS_ENV } from '../constants/constants';
import ImageLoader from './ImageLoader';
import Sprite from './sprites/Sprite';
import SpriteSheet from './sprites/SpriteSheet';
import { Tiled } from './sprites/spritesType';
import TileMap from './sprites/TileMap';

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

  createTileMap(name: string, mapData: Tiled.TileMapType, tilesets: Array<SpriteSheet>) {
    const mapImage = document.createElement('canvas');

    mapImage.width = mapData.width * mapData.tilewidth;
    mapImage.height = mapData.height * mapData.tileheight;

    const tilemapCtx = mapImage.getContext('2d');
    const hitBoxes: Tiled.Hitboxes[] = [];
    let row: number, col: number;
    mapData.layers.forEach((layer) => {
      if (layer.type === 'tilelayer') {
        row = 0;
        col = 0;
        layer.data.forEach((tileIndex) => {
          if (tileIndex > 0) {
            const tilemap = mapData.tilesets.findIndex((tileset) => (
              tileIndex >= tileset.firstgid && tileIndex < tileset.tilecount + tileset.firstgid
            ));

            const currentTileset = tilesets.find((tileset) => (
              tileset.imageName === mapData.tilesets[tilemap].name
            )) as SpriteSheet;

            tilemapCtx?.drawImage(
              this.images[currentTileset.imageName],
              currentTileset.getSourceX(tileIndex - mapData.tilesets[tilemap].firstgid + 1),
              currentTileset.getSourceY(tileIndex - mapData.tilesets[tilemap].firstgid + 1),
              mapData.tilewidth,
              mapData.tileheight,
              col * mapData.tilewidth,
              row * mapData.tileheight,
              mapData.tilewidth,
              mapData.tileheight,
            );
          }

          col += 1;
          if (col > (mapData.width - 1)) {
            col = 0;
            row += 1;
          }
        });
      }
      if (layer.type === 'objectgroup') {
        hitBoxes.push(...layer.objects.map((obj) => ({
          x1: obj.x,
          x2: obj.x + obj.width,
          y1: obj.y,
          y2: obj.y + obj.height,
        })));
      }
    });
    this.images[name] = mapImage;

    return new TileMap({
      imageName: name,
      sourceX: 0,
      sourceY: 0,
      width: mapImage.width,
      height: mapImage.height,
      hitBoxes,
    });
  }
}
