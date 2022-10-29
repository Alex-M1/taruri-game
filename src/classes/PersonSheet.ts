import SpriteSheet from '../Engine/sprites/SpriteSheet';
import characterMap from '../assets/tilemaps/person_animate.json';
import SpriteAnimation from '../Engine/sprites/SpriteAnimation';

export default class PersonSheet extends SpriteSheet {
  sequences: Record<string, number[]>;
  constructor({ imageName }: { imageName: string }) {
    super({
      imageName,
      imageHeight: 2112,
      imageWidth: 1536,
      spriteHeight: 64,
      spriteWidth: 64,
    });

    this.sequences = this.getSequenses();
  }

  getSequenses() {
    const sequenses: Record<string, number[]> = {};

    characterMap.layers.forEach((layer) => {
      sequenses[layer.name] = layer.data.filter((i) => i > 0);
    });

    return sequenses;
  }

  getPersonAnimation(name: string, speed: number, repeat?: boolean, autorun?: boolean): SpriteAnimation {
    return super.getAnimation(this.sequences[name], speed, repeat, autorun);
  }
}
