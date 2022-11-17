export interface SpriteConstructor {
  imageName: string;
  sourceX: number;
  sourceY: number;
  width: number;
  height: number;
}

export interface FrameType {
  sx: number;
  sy: number;
}

export interface SpriteAnimationConstructor {
  imageName: string;
  frames: any;
  speed: number;
  repeat: boolean;
  autorun: boolean;
  width: number;
  height: number;
}

export interface SpriteSheetConstructor {
  imageName: string;
  imageWidth: number;
  imageHeight: number;
  spriteWidth: number;
  spriteHeight: number;
}

export interface TileMapConstructor extends SpriteConstructor {
  hitBoxes: Tiled.Hitboxes[]
}

export declare module Tiled {

  export interface Object {
    class: string;
    height: number;
    id: number;
    name: string;
    rotation: number;
    visible: boolean;
    width: number;
    x: number;
    y: number;
    point?: boolean;
  }

  export interface Layer {
    data: number[];
    height: number;
    id: number;
    name: string;
    opacity: number;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
    draworder: string;
    objects: Object[];
  }

  export interface Tileset {
    columns: number;
    firstgid: number;
    image: string;
    imageheight: number;
    imagewidth: number;
    margin: number;
    name: string;
    spacing: number;
    tilecount: number;
    tileheight: number;
    tilewidth: number;
  }

  export interface TileMapType {
    compressionlevel: number;
    height: number;
    infinite: boolean;
    layers: Layer[];
    nextlayerid: number;
    nextobjectid: number;
    orientation: string;
    renderorder: string;
    tiledversion: string;
    tileheight: number;
    tilesets: Tileset[];
    tilewidth: number;
    type: string;
    version: string;
    width: number;
  }
  export interface Hitboxes {
    name: string;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }
}
