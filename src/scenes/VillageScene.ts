import { ImageNames, PersonAnimateLayers } from '../constants/images';
import Game from '../Engine/Game';
import Scene from '../Engine/Scene';
import SpriteAnimation from '../Engine/sprites/SpriteAnimation';
import SpriteSheet from '../Engine/sprites/SpriteSheet';
import mapData from '../assets/tilemaps/village.json';
import PersonSheet from '../classes/PersonSheet';

export default class VillageScene extends Scene {
  game: Game;

  basetiles: SpriteSheet;
  tilesAddWork: SpriteSheet;
  watertiles: SpriteSheet;

  characterSprites: PersonSheet;
  character: SpriteAnimation;
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

    this.characterSprites = new PersonSheet({
      imageName: ImageNames.character_sprites,
    });

    this.character = this.characterSprites.getPersonAnimation(PersonAnimateLayers.walk_down, 150);
    this.character.setXY(39, 500);
  }

  init(): void {
    super.init();
    this.map = this.game.screen.createTileMap('level1', mapData, [this.watertiles, this.basetiles, this.tilesAddWork]);
  }

  update(time: number) {
    this.character.update(time);
  }

  render(time: number): void {
    this.update(time);
    this.game.screen.fill('#000');
    this.game.screen.drawSprite(this.map);
    this.game.screen.drawSprite(this.character);
    super.render(time);
  }
}
