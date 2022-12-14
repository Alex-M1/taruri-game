import { ImageNames } from '../constants/images';
import Game from '../Engine/game/Game';
import Scene from '../Engine/scene/Scene';
import SpriteSheet from '../Engine/sprites/SpriteSheet';
import mapData from '../assets/tilemaps/village.json';
import Player from '../classes/Player';
import Camera from '../Engine/scene/Camera';
import TileMap from '../Engine/sprites/TileMap';
import Collisions from '../Engine/physics/Collisions';
import { SceneNames } from '../constants/scenes';

export default class VillageScene extends Scene {
  game: Game;

  basetiles: SpriteSheet;
  tilesAddWork: SpriteSheet;
  watertiles: SpriteSheet;
  mainCamera: Camera | null;
  map: TileMap | null;
  collisions: Collisions;

  player: Player;
  constructor(game: Game) {
    super(game, SceneNames.village);
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
    this.player.y = 300;

    this.collisions = new Collisions();
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

    this.collisions.addStaticShapes(mapData);
    this.collisions.addKinematicBody(this.player);
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
    this.collisions.update(time);
    super.render(time);
  }
}
