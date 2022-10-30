import { ImageNames } from '../constants/images';
import Game from '../Engine/Game';
import Scene from '../Engine/scene/Scene';
import SpriteSheet from '../Engine/sprites/SpriteSheet';
import mapData from '../assets/tilemaps/village.json';
import Player from '../classes/Player';
import Camera from '../Engine/scene/Camera';
import TileMap from '../Engine/sprites/TileMap';

export default class VillageScene extends Scene {
  game: Game;

  basetiles: SpriteSheet;
  tilesAddWork: SpriteSheet;
  watertiles: SpriteSheet;
  mainCamera: Camera | null;
  map: TileMap | null;

  player: Player;
  constructor(game: Game) {
    super(game);
    this.game = game;
    this.basetiles = new SpriteSheet({
      imageName: ImageNames.basetiles,
      imageWidth: 256,
      imageHeight: 4256,
      spriteHeight: 32,
      spriteWidth: 32,
    });
    this.tilesAddWork = new SpriteSheet({
      imageName: ImageNames.addwork,
      imageWidth: 384,
      imageHeight: 2048,
      spriteHeight: 32,
      spriteWidth: 32,
    });
    this.watertiles = new SpriteSheet({
      imageName: ImageNames.water,
      imageWidth: 256,
      imageHeight: 192,
      spriteHeight: 32,
      spriteWidth: 32,
    });
    this.map = null;
    this.mainCamera = null;

    this.player = new Player(this.game.control);
    this.player.x = 100;
    this.player.y = 100;
  }

  init(): void {
    super.init();
    this.map = this.game.screen.createTileMap('level1', mapData, [this.watertiles, this.basetiles, this.tilesAddWork]);
    this.mainCamera = new Camera({
      width: this.game.screen.width,
      height: this.game.screen.height,
      limitX: this.map.width - this.game.screen.width,
      limitY: this.map.height - this.game.screen.height,
    });
    this.mainCamera.watch(this.player);
    this.game.screen.setCamera(this.mainCamera);
  }

  update(time: number) {
    this.player.update(time);
    this.mainCamera?.update(time);
  }

  render(time: number): void {
    this.update(time);
    this.game.screen.fill('#000');
    this.game.screen.drawSprite(this.map as TileMap);
    this.game.screen.drawSprite(this.player.view);
    super.render(time);
  }
}
