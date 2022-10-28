import { ImageNames } from '../constants/images';
import Game from '../Engine/Game';
import Scene from '../Engine/Scene';
import Sprite from '../Engine/sprites/Sprite';
import SpriteAnimation from '../Engine/sprites/SpriteAnimation';
import SpriteSheet from '../Engine/sprites/SpriteSheet';

export default class VillageScene extends Scene {
  game: Game;
  tiles: SpriteSheet;
  sprite: Sprite;
  characterSprites: SpriteSheet;
  character: SpriteAnimation;
  constructor(game: Game) {
    super(game);
    this.game = game;
    this.tiles = new SpriteSheet({
      imageName: ImageNames.basetiles,
      imageWidth: 256,
      imageHeight: 4256,
      spriteHeight: 32,
      spriteWidth: 32,
    });
    //! !!!
    this.sprite = this.tiles.getSprite(500);
    this.sprite.setXY(10, 10);

    this.characterSprites = new SpriteSheet({
      imageName: ImageNames.character_sprites,
      imageWidth: 1095,
      imageHeight: 2032,
      spriteWidth: 64,
      spriteHeight: 64,
    });

    this.character = this.characterSprites.getAnimation([1, 2, 3, 4, 5, 6, 7], 150);
    this.character.setXY(39, 30);
  }

  init(): void {
    super.init();
  }

  update(time: number) {
    this.character.update(time);
  }

  render(time: number): void {
    this.update(time);
    this.game.screen.fill('#000');
    this.game.screen.drawSprite(this.sprite);
    this.game.screen.drawSprite(this.character);
    super.render(time);
  }
}
