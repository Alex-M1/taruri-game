import { IS_ENV } from '../../constants/constants';
import Camera from '../scene/Camera';
import Sprite from '../sprites/Sprite';
import SpriteSheet from '../sprites/SpriteSheet';
import { Tiled } from '../sprites/spritesType';
import TileMap from '../sprites/TileMap';
import Game from './Game';

export default class Screen {
  readonly width: number;
  readonly height: number;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  camera: Camera | null;
  isCameraSet: boolean;
  game: Game;

  constructor(width: number, height: number, game: Game) {
    this.width = width;
    this.height = height;
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.camera = null;
    this.isCameraSet = false;
    this.game = game;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
    this.isCameraSet = true;
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
    this.ctx.drawImage(this.game.loader.getImage(imageName) as HTMLImageElement, x, y);
  }

  drawSprite(sprite: Sprite) {
    let spriteX = sprite.x;
    let spriteY = sprite.y;

    if (this.isCameraSet) {
      spriteX -= (this.camera as Camera).x;
      spriteY -= (this.camera as Camera).y;
    }

    // игнорировать отрисовку спрайта когда он выходит за границы экрана
    if (
      (spriteX >= this.width)
      || (spriteY >= this.height)
      || ((spriteX + sprite.width) <= 0)
      || ((spriteY + sprite.height) <= 0)
    ) return;

    // отрисовка только видимой части спрайта
    const sourceX = sprite.sourceX + Math.abs(Math.min(0, spriteX));
    const sourceY = sprite.sourceY + Math.abs(Math.min(0, spriteY));
    const width = Math.min(this.width, spriteX + sprite.width) - Math.max(0, spriteX);
    const height = Math.min(this.height, spriteY + sprite.height) - Math.max(0, spriteY);

    this.ctx.drawImage(
      this.game.loader.getImage(sprite.imageName) as HTMLImageElement,
      sourceX,
      sourceY,
      width,
      height,
      Math.max(0, spriteX),
      Math.max(0, spriteY),
      width,
      height,
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
              this.game.loader.getImage(currentTileset.imageName) as HTMLImageElement,
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
          name: obj.name,
          x1: obj.x,
          x2: obj.x + obj.width,
          y1: obj.y,
          y2: obj.y + obj.height,
        })));
      }
    });

    const image = new Image();
    image.src = mapImage.toDataURL();

    this.game.loader.setImage({ name, image });

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
